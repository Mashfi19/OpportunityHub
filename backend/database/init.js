const fs = require("fs");
const path = require("path");
const { pool, query } = require("./connection");

async function initializeDatabase() {
  console.log("Starting Supabase PostgreSQL database initialization...");
  
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schemaSql = fs.readFileSync(schemaPath, "utf8");

    console.log("Executing schema.sql on Supabase...");
    await query(schemaSql);
    console.log("Schema tables and indexes created successfully!");

    // Seed Categories
    console.log("Seeding categories...");
    const categories = ["Scholarship", "Internship", "Fellowship", "ResearchGrant", "Conference", "ExchangeProgram"];
    for (const cat of categories) {
      await query("INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING", [cat]);
    }

    // Seed Funding Types
    console.log("Seeding funding types...");
    const fundingTypes = ["FullyFunded", "PartiallyFunded", "TuitionWaiver", "Paid", "Unpaid"];
    for (const ft of fundingTypes) {
      await query("INSERT INTO funding_types (name) VALUES ($1) ON CONFLICT (name) DO NOTHING", [ft]);
    }

    // Seed Sample Countries
    console.log("Seeding reference countries...");
    const countries = [
      { code: "BD", name: "Bangladesh", phone_code: "+880" },
      { code: "DE", name: "Germany", phone_code: "+49" },
      { code: "US", name: "United States", phone_code: "+1" },
      { code: "GB", name: "United Kingdom", phone_code: "+44" },
      { code: "CH", name: "Switzerland", phone_code: "+41" },
      { code: "JP", name: "Japan", phone_code: "+81" },
      { code: "CA", name: "Canada", phone_code: "+1" },
      { code: "SG", name: "Singapore", phone_code: "+65" },
      { code: "AU", name: "Australia", phone_code: "+61" },
      { code: "FR", name: "France", phone_code: "+33" },
      { code: "NL", name: "Netherlands", phone_code: "+31" },
      { code: "SE", name: "Sweden", phone_code: "+46" },
      { code: "KR", name: "South Korea", phone_code: "+82" },
      { code: "IT", name: "Italy", phone_code: "+39" },
      { code: "FI", name: "Finland", phone_code: "+358" },
      { code: "NO", name: "Norway", phone_code: "+47" },
      { code: "BE", name: "Belgium", phone_code: "+32" },
      { code: "ES", name: "Spain", phone_code: "+34" }
    ];
    for (const c of countries) {
      await query(
        "INSERT INTO countries (code, name, phone_code) VALUES ($1, $2, $3) ON CONFLICT (code) DO NOTHING",
        [c.code, c.name, c.phone_code]
      );
    }

    // Seed Sponsoring Organizations
    console.log("Seeding sponsoring organizations...");
    const organizations = [
      {
        name: "German Academic Exchange Service (DAAD)",
        logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
        description: "The DAAD is the world's largest funding organization for the international exchange of students and researchers.",
        website_url: "https://www.daad.de",
        type: "Government",
        founded_year: 1925
      },
      {
        name: "Fulbright Commission",
        logo_url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
        description: "The Fulbright Program is one of the several United States Cultural Exchange Programs with the goal of improving intercultural relations.",
        website_url: "https://us.fulbrightonline.org",
        type: "Government",
        founded_year: 1946
      },
      {
        name: "European Commission",
        logo_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop",
        description: "The executive branch of the European Union, responsible for proposing legislation, implementing decisions, and managing programmes like Erasmus Mundus.",
        website_url: "https://ec.europa.eu",
        type: "Government",
        founded_year: 1958
      },
      {
        name: "Bill & Melinda Gates Foundation",
        logo_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
        description: "Guided by the belief that every life has equal value, the Gates Foundation works to help all people lead healthy, productive lives.",
        website_url: "https://www.gatesfoundation.org",
        type: "Foundation",
        founded_year: 2000
      },
      {
        name: "Google Research",
        logo_url: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=120&fit=crop",
        description: "Google's research division dedicated to solving hard computer science problems and funding academic research globally.",
        website_url: "https://research.google",
        type: "Corporate",
        founded_year: 1998
      },
      {
        name: "Commonwealth Scholarship Commission",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "The CSC provides scholarships and fellowships for citizens of Commonwealth countries, funded by the UK government.",
        website_url: "https://cscuk.fcdo.gov.uk",
        type: "Government",
        founded_year: 1959
      },
      {
        name: "Alexander von Humboldt Foundation",
        logo_url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
        description: "The Humboldt Foundation promotes academic cooperation between excellent scientists and scholars from abroad and from Germany.",
        website_url: "https://www.humboldt-foundation.de",
        type: "Foundation",
        founded_year: 1953
      },
      {
        name: "Wellcome Trust",
        logo_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop",
        description: "Wellcome Trust is a global charitable foundation focused on health and scientific research based in London, United Kingdom.",
        website_url: "https://wellcome.org",
        type: "Foundation",
        founded_year: 1936
      },
      {
        name: "Mastercard Foundation",
        logo_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
        description: "The Mastercard Foundation works to address global poverty and promote financial inclusion and educational access across developing nations.",
        website_url: "https://mastercardfdn.org",
        type: "Foundation",
        founded_year: 2006
      },
      {
        name: "Rotary Foundation",
        logo_url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
        description: "Rotary Foundation is a non-profit organization that funds global humanitarian grants, peace fellowships, and local community service projects.",
        website_url: "https://www.rotary.org",
        type: "Foundation",
        founded_year: 1917
      },
      {
        name: "Samsung Research",
        logo_url: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=120&fit=crop",
        description: "Samsung Electronics' advanced R&D hub, driving future technologies and offering global computing and engineering internships.",
        website_url: "https://research.samsung.com",
        type: "Corporate",
        founded_year: 1969
      },
      {
        name: "The Rockefeller Foundation",
        logo_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
        description: "A private science-driven philanthropic organization dedicated to promoting the well-being of humanity throughout the world.",
        website_url: "https://www.rockefellerfoundation.org",
        type: "Foundation",
        founded_year: 1913
      },
      {
        name: "Rhodes Trust",
        logo_url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
        description: "An educational charity administering the Rhodes Scholarships, prestigious postgraduate awards for Oxford University studies.",
        website_url: "https://www.rhodeshouse.ox.ac.uk",
        type: "Foundation",
        founded_year: 1902
      },
      {
        name: "Boehringer Ingelheim Fonds",
        logo_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop",
        description: "A non-profit organization supporting outstanding basic research in biomedicine by funding excellent PhD candidates.",
        website_url: "https://www.bifonds.de",
        type: "Foundation",
        founded_year: 1983
      },
      {
        name: "L'Oréal Foundation",
        logo_url: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=120&fit=crop",
        description: "Supports women scientists, access to education, and reconstructive surgery through programs like L'Oréal-UNESCO For Women in Science.",
        website_url: "https://www.fondationloreal.com",
        type: "Foundation",
        founded_year: 2007
      },
      {
        name: "Knut and Alice Wallenberg Foundation",
        logo_url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
        description: "Sweden's largest private research funding foundation, supporting basic research in medicine, technology, and natural sciences.",
        website_url: "https://kaw.wallenberg.org",
        type: "Foundation",
        founded_year: 1917
      }
    ];

    const orgMap = {};
    for (const org of organizations) {
      const res = await query(
        `INSERT INTO organizations (name, logo_url, description, website_url, type, founded_year)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (name) DO NOTHING
         RETURNING id`,
        [org.name, org.logo_url, org.description, org.website_url, org.type, org.founded_year]
      );
      
      if (res.rows.length > 0) {
        orgMap[org.name] = res.rows[0].id;
      } else {
        const existing = await query("SELECT id FROM organizations WHERE name = $1", [org.name]);
        if (existing.rows.length > 0) {
          orgMap[org.name] = existing.rows[0].id;
        }
      }
    }

    // Seed Universities
    console.log("Seeding universities with detailed profiles...");
    const universities = [
      {
        name: "Harvard University",
        country_code: "US",
        website_url: "https://www.harvard.edu",
        logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
        description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts, established in 1636.",
        ranking_global: 1,
        ranking_national: 1,
        acceptance_rate: 3.43,
        average_tuition: "$55,000 / year",
        sat_range: "1480-1580",
        act_range: "33-35",
        student_population: 23000
      },
      {
        name: "Massachusetts Institute of Technology",
        country_code: "US",
        website_url: "https://www.mit.edu",
        logo_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
        description: "MIT is a private land-grant research university in Cambridge, Massachusetts, established in 1861 and famous for its engineering prowess.",
        ranking_global: 2,
        ranking_national: 2,
        acceptance_rate: 3.96,
        average_tuition: "$57,500 / year",
        sat_range: "1510-1580",
        act_range: "34-36",
        student_population: 11500
      },
      {
        name: "University of Oxford",
        country_code: "GB",
        website_url: "https://www.ox.ac.uk",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "The University of Oxford is a collegiate research university in Oxford, England. It is the oldest university in the English-speaking world.",
        ranking_global: 3,
        ranking_national: 1,
        acceptance_rate: 14.30,
        average_tuition: "£28,500 / year",
        sat_range: "1470-1560",
        act_range: "32-35",
        student_population: 24000
      },
      {
        name: "Technical University of Munich",
        country_code: "DE",
        website_url: "https://www.tum.de",
        logo_url: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
        description: "TUM is a public research university in Munich, Germany, specializing in engineering, technology, medicine, and applied sciences.",
        ranking_global: 37,
        ranking_national: 1,
        acceptance_rate: 8.00,
        average_tuition: "No Tuition Fees (Semester fee €150)",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 48000
      },
      {
        name: "ETH Zurich",
        country_code: "CH",
        website_url: "https://ethz.ch",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "ETH Zurich is a public research university in Zürich, Switzerland, founded by the Swiss Federal Government in 1854.",
        ranking_global: 7,
        ranking_national: 1,
        acceptance_rate: 12.00,
        average_tuition: "CHF 1,500 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 22000
      },
      {
        name: "University of Toronto",
        country_code: "CA",
        website_url: "https://www.utoronto.ca",
        logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
        description: "The University of Toronto is a public research university in Toronto, Ontario, Canada.",
        ranking_global: 21,
        ranking_national: 1,
        acceptance_rate: 43.0,
        average_tuition: "$45,000 / year",
        sat_range: "1350-1500",
        act_range: "29-33",
        student_population: 61000
      },
      {
        name: "National University of Singapore",
        country_code: "SG",
        website_url: "https://www.nus.edu.sg",
        logo_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
        description: "NUS is a leading global university centered in Asia, offering a global approach to education.",
        ranking_global: 8,
        ranking_national: 1,
        acceptance_rate: 5.0,
        average_tuition: "$30,000 / year",
        sat_range: "1450-1550",
        act_range: "31-34",
        student_population: 38000
      },
      {
        name: "Stanford University",
        country_code: "US",
        website_url: "https://www.stanford.edu",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "Stanford University is a private research university in Stanford, California.",
        ranking_global: 4,
        ranking_national: 3,
        acceptance_rate: 3.9,
        average_tuition: "$57,000 / year",
        sat_range: "1470-1570",
        act_range: "33-35",
        student_population: 17000
      },
      {
        name: "University of Cambridge",
        country_code: "GB",
        website_url: "https://www.cam.ac.uk",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "The University of Cambridge is a public collegiate research university in Cambridge, UK.",
        ranking_global: 5,
        ranking_national: 2,
        acceptance_rate: 15.0,
        average_tuition: "£32,000 / year",
        sat_range: "1460-1560",
        act_range: "32-35",
        student_population: 22000
      },
      {
        name: "University of Tokyo",
        country_code: "JP",
        website_url: "https://www.u-tokyo.ac.jp",
        logo_url: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
        description: "The University of Tokyo is a prestigious public research university in Tokyo, Japan.",
        ranking_global: 28,
        ranking_national: 1,
        acceptance_rate: 34.0,
        average_tuition: "¥535,800 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 28000
      },
      {
        name: "Delft University of Technology",
        country_code: "NL",
        website_url: "https://www.tudelft.nl",
        logo_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
        description: "TU Delft is the oldest and largest Dutch public technical university.",
        ranking_global: 70,
        ranking_national: 1,
        acceptance_rate: 40.0,
        average_tuition: "€15,000 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 26000
      },
      {
        name: "Sorbonne University",
        country_code: "FR",
        website_url: "https://www.sorbonne-universite.fr",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "Sorbonne University is a public research university in Paris, France.",
        ranking_global: 83,
        ranking_national: 2,
        acceptance_rate: 10.0,
        average_tuition: "€243 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 55000
      },
      {
        name: "University of Melbourne",
        country_code: "AU",
        website_url: "https://www.unimelb.edu.au",
        logo_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
        description: "The University of Melbourne is a public research university in Melbourne, Australia.",
        ranking_global: 14,
        ranking_national: 1,
        acceptance_rate: 70.0,
        average_tuition: "A$42,000 / year",
        sat_range: "1350-1500",
        act_range: "29-33",
        student_population: 54000
      },
      {
        name: "Seoul National University",
        country_code: "KR",
        website_url: "https://www.snu.ac.kr",
        logo_url: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
        description: "Seoul National University is a national research university in Seoul, South Korea.",
        ranking_global: 41,
        ranking_national: 1,
        acceptance_rate: 15.0,
        average_tuition: "₩6,000,000 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 27000
      },
      {
        name: "Yale University",
        country_code: "US",
        website_url: "https://www.yale.edu",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "Yale University is a private Ivy League research university in New Haven, Connecticut.",
        ranking_global: 9,
        ranking_national: 5,
        acceptance_rate: 4.3,
        average_tuition: "$62,000 / year",
        sat_range: "1480-1580",
        act_range: "33-35",
        student_population: 14500
      },
      {
        name: "Imperial College London",
        country_code: "GB",
        website_url: "https://www.imperial.ac.uk",
        logo_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
        description: "Imperial College London is a world-class public research university specializing in science, engineering, medicine, and business.",
        ranking_global: 6,
        ranking_national: 3,
        acceptance_rate: 15.0,
        average_tuition: "£34,000 / year",
        sat_range: "1450-1550",
        act_range: "32-35",
        student_population: 20000
      },
      {
        name: "Nanyang Technological University",
        country_code: "SG",
        website_url: "https://www.ntu.edu.sg",
        logo_url: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
        description: "Nanyang Technological University is a prestigious research-intensive public university in Singapore.",
        ranking_global: 15,
        ranking_national: 2,
        acceptance_rate: 15.0,
        average_tuition: "$32,000 / year",
        sat_range: "1440-1540",
        act_range: "31-34",
        student_population: 33000
      },
      {
        name: "University of British Columbia",
        country_code: "CA",
        website_url: "https://www.ubc.ca",
        logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
        description: "UBC is a global center for research and teaching, consistently ranked among the top 20 public universities in the world.",
        ranking_global: 34,
        ranking_national: 2,
        acceptance_rate: 40.0,
        average_tuition: "$42,000 / year",
        sat_range: "1350-1480",
        act_range: "29-33",
        student_population: 68000
      },
      {
        name: "Australian National University",
        country_code: "AU",
        website_url: "https://www.anu.edu.au",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "ANU is a celebrated public research university located in Canberra, the capital of Australia.",
        ranking_global: 30,
        ranking_national: 2,
        acceptance_rate: 35.0,
        average_tuition: "A$41,000 / year",
        sat_range: "1340-1480",
        act_range: "29-33",
        student_population: 21000
      },
      {
        name: "Kyoto University",
        country_code: "JP",
        website_url: "https://www.kyoto-u.ac.jp",
        logo_url: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
        description: "Kyoto University is one of Japan's oldest and most prestigious national universities.",
        ranking_global: 46,
        ranking_national: 2,
        acceptance_rate: 30.0,
        average_tuition: "¥535,800 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 22000
      },
      {
        name: "Karolinska Institutet",
        country_code: "SE",
        website_url: "https://ki.se",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "Karolinska Institutet is one of the world's foremost medical universities, located in Stockholm, Sweden.",
        ranking_global: 38,
        ranking_national: 1,
        acceptance_rate: 12.0,
        average_tuition: "SEK 180,000 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 6000
      },
      {
        name: "University of Helsinki",
        country_code: "FI",
        website_url: "https://www.helsinki.fi",
        logo_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
        description: "The University of Helsinki is the oldest and largest institution of academic education in Finland.",
        ranking_global: 115,
        ranking_national: 1,
        acceptance_rate: 15.0,
        average_tuition: "€15,000 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 31200
      },
      {
        name: "University of Oslo",
        country_code: "NO",
        website_url: "https://www.uio.no",
        logo_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
        description: "The University of Oslo is Norway's oldest and highest ranked university.",
        ranking_global: 101,
        ranking_national: 1,
        acceptance_rate: 10.0,
        average_tuition: "NOK 150,000 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 26000
      },
      {
        name: "KU Leuven",
        country_code: "BE",
        website_url: "https://www.kuleuven.be",
        logo_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
        description: "KU Leuven is a prestigious research university in Leuven, Belgium.",
        ranking_global: 45,
        ranking_national: 1,
        acceptance_rate: 45.0,
        average_tuition: "€6,000 / year",
        sat_range: "Not Required",
        act_range: "Not Required",
        student_population: 60000
      }
    ];

    const uniMap = {};
    for (const uni of universities) {
      const countryRes = await query("SELECT id FROM countries WHERE code = $1", [uni.country_code]);
      if (countryRes.rows.length > 0) {
        const countryId = countryRes.rows[0].id;
        const res = await query(
          `INSERT INTO universities (name, country_id, website_url, logo_url, description, ranking_global, ranking_national, acceptance_rate, average_tuition, sat_range, act_range, student_population)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
           ON CONFLICT (name) DO NOTHING
           RETURNING id`,
          [
            uni.name,
            countryId,
            uni.website_url,
            uni.logo_url,
            uni.description,
            uni.ranking_global,
            uni.ranking_national,
            uni.acceptance_rate,
            uni.average_tuition,
            uni.sat_range,
            uni.act_range,
            uni.student_population
          ]
        );

        if (res.rows.length > 0) {
          uniMap[uni.name] = res.rows[0].id;
        } else {
          const existing = await query("SELECT id FROM universities WHERE name = $1", [uni.name]);
          if (existing.rows.length > 0) {
            uniMap[uni.name] = existing.rows[0].id;
          }
        }
      }
    }

    // Seed Mock Opportunities for Testing
    console.log("Seeding mock opportunities and specifications...");
    
    // Get seeded IDs
    const catResult = await query("SELECT id FROM categories WHERE name = 'Scholarship'");
    const ftResult = await query("SELECT id FROM funding_types WHERE name = 'FullyFunded'");
    const countryResult = await query("SELECT id FROM countries WHERE code = 'DE'");

    if (catResult.rows.length > 0 && ftResult.rows.length > 0 && countryResult.rows.length > 0) {
      const categoryId = catResult.rows[0].id;
      const fundingTypeId = ftResult.rows[0].id;
      const countryId = countryResult.rows[0].id;

      // Check if already seeded
      const oppCheck = await query("SELECT id FROM opportunities WHERE title = $1", ["Erasmus Mundus Joint Masters Scholarship"]);
      
      if (oppCheck.rows.length === 0) {
        const targetUniId = uniMap["Technical University of Munich"];
        const targetOrgId = orgMap["European Commission"];

        const oppResult = await query(
          `INSERT INTO opportunities (title, description, category_id, funding_type_id, official_source_url, status, country_id, university_id, organization_id, published_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
           RETURNING id`,
          [
            "Erasmus Mundus Joint Masters Scholarship",
            "A prestigious, integrated, international study program, jointly delivered by an international consortium of higher education institutions, fully funded by the European Commission.",
            categoryId,
            fundingTypeId,
            "https://ec.europa.eu/programmes/erasmus-plus/opportunities/joint-masters_en",
            "active",
            countryId,
            targetUniId || null,
            targetOrgId || null
          ]
        );
        
        const opportunityId = oppResult.rows[0].id;

        // Seed Scholarship specs
        await query(
          "INSERT INTO scholarships (opportunity_id, amount_value, currency, covers_tuition, covers_stipend, covers_travel, covers_insurance) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          [opportunityId, "1400 / month", "EUR", true, true, true, true]
        );

        // Seed Deadline
        const deadlineDate = new Date();
        deadlineDate.setMonth(deadlineDate.getMonth() + 6); // 6 months from now
        await query(
          "INSERT INTO deadlines (opportunity_id, deadline_date, description) VALUES ($1, $2, $3)",
          [opportunityId, deadlineDate, "International Applications Round"]
        );
        
        console.log("Mock Erasmus opportunity seeded successfully with organization and university!");
      }
    }

    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Initialization Failed:", err);
  } finally {
    await pool.end();
    console.log("Database connection pool closed.");
  }
}

initializeDatabase();
