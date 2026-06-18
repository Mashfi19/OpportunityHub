const { query } = require("../database/connection");

class OpportunityService {
  async getOpportunities({
    q,
    countryId,
    universityId,
    degreeLevel,
    fundingTypeId,
    categoryId,
    deadlineBefore,
    sortBy,
    page = 1,
    limit = 10
  }) {
    let selectSql = `
      SELECT o.id, o.title, o.description, o.official_source_url, o.application_url, o.status, o.published_at, o.created_at, o.updated_at,
             c.name as category,
             f.name as funding_type,
             u.name as university,
             co.name as country, co.code as country_code,
             s.amount_value, s.currency,
             i.stipend_amount, i.is_paid, i.is_remote,
             rg.grant_value, rg.research_field,
             conf.venue_city, conf.event_start_date,
             ep.semester_duration
      FROM opportunities o
      JOIN categories c ON o.category_id = c.id
      JOIN funding_types f ON o.funding_type_id = f.id
      LEFT JOIN universities u ON o.university_id = u.id
      LEFT JOIN countries co ON o.country_id = co.id
      LEFT JOIN scholarships s ON o.id = s.opportunity_id
      LEFT JOIN internships i ON o.id = i.opportunity_id
      LEFT JOIN research_grants rg ON o.id = rg.opportunity_id
      LEFT JOIN conferences conf ON o.id = conf.opportunity_id
      LEFT JOIN exchange_programs ep ON o.id = ep.opportunity_id
    `;

    let countSql = `
      SELECT count(*) as count
      FROM opportunities o
      JOIN categories c ON o.category_id = c.id
      JOIN funding_types f ON o.funding_type_id = f.id
      LEFT JOIN universities u ON o.university_id = u.id
      LEFT JOIN countries co ON o.country_id = co.id
    `;

    const whereClauses = [];
    const params = [];
    let paramIndex = 1;

    // Filter by Active Status by default for student catalogs
    whereClauses.push(`o.status = $${paramIndex++}`);
    params.push("active");

    // Keyword Search (PostgreSQL GIN Full-Text search)
    if (q) {
      whereClauses.push(`to_tsvector('english', o.title || ' ' || o.description) @@ plainto_tsquery('english', $${paramIndex++})`);
      params.push(q);
    }

    if (countryId) {
      whereClauses.push(`o.country_id = $${paramIndex++}`);
      params.push(countryId);
    }

    if (universityId) {
      whereClauses.push(`o.university_id = $${paramIndex++}`);
      params.push(universityId);
    }

    if (categoryId) {
      whereClauses.push(`o.category_id = $${paramIndex++}`);
      params.push(categoryId);
    }

    if (fundingTypeId) {
      whereClauses.push(`o.funding_type_id = $${paramIndex++}`);
      params.push(fundingTypeId);
    }

    if (deadlineBefore) {
      whereClauses.push(`EXISTS (
        SELECT 1 FROM deadlines d 
        WHERE d.opportunity_id = o.id AND d.deadline_date <= $${paramIndex++} AND d.is_active = TRUE
      )`);
      params.push(deadlineBefore);
    }

    const whereString = whereClauses.length > 0 ? " WHERE " + whereClauses.join(" AND ") : "";
    selectSql += whereString;
    countSql += whereString;

    // Sorting
    let orderBy = " ORDER BY o.published_at DESC";
    if (sortBy === "deadline") {
      orderBy = ` ORDER BY (
        SELECT MIN(d.deadline_date) FROM deadlines d 
        WHERE d.opportunity_id = o.id AND d.is_active = TRUE
      ) ASC NULLS LAST`;
    } else if (sortBy === "title") {
      orderBy = " ORDER BY o.title ASC";
    }
    selectSql += orderBy;

    // Pagination offsets
    const offset = (page - 1) * limit;
    selectSql += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
    params.push(limit, offset);

    // Execute queries
    const dataPromise = query(selectSql, params);
    const countPromise = query(countSql, params.slice(0, -2)); // omit limit & offset params

    const [dataResult, countResult] = await Promise.all([dataPromise, countPromise]);

    const totalCount = parseInt(countResult.rows[0].count);
    const pageCount = Math.ceil(totalCount / limit);

    // Fetch deadlines for the opportunities returned
    const items = dataResult.rows;
    if (items.length > 0) {
      const oppIds = items.map(x => x.id);
      const deadlinesResult = await query(
        `SELECT opportunity_id, deadline_date, description 
         FROM deadlines 
         WHERE opportunity_id = ANY($1) AND is_active = TRUE 
         ORDER BY deadline_date ASC`,
        [oppIds]
      );

      // Map deadlines back to items
      items.forEach(item => {
        item.deadlines = deadlinesResult.rows.filter(d => d.opportunity_id === item.id);
      });
    }

    return {
      data: items,
      metadata: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        pageCount,
        hasNext: page < pageCount
      }
    };
  }

  async getOpportunityById(id) {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(id)) {
      const { MOCK_OPPORTUNITIES } = require("../data/mockOpportunities");
      const found = MOCK_OPPORTUNITIES.find(opp => opp.id === id);
      if (found) {
        return {
          id: found.id,
          title: found.title,
          description: found.description,
          official_source_url: found.officialUrl,
          application_url: found.officialUrl,
          status: "active",
          category: found.type,
          funding_type: found.fundingType,
          amount_value: found.amount,
          currency: found.currency,
          covers_tuition: found.fundingType === "FullyFunded",
          covers_stipend: found.fundingType === "FullyFunded",
          covers_travel: found.fundingType === "FullyFunded",
          covers_insurance: found.fundingType === "FullyFunded",
          gpa_min: found.gpaMin,
          ielts_min: found.ieltsMin,
          toefl_min: found.toeflMin,
          academic_levels: found.academicLevels,
          disciplines: found.disciplines,
          required_documents: found.requiredDocuments,
          deadlines: found.deadline ? [{ deadline_date: found.deadline, description: "Application Deadline" }] : []
        };
      }
      return null;
    }

    const result = await query(
      `SELECT o.id, o.title, o.description, o.official_source_url, o.application_url, o.status, o.published_at, o.created_at, o.updated_at,
              o.university_id, o.country_id, o.category_id, o.funding_type_id,
             c.name as category,
             f.name as funding_type,
             u.name as university,
             co.name as country, co.code as country_code,
             s.amount_value, s.currency, s.covers_tuition, s.covers_stipend, s.covers_travel, s.covers_insurance,
             i.stipend_amount, i.is_paid, i.is_remote, i.duration_weeks, i.has_coop_credit,
             rg.grant_value, rg.research_field, rg.project_duration_months,
             conf.venue_city, conf.event_start_date, conf.event_end_date, conf.travel_grant_offered, conf.registration_fee_waived,
             ep.semester_duration, ep.partner_agreement_type, ep.credit_transfer_guaranteed
       FROM opportunities o
       JOIN categories c ON o.category_id = c.id
       JOIN funding_types f ON o.funding_type_id = f.id
       LEFT JOIN universities u ON o.university_id = u.id
       LEFT JOIN countries co ON o.country_id = co.id
       LEFT JOIN scholarships s ON o.id = s.opportunity_id
       LEFT JOIN internships i ON o.id = i.opportunity_id
       LEFT JOIN research_grants rg ON o.id = rg.opportunity_id
       LEFT JOIN conferences conf ON o.id = conf.opportunity_id
       LEFT JOIN exchange_programs ep ON o.id = ep.opportunity_id
       WHERE o.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const opportunity = result.rows[0];

    // Fetch deadlines
    const deadlines = await query(
      "SELECT deadline_date, description FROM deadlines WHERE opportunity_id = $1 AND is_active = TRUE ORDER BY deadline_date ASC",
      [id]
    );
    opportunity.deadlines = deadlines.rows;

    return opportunity;
  }
}

module.exports = new OpportunityService();
