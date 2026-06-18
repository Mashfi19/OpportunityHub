const MOCK_OPPORTUNITIES = [
  {
    id: "1",
    title: "Erasmus Mundus Joint Masters Scholarship",
    host: "European Commission",
    location: "Europe (Multiple)",
    countryCode: "EU",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "€1,400 / month + tuition",
    currency: "EUR",
    deadline: "2027-01-15T00:00:00.000Z",
    academicLevels: ["Graduate"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Mobility", "Europe"],
    gpaMin: 3.2,
    ieltsMin: 6.5,
    toeflMin: 90,
    experienceYearsMin: 0,
    description: "The Erasmus Mundus Joint Masters program offers high-level integrated study programs at the master level, designed and delivered by an international partnership of higher education institutions from different countries worldwide. The scholarship covers tuition fees, library and laboratory costs, full insurance, travel costs, and a monthly living allowance for the duration of the program.",
    benefits: [
      "Full tuition fee waiver at all host universities.",
      "Monthly living allowance of €1,400 for up to 24 months.",
      "Travel and installation grant of €3,000 per year.",
      "Comprehensive global health and accident insurance coverage.",
      "Schengen visa fees covered and administrative support provided."
    ],
    eligibilityCriteria: [
      "Must hold a first higher education degree (Bachelor's degree or equivalent).",
      "Minimum CGPA of 3.2 on a 4.0 scale (or equivalent academic standing).",
      "English language proficiency: minimum IELTS 6.5 or TOEFL 90.",
      "Open to students from any country worldwide (both program and partner countries)."
    ],
    requiredDocuments: [
      "Official Bachelor's degree certificate and academic transcripts.",
      "Two letters of academic recommendation.",
      "Statement of Purpose (SOP) maximum 1,000 words.",
      "English language test report (IELTS/TOEFL).",
      "Curriculum Vitae (CV) in Europass format."
    ],
    officialUrl: "https://erasmus-plus.ec.europa.eu/opportunities/opportunities-for-individuals/students/erasmus-mundus-joint-masters"
  },
  {
    id: "2",
    title: "Fulbright Foreign Student Program",
    host: "US Department of State",
    location: "United States",
    countryCode: "US",
    type: "Fellowship",
    fundingType: "FullyFunded",
    amount: "Tuition, stipend & airfare",
    currency: "USD",
    deadline: "2026-10-12T00:00:00.000Z",
    academicLevels: ["Graduate", "PhD"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Graduate", "Leadership", "US"],
    gpaMin: 3.5,
    ieltsMin: 7.0,
    toeflMin: 100,
    experienceYearsMin: 2,
    description: "The Fulbright Foreign Student Program enables graduate students, young professionals, and artists from abroad to study and conduct research in the United States. Operating in more than 160 countries, the program awards approximately 4,000 scholarships annually. It is designed to foster mutual understanding and leadership capability between the people of the US and other nations.",
    benefits: [
      "Full tuition coverage for Master's or PhD coursework.",
      "Monthly stipend tailored to the cost of living of the host US city.",
      "Round-trip international airfare between home country and US.",
      "Accident and sickness health benefits plan.",
      "Enrichment seminars and networking workshops across the US."
    ],
    eligibilityCriteria: [
      "Must have completed a Bachelor's degree program.",
      "Minimum CGPA of 3.5 on a 4.0 scale.",
      "Minimum 2 years of professional work or research experience in the relevant field.",
      "Minimum English proficiency: IELTS 7.0 or TOEFL 100.",
      "Must return to home country for at least 2 years post-program to share expertise."
    ],
    requiredDocuments: [
      "Completed Fulbright Online Application Form.",
      "Academic transcript translations and degree evaluations.",
      "Three letters of recommendation (professional or academic).",
      "Personal statement (SOP) and Study/Research Objectives essay.",
      "Valid passport copy and English proficiency test certificate."
    ],
    officialUrl: "https://foreign.fulbrightonline.org/"
  },
  {
    id: "3",
    title: "CERN Openlab Summer Student Program",
    host: "CERN",
    location: "Geneva, Switzerland",
    countryCode: "CH",
    type: "Internship",
    fundingType: "Paid",
    amount: "CHF 90 / day + travel",
    currency: "CHF",
    deadline: "2027-01-31T00:00:00.000Z",
    academicLevels: ["Undergraduate", "Graduate"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Undergraduate", "STEM", "CERN"],
    gpaMin: 3.3,
    ieltsMin: 6.0,
    toeflMin: 80,
    experienceYearsMin: 0,
    description: "CERN is the birthplace of the World Wide Web and hosts the Large Hadron Collider. The CERN openlab Summer Student Program offers undergraduate and graduate students in computer science, physics, mathematics, or engineering the opportunity to work on cutting-edge IT projects. Students attend dedicated lectures on advanced computing topics and receive hands-on training with experts.",
    benefits: [
      "Daily allowance of CHF 90 to cover meals and accommodation in Geneva.",
      "Travel allowance to cover round-trip travel from home country.",
      "Subsidized housing reservations at CERN hostels.",
      "Membership in the CERN social club and access to research labs.",
      "A series of high-level lectures on high-performance computing, AI, and physics."
    ],
    eligibilityCriteria: [
      "Must be a registered Bachelor's or Master's student.",
      "Must have completed at least 3 years of university studies before summer 2027.",
      "Strong background in computer science, physics, or data engineering.",
      "Good command of English (minimum IELTS 6.0 or equivalent)."
    ],
    requiredDocuments: [
      "Detailed CV in English detailing programming projects and skills.",
      "Academic transcript of latest semesters.",
      "Reference letter from a university professor.",
      "Motivation letter highlighting tech stack and project preferences."
    ],
    officialUrl: "https://openlab.cern/education"
  },
  {
    id: "4",
    title: "DAAD Research Grants for PhD Candidates",
    host: "German Academic Exchange Service",
    location: "Germany",
    countryCode: "DE",
    type: "ResearchGrant",
    fundingType: "FullyFunded",
    amount: "€1,300 / month + travel",
    currency: "EUR",
    deadline: "2026-11-30T00:00:00.000Z",
    academicLevels: ["PhD", "PostDoc"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["PhD", "Research", "Germany"],
    gpaMin: 3.4,
    ieltsMin: 6.5,
    toeflMin: 90,
    experienceYearsMin: 1,
    description: "DAAD research grants provide doctoral candidates and young academics from all over the world with the opportunity to carry out research and continue their education in Germany. The grant aims to support doctoral projects at state-recognized German universities or non-university research institutes.",
    benefits: [
      "Monthly stipend of €1,300 for doctoral candidates.",
      "Payments towards health, accident, and personal liability insurance.",
      "Travel allowance for round-trip flights to Germany.",
      "One-off research allowance of €460 per year.",
      "Fully covered 2-month German language prep course prior to research commencement."
    ],
    eligibilityCriteria: [
      "Must hold a Master's degree (or equivalent) by the start of the grant.",
      "Excellent academic records with a GPA equivalent of 3.4 or higher.",
      "Should not have graduated more than six years ago.",
      "Confirmation of academic supervision by a German host professor."
    ],
    requiredDocuments: [
      "Online application form.",
      "Full CV with a list of publications if any.",
      "Detailed research proposal (maximum 10 pages) approved by host supervisor.",
      "Letter of confirmation of supervision from the German host professor.",
      "University degree certificates and transcripts."
    ],
    officialUrl: "https://www.daad.de/en/study-and-research-in-germany/scholarships/"
  },
  {
    id: "5",
    title: "Google STEP Internship 2026",
    host: "Google",
    location: "Zurich, Switzerland",
    countryCode: "CH",
    type: "Internship",
    fundingType: "Paid",
    amount: "Competitive salary + relocation",
    currency: "CHF",
    deadline: "2026-10-30T00:00:00.000Z",
    academicLevels: ["Undergraduate"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Undergrad Year 1 & 2", "CS", "Google"],
    gpaMin: 3.0,
    ieltsMin: 6.0,
    toeflMin: 80,
    experienceYearsMin: 0,
    description: "STEP (Student Training in Engineering Program) is a 12-week internship for first and second-year undergraduate students with a passion for computer science. The internship program includes software engineering projects, mentoring from Google engineers, and professional development seminars.",
    benefits: [
      "Highly competitive monthly salary.",
      "Relocation support and flight tickets to Zurich.",
      "Free daily breakfast, lunch, and snacks at the Zurich office.",
      "Direct mentorship from Google Software Engineers.",
      "Conversion opportunities for returning software engineering internships."
    ],
    eligibilityCriteria: [
      "Must be currently enrolled in a full-time Bachelor's program in Computer Science or related STEM field.",
      "Must be in your 1st or 2nd year of undergraduate study.",
      "Programming experience in Java, C++, Python, or Go.",
      "GPA of 3.0 or higher is preferred."
    ],
    requiredDocuments: [
      "Single-page CV including GitHub profile or coding project highlights.",
      "Current academic transcript listing coursework.",
      "Short essay answers explaining motivation for applying."
    ],
    officialUrl: "https://careers.google.com/students/"
  },
  {
    id: "6",
    title: "Schwarzman Scholars Program",
    host: "Tsinghua University",
    location: "Beijing, China",
    countryCode: "CN",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "Full tuition + room & stipend",
    currency: "USD",
    deadline: "2026-09-20T00:00:00.000Z",
    academicLevels: ["Graduate"],
    disciplines: ["SocialSciences", "Business", "Humanities"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Global Affairs", "Leadership"],
    gpaMin: 3.6,
    ieltsMin: 7.0,
    toeflMin: 100,
    experienceYearsMin: 0,
    description: "Schwarzman Scholars is the first scholarship created to respond to the geopolitical landscape of the 21st century. Located at Tsinghua University in Beijing, the program provides a fully-funded one-year Master's Degree in Global Affairs, bringing together young leaders from all over the world to foster geopolitical relationships.",
    benefits: [
      "Full tuition fees and health insurance.",
      "On-campus accommodation at Schwarzman College.",
      "Monthly living stipend of $1,000 for personal expenses.",
      "Study tours within China and custom corporate visits.",
      "Round-trip air travel to Beijing."
    ],
    eligibilityCriteria: [
      "Must have completed an undergraduate degree by August 2027.",
      "Must be between 18 and 28 years of age.",
      "Excellent leadership credentials and community service history.",
      "Strong academic record with a GPA equivalent of 3.6 or higher."
    ],
    requiredDocuments: [
      "Online application with three letters of recommendation.",
      "Official academic transcripts.",
      "Two essays: Leadership essay and Statement of Purpose.",
      "1-minute video introducing yourself.",
      "English language proficiency results."
    ],
    officialUrl: "https://www.schwarzmanscholars.org/"
  },
  {
    id: "7",
    title: "Gates Cambridge Scholarship",
    host: "Bill & Melinda Gates Foundation",
    location: "United Kingdom",
    countryCode: "GB",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "£20,000 / year + tuition",
    currency: "GBP",
    deadline: "2026-12-05T00:00:00.000Z",
    academicLevels: ["Graduate", "PhD"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Postgrad", "Cambridge", "UK"],
    gpaMin: 3.8,
    ieltsMin: 7.5,
    toeflMin: 110,
    experienceYearsMin: 0,
    description: "Gates Cambridge Scholarships are highly prestigious post-graduate awards for outstanding applicants from countries outside the UK to pursue a full-time postgraduate degree in any subject available at the University of Cambridge.",
    benefits: [
      "Full coverage of the University Composition Fee at Cambridge.",
      "Maintenance allowance of £20,000 per year.",
      "One round-trip airfare at the start and end of the course.",
      "Inbound visa costs and NHS health surcharge covered.",
      "Family allowance and academic travel funding eligibility."
    ],
    eligibilityCriteria: [
      "Citizen of any country outside the United Kingdom.",
      "Applying to pursue a PhD or Master's degree at Cambridge.",
      "Outstanding intellectual ability (recommended GPA of 3.8+ on 4.0 scale).",
      "Commitment to improving the lives of others through leadership."
    ],
    requiredDocuments: [
      "Cambridge Graduate Admission Application.",
      "Gates Cambridge Statement (explaining why you fit the scholarship).",
      "Academic transcripts and CV.",
      "Three academic reference letters.",
      "Gates Cambridge Reference (a reference focusing on your leadership)."
    ],
    officialUrl: "https://www.gatescambridge.org/"
  },
  {
    id: "8",
    title: "ETH Zurich Excellence Scholarship",
    host: "ETH Zurich",
    location: "Zurich, Switzerland",
    countryCode: "CH",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "CHF 12,000 / semester",
    currency: "CHF",
    deadline: "2026-12-15T00:00:00.000Z",
    academicLevels: ["Graduate"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Academic Excellence", "ETH"],
    gpaMin: 3.7,
    ieltsMin: 7.0,
    toeflMin: 100,
    experienceYearsMin: 0,
    description: "ETH Zurich supports excellent students wishing to pursue a Master's degree. The Excellence Scholarship & Opportunity Program (ESOP) covers the full study and living costs, enabling scholars to focus completely on their academic work.",
    benefits: [
      "Stipend of CHF 12,000 per semester to cover living expenses.",
      "Full tuition fee waiver for the Master's program.",
      "Dedicated supervision by an ETH faculty mentor.",
      "Special networking events with corporate sponsors."
    ],
    eligibilityCriteria: [
      "Very good result in their Bachelor's degree (top 10% of cohort, GPA 3.7+).",
      "Admitted to an eligible STEM Master's degree at ETH Zurich.",
      "Strong research interest and pre-project outline.",
      "English proficiency score: minimum IELTS 7.0 or TOEFL 100."
    ],
    requiredDocuments: [
      "Online Master's Application form.",
      "Pre-proposal for your Master's thesis (maximum 3 pages).",
      "Two letters of reference from professors.",
      "CV listing academic awards and research projects."
    ],
    officialUrl: "https://ethz.ch/students/en/studies/financial/scholarships/excellencescholarship.html"
  },
  {
    id: "9",
    title: "CERN Senior Fellowship Program",
    host: "CERN",
    location: "Geneva, Switzerland",
    countryCode: "CH",
    type: "Fellowship",
    fundingType: "Paid",
    amount: "Stipend + travel + family allowance",
    currency: "CHF",
    deadline: "2026-09-01T00:00:00.000Z",
    academicLevels: ["PhD", "PostDoc"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Fellow", "Physics", "CERN"],
    gpaMin: 3.5,
    ieltsMin: 6.5,
    toeflMin: 90,
    experienceYearsMin: 3,
    description: "The Senior Fellowship Program is designed for PhD graduates or senior engineers with at least 3 years of post-degree experience who wish to carry out research or technical projects in particle physics, computing, or advanced engineering at CERN.",
    benefits: [
      "Monthly employment contract with stipend starting at CHF 6,500.",
      "Travel expenses covered to/from Geneva for the fellow and family.",
      "Installation and relocation allowance.",
      "Family allowance and child allowance based on eligibility.",
      "Excellent CERN health insurance coverage."
    ],
    eligibilityCriteria: [
      "Must have a PhD or a Master's degree with at least 3 years of professional experience.",
      "Specialization in applied physics, electronics, computing, or mechanical engineering.",
      "Citizenship of a CERN member state or associate member state is preferred.",
      "Good command of English or French."
    ],
    requiredDocuments: [
      "Completed online application profile.",
      "Detailed CV listing publications and conference talks.",
      "Three letters of professional reference.",
      "List of past projects and scientific achievements summary."
    ],
    officialUrl: "https://careers.cern/fellows"
  },
  {
    id: "10",
    title: "AAS Research Grant in Space Sciences",
    host: "American Astronomical Society",
    location: "United States",
    countryCode: "US",
    type: "ResearchGrant",
    fundingType: "PartiallyFunded",
    amount: "Up to $15,000 research budget",
    currency: "USD",
    deadline: "2026-10-15T00:00:00.000Z",
    academicLevels: ["PhD", "PostDoc", "EarlyCareer"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Space Science", "Research", "AAS"],
    gpaMin: 3.2,
    ieltsMin: 6.5,
    toeflMin: 90,
    experienceYearsMin: 1,
    description: "The American Astronomical Society offers small research grants to support telescope time, computing allocations, and research travel for early-career astronomers and PhD students in space sciences and astrophysics.",
    benefits: [
      "Grant funding up to $15,000 for travel and computational expenses.",
      "Free registration for the AAS annual conferences.",
      "Access to NASA-affiliated data storage clusters."
    ],
    eligibilityCriteria: [
      "Must be an active PhD candidate or within 5 years of PhD completion.",
      "Member of the American Astronomical Society (membership can be applied for concurrently).",
      "Research project must be in astronomical sciences or space physics."
    ],
    requiredDocuments: [
      "Research proposal of maximum 5 pages.",
      "Budget request with cost itemization.",
      "Curriculum Vitae.",
      "Support letter from department chair or advisor."
    ],
    officialUrl: "https://aas.org/grants-and-prizes"
  },
  {
    id: "11",
    title: "KAUST VSRP Internship",
    host: "King Abdullah University of Science and Technology",
    location: "Saudi Arabia",
    countryCode: "SA",
    type: "Internship",
    fundingType: "Paid",
    amount: "$1,000 / month + housing + flights",
    currency: "USD",
    deadline: "2026-12-31T00:00:00.000Z",
    academicLevels: ["Undergraduate", "Graduate"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Research Internship", "STEM", "KAUST"],
    gpaMin: 3.5,
    ieltsMin: 6.5,
    toeflMin: 90,
    experienceYearsMin: 0,
    description: "The Visiting Student Research Program (VSRP) is a 3-to-6 month research internship opportunity for undergraduate and graduate students to participate in active research projects at KAUST's state-of-the-art labs in Saudi Arabia.",
    benefits: [
      "Monthly stipend of $1,000.",
      "Private bedroom and bathroom in shared campus housing.",
      "Visa fees and round-trip air travel covered.",
      "Health insurance and access to community recreation facilities.",
      "Full access to cutting-edge cleanrooms and computing clusters."
    ],
    eligibilityCriteria: [
      "Undergraduate student in 3rd or 4th year, or Master's student.",
      "CGPA of 3.5 or higher on a 4.0 scale.",
      "Majoring in STEM fields matching available laboratory projects.",
      "Strong research interests and solid English communication."
    ],
    requiredDocuments: [
      "Official academic transcript.",
      "Letter of recommendation from home university faculty member.",
      "Statement of Purpose detailing project selection.",
      "Passport copy and CV."
    ],
    officialUrl: "https://vsrp.kaust.edu.sa/"
  },
  {
    id: "12",
    title: "Humboldt Research Fellowship",
    host: "Alexander von Humboldt Foundation",
    location: "Germany",
    countryCode: "DE",
    type: "Fellowship",
    fundingType: "FullyFunded",
    amount: "€2,650 / month + travel expenses",
    currency: "EUR",
    deadline: null,
    academicLevels: ["PostDoc", "EarlyCareer"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Postdoc", "Research Mobility", "Humboldt"],
    gpaMin: 3.5,
    ieltsMin: 6.5,
    toeflMin: 90,
    experienceYearsMin: 2,
    description: "The Humboldt Research Fellowship for postdoctoral researchers allows academics from abroad to carry out long-term research (6-24 months) in cooperation with an academic host at a research institution in Germany. The fellowship is open to researchers of all nationalities and disciplines.",
    benefits: [
      "Monthly fellowship stipend of €2,650.",
      "Mobility allowance and contribution to health insurance.",
      "Travel expenses contribution for round-trip travel.",
      "Additional family allowances for spouse and children.",
      "Alumni sponsorship network access for lifelong German research cooperation."
    ],
    eligibilityCriteria: [
      "PhD completed within the last four years.",
      "Excellent academic track record with numerous publications.",
      "Academic host institution in Germany confirmed.",
      "Good knowledge of German or English."
    ],
    requiredDocuments: [
      "Research proposal (maximum 5 pages).",
      "Host's statement and confirmation of research facilities.",
      "Two key publications list.",
      "Three letters of recommendation.",
      "PhD certificate and university transcripts."
    ],
    officialUrl: "https://www.humboldt-foundation.de/en/apply/sponsor-programmes/humboldt-research-fellowship"
  }
];

module.exports = { MOCK_OPPORTUNITIES };
