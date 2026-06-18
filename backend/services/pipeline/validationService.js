const { z } = require("zod");

const pipelineOpportunitySchema = z.object({
  title: z.string().min(5).max(500),
  description: z.string().min(20),
  categoryName: z.enum(["Scholarship", "Internship", "Fellowship", "ResearchGrant", "Conference", "ExchangeProgram"]),
  fundingTypeName: z.enum(["FullyFunded", "PartiallyFunded", "TuitionWaiver", "Paid", "Unpaid"]),
  officialSourceUrl: z.string().url(),
  applicationUrl: z.string().url().nullable().optional(),
  host: z.string().min(2),
  location: z.string().min(2),
  amount: z.string().default("N/A"),
  deadline: z.string().datetime().nullable().or(z.date().nullable()).optional(),
  
  // Specific requirements
  gpaMin: z.number().min(0.0).max(4.0).nullable().optional(),
  ieltsMin: z.number().min(0.0).max(9.0).nullable().optional(),
  toeflMin: z.number().int().min(0).max(120).nullable().optional(),
  
  // Array lists
  disciplines: z.array(z.string()).default([]),
  levels: z.array(z.string()).default([]),
  eligibleCitizenships: z.array(z.string()).default(["GLOBAL"])
});

class ValidationService {
  validateItem(item) {
    return pipelineOpportunitySchema.safeParse(item);
  }

  validateBatch(items) {
    const valid = [];
    const invalid = [];

    for (const item of items) {
      const parsed = this.validateItem(item);
      if (parsed.success) {
        valid.push(parsed.data);
      } else {
        invalid.push({ item, errors: parsed.error.format() });
      }
    }

    return { valid, invalid };
  }
}

module.exports = new ValidationService();
exportSchema = pipelineOpportunitySchema;
