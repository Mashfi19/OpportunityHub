import { DetailOpportunity, UniversityProfile, OrganizationProfile, CountryProfile } from "../types";

export const MOCK_COUNTRIES: CountryProfile[] = [
  { code: "US", name: "United States", region: "North America", description: "World's largest hub for research universities and innovative fellowships." },
  { code: "DE", name: "Germany", region: "Europe", description: "Famous for tuition-free public universities and extensive DAAD grants." },
  { code: "CH", name: "Switzerland", region: "Europe", description: "Home to leading research institutes like ETH Zurich and high-end life sciences." },
  { code: "GB", name: "United Kingdom", region: "Europe", description: "A historic academic center featuring Oxford, Cambridge, and prestigious Commonwealth awards." },
  { code: "EU", name: "Europe (Multiple)", region: "Europe", description: "Focuses on Erasmus Mundus cross-border mobility master programs." },
  { code: "CN", name: "China", region: "Asia", description: "Rapidly rising global educational hub offering generous Chinese Government scholarships." },
  { code: "SA", name: "Saudi Arabia", region: "Middle East", description: "Offers fully funded science and tech programs at institutions like KAUST." },
  { code: "IN", name: "India", region: "Asia", description: "A vast education network with top-tier technical institutes and research grants." },
  { code: "JP", name: "Japan", region: "Asia", description: "Combines rich traditional values with world-class engineering and MEXT scholarships." },
  { code: "CA", name: "Canada", region: "North America", description: "Popular study destination with friendly immigration options and research funding." },
  { code: "AU", name: "Australia", region: "Oceania", description: "Features high quality of living and top-tier research universities." },
  { code: "SG", name: "Singapore", region: "Asia", description: "A global hub for business and technology hosting world-ranking universities." },
  { code: "BD", name: "Bangladesh", region: "Asia", description: "Rising South Asian country with emerging research institutes and global partnerships." },
  { code: "FR", name: "France", region: "Europe", description: "Home to historical institutions, high-end science research, and generous Eiffel Excellence scholarships." },
  { code: "NL", name: "Netherlands", region: "Europe", description: "Renowned for English-taught degrees, top tech universities, and NL scholarships." },
  { code: "SE", name: "Sweden", region: "Europe", description: "Pioneer in sustainability research and host to Swedish Institute global awards." },
  { code: "KR", name: "South Korea", region: "Asia", description: "Fast-growing high-tech education destination offering Global Korea Scholarships (GKS)." },
  { code: "IT", name: "Italy", region: "Europe", description: "Combines historic universities with public tuition-fee waivers and regional study grants." },
  { code: "FI", name: "Finland", region: "Europe", description: "Renowned for high quality of life, innovation, and generous university scholarships for international master's students." },
  { code: "NO", name: "Norway", region: "Europe", description: "Offers professional and research opportunities with special emphasis on energy, marine research, and sustainability." },
  { code: "BE", name: "Belgium", region: "Europe", description: "A central European research hub hosting international government scholarships like Master Mind." },
  { code: "ES", name: "Spain", region: "Europe", description: "Hosts prestigious business schools and universities offering language, tech, and cultural exchange grants." }
];

export const COUNTRIES = MOCK_COUNTRIES;

export const MOCK_UNIVERSITIES: UniversityProfile[] = [
  {
    id: "uni-1",
    name: "Harvard University",
    countryCode: "US",
    websiteUrl: "https://www.harvard.edu",
    logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
    description: "Harvard University is a private Ivy League research university in Cambridge, Massachusetts, established in 1636 and famous for its global leadership.",
    rankingGlobal: 1,
    rankingNational: 1,
    acceptanceRate: 3.4,
    averageTuition: "$55,000 / year",
    satRange: "1480-1580",
    actRange: "33-35",
    studentPopulation: 23000
  },
  {
    id: "uni-2",
    name: "Massachusetts Institute of Technology",
    countryCode: "US",
    websiteUrl: "https://www.mit.edu",
    logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
    description: "MIT is a world-renowned private research university in Cambridge, Massachusetts, established in 1861 and leading in tech education.",
    rankingGlobal: 2,
    rankingNational: 2,
    acceptanceRate: 4.0,
    averageTuition: "$57,500 / year",
    satRange: "1510-1580",
    actRange: "34-36",
    studentPopulation: 11500
  },
  {
    id: "uni-3",
    name: "University of Oxford",
    countryCode: "GB",
    websiteUrl: "https://www.ox.ac.uk",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "The University of Oxford in England is the oldest university in the English-speaking world, offering outstanding academic tutorials.",
    rankingGlobal: 3,
    rankingNational: 1,
    acceptanceRate: 14.3,
    averageTuition: "£28,500 / year",
    satRange: "1470-1560",
    actRange: "32-35",
    studentPopulation: 24000
  },
  {
    id: "uni-4",
    name: "Technical University of Munich",
    countryCode: "DE",
    websiteUrl: "https://www.tum.de",
    logoUrl: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
    description: "TUM is Germany's premier public research university, specializing in engineering, technology, medicine, and applied sciences.",
    rankingGlobal: 37,
    rankingNational: 1,
    acceptanceRate: 8.0,
    averageTuition: "No Tuition Fees (Semester fee €150)",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 48000
  },
  {
    id: "uni-5",
    name: "ETH Zurich",
    countryCode: "CH",
    websiteUrl: "https://ethz.ch",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "ETH Zurich is a public research university in Zürich, Switzerland, specializing in science, technology, engineering and mathematics.",
    rankingGlobal: 7,
    rankingNational: 1,
    acceptanceRate: 12.0,
    averageTuition: "CHF 1,500 / year",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 22000
  },
  {
    id: "uni-6",
    name: "University of Toronto",
    countryCode: "CA",
    websiteUrl: "https://www.utoronto.ca",
    logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
    description: "The University of Toronto is a public research university in Toronto, Ontario, Canada, famous for discovery of insulin and deep learning foundations.",
    rankingGlobal: 21,
    rankingNational: 1,
    acceptanceRate: 43.0,
    averageTuition: "$45,000 / year",
    satRange: "1350-1500",
    actRange: "29-33",
    studentPopulation: 61000
  },
  {
    id: "uni-7",
    name: "National University of Singapore",
    countryCode: "SG",
    websiteUrl: "https://www.nus.edu.sg",
    logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
    description: "NUS is a leading global university centered in Asia, offering a global approach to education and research with a focus on Asian perspectives.",
    rankingGlobal: 8,
    rankingNational: 1,
    acceptanceRate: 5.0,
    averageTuition: "$30,000 / year",
    satRange: "1450-1550",
    actRange: "31-34",
    studentPopulation: 38000
  },
  {
    id: "uni-8",
    name: "Stanford University",
    countryCode: "US",
    websiteUrl: "https://www.stanford.edu",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "Stanford University is a private research university in Stanford, California, and one of the world's most prestigious institutions.",
    rankingGlobal: 4,
    rankingNational: 3,
    acceptanceRate: 3.9,
    averageTuition: "$57,000 / year",
    satRange: "1470-1570",
    actRange: "33-35",
    studentPopulation: 17000
  },
  {
    id: "uni-9",
    name: "University of Cambridge",
    countryCode: "GB",
    websiteUrl: "https://www.cam.ac.uk",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "The University of Cambridge is a public collegiate research university in Cambridge, United Kingdom, founded in 1209.",
    rankingGlobal: 5,
    rankingNational: 2,
    acceptanceRate: 15.0,
    averageTuition: "£32,000 / year",
    satRange: "1460-1560",
    actRange: "32-35",
    studentPopulation: 22000
  },
  {
    id: "uni-10",
    name: "University of Tokyo",
    countryCode: "JP",
    websiteUrl: "https://www.u-tokyo.ac.jp",
    logoUrl: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
    description: "The University of Tokyo is a prestigious public research university in Bunkyo, Tokyo, Japan, established in 1877.",
    rankingGlobal: 28,
    rankingNational: 1,
    acceptanceRate: 34.0,
    averageTuition: "¥535,800 / year",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 28000
  },
  {
    id: "uni-11",
    name: "Delft University of Technology",
    countryCode: "NL",
    websiteUrl: "https://www.tudelft.nl",
    logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
    description: "TU Delft is the oldest and largest Dutch public technical university, recognized globally for architecture and engineering.",
    rankingGlobal: 70,
    rankingNational: 1,
    acceptanceRate: 40.0,
    averageTuition: "€15,000 / year",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 26000
  },
  {
    id: "uni-12",
    name: "Sorbonne University",
    countryCode: "FR",
    websiteUrl: "https://www.sorbonne-universite.fr",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "Sorbonne University is a public research university in Paris, France, established in 1257, renowned for arts, humanities, and sciences.",
    rankingGlobal: 83,
    rankingNational: 2,
    acceptanceRate: 10.0,
    averageTuition: "€243 / year (Public subsidized)",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 55000
  },
  {
    id: "uni-13",
    name: "University of Melbourne",
    countryCode: "AU",
    websiteUrl: "https://www.unimelb.edu.au",
    logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
    description: "The University of Melbourne is a public research university in Melbourne, Australia, founded in 1853, ranking as Australia's top university.",
    rankingGlobal: 14,
    rankingNational: 1,
    acceptanceRate: 70.0,
    averageTuition: "A$42,000 / year",
    satRange: "1350-1500",
    actRange: "29-33",
    studentPopulation: 54000
  },
  {
    id: "uni-14",
    name: "Seoul National University",
    countryCode: "KR",
    websiteUrl: "https://www.snu.ac.kr",
    logoUrl: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
    description: "Seoul National University is a national research university in Seoul, South Korea, widely regarded as the most prestigious in the country.",
    rankingGlobal: 41,
    rankingNational: 1,
    acceptanceRate: 15.0,
    averageTuition: "₩6,000,000 / year",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 27000
  },
  {
    id: "uni-15",
    name: "Yale University",
    countryCode: "US",
    websiteUrl: "https://www.yale.edu",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "Yale University is a private Ivy League research university in New Haven, Connecticut, founded in 1701, known for its outstanding liberal arts and graduate programs.",
    rankingGlobal: 9,
    rankingNational: 5,
    acceptanceRate: 4.3,
    averageTuition: "$62,000 / year",
    satRange: "1480-1580",
    actRange: "33-35",
    studentPopulation: 14500
  },
  {
    id: "uni-16",
    name: "Imperial College London",
    countryCode: "GB",
    websiteUrl: "https://www.imperial.ac.uk",
    logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
    description: "Imperial College London is a world-class public research university specializing in science, engineering, medicine, and business.",
    rankingGlobal: 6,
    rankingNational: 3,
    acceptanceRate: 15.0,
    averageTuition: "£34,000 / year",
    satRange: "1450-1550",
    actRange: "32-35",
    studentPopulation: 20000
  },
  {
    id: "uni-17",
    name: "Nanyang Technological University",
    countryCode: "SG",
    websiteUrl: "https://www.ntu.edu.sg",
    logoUrl: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
    description: "Nanyang Technological University (NTU) is a prestigious research-intensive public university in Singapore, ranked among the world's best for engineering and technology.",
    rankingGlobal: 15,
    rankingNational: 2,
    acceptanceRate: 15.0,
    averageTuition: "$32,000 / year",
    satRange: "1440-1540",
    actRange: "31-34",
    studentPopulation: 33000
  },
  {
    id: "uni-18",
    name: "University of British Columbia",
    countryCode: "CA",
    websiteUrl: "https://www.ubc.ca",
    logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
    description: "UBC is a global center for research and teaching, consistently ranked among the top 20 public universities in the world, with campuses in Vancouver and Kelowna.",
    rankingGlobal: 34,
    rankingNational: 2,
    acceptanceRate: 40.0,
    averageTuition: "$42,000 / year",
    satRange: "1350-1480",
    actRange: "29-33",
    studentPopulation: 68000
  },
  {
    id: "uni-19",
    name: "Australian National University",
    countryCode: "AU",
    websiteUrl: "https://www.anu.edu.au",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "ANU is a celebrated public research university located in Canberra, the capital of Australia, known for its high-impact research output and small class sizes.",
    rankingGlobal: 30,
    rankingNational: 2,
    acceptanceRate: 35.0,
    averageTuition: "A$41,000 / year",
    satRange: "1340-1480",
    actRange: "29-33",
    studentPopulation: 21000
  },
  {
    id: "uni-20",
    name: "Kyoto University",
    countryCode: "JP",
    websiteUrl: "https://www.kyoto-u.ac.jp",
    logoUrl: "https://images.unsplash.com/photo-1527891751199-7225231a68dd?w=120&h=120&fit=crop",
    description: "Kyoto University is one of Japan's oldest and most prestigious national universities, famed for producing numerous Nobel Laureates and pioneering research.",
    rankingGlobal: 46,
    rankingNational: 2,
    acceptanceRate: 30.0,
    averageTuition: "¥535,800 / year",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 22000
  },
  {
    id: "uni-21",
    name: "Karolinska Institutet",
    countryCode: "SE",
    websiteUrl: "https://ki.se",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "Karolinska Institutet is one of the world's foremost medical universities, located in Stockholm, Sweden, and hosts the Nobel Assembly that awards the Nobel Prize in Physiology or Medicine.",
    rankingGlobal: 38,
    rankingNational: 1,
    acceptanceRate: 12.0,
    averageTuition: "SEK 180,000 / year",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 6000
  },
  {
    id: "uni-22",
    name: "University of Helsinki",
    countryCode: "FI",
    websiteUrl: "https://www.helsinki.fi",
    logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
    description: "The University of Helsinki is the oldest and largest institution of academic education in Finland, boasting a high degree of internationalization and research output.",
    rankingGlobal: 115,
    rankingNational: 1,
    acceptanceRate: 15.0,
    averageTuition: "€15,000 / year",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 31200
  },
  {
    id: "uni-23",
    name: "University of Oslo",
    countryCode: "NO",
    websiteUrl: "https://www.uio.no",
    logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
    description: "The University of Oslo is Norway's oldest and highest ranked university, offering a wide array of programs in life sciences, energy, and humanities.",
    rankingGlobal: 101,
    rankingNational: 1,
    acceptanceRate: 10.0,
    averageTuition: "NOK 150,000 / year",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 26000
  },
  {
    id: "uni-24",
    name: "KU Leuven",
    countryCode: "BE",
    websiteUrl: "https://www.kuleuven.be",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "KU Leuven is a prestigious research university in Leuven, Belgium, consistently ranked as Europe's most innovative university.",
    rankingGlobal: 45,
    rankingNational: 1,
    acceptanceRate: 45.0,
    averageTuition: "€6,000 / year",
    satRange: "Not Required",
    actRange: "Not Required",
    studentPopulation: 60000
  }
];

export const MOCK_ORGANIZATIONS: OrganizationProfile[] = [
  {
    id: "org-1",
    name: "German Academic Exchange Service (DAAD)",
    logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=120&h=120&fit=crop",
    description: "The DAAD is the world's largest funding organization for the international exchange of students and researchers.",
    websiteUrl: "https://www.daad.de",
    type: "Government",
    foundedYear: 1925
  },
  {
    id: "org-2",
    name: "Fulbright Commission",
    logoUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
    description: "The Fulbright Program is one of the several United States Cultural Exchange Programs aiming to improve intercultural relations.",
    websiteUrl: "https://us.fulbrightonline.org",
    type: "Government",
    foundedYear: 1946
  },
  {
    id: "org-3",
    name: "European Commission",
    logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop",
    description: "The executive branch of the European Union, responsible for proposing legislation, implementing decisions, and managing programmes like Erasmus Mundus.",
    websiteUrl: "https://ec.europa.eu",
    type: "Government",
    foundedYear: 1958
  },
  {
    id: "org-4",
    name: "Bill & Melinda Gates Foundation",
    logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
    description: "Guided by the belief that every life has equal value, the Gates Foundation works to help all people lead healthy, productive lives.",
    websiteUrl: "https://www.gatesfoundation.org",
    type: "Foundation",
    foundedYear: 2000
  },
  {
    id: "org-5",
    name: "Google Research",
    logoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=120&fit=crop",
    description: "Google's research division dedicated to solving hard computer science problems and funding academic research globally.",
    websiteUrl: "https://research.google",
    type: "Corporate",
    foundedYear: 1998
  },
  {
    id: "org-6",
    name: "Commonwealth Scholarship Commission",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&h=120&fit=crop",
    description: "The CSC provides scholarships and fellowships for citizens of Commonwealth countries, funded by the UK government.",
    websiteUrl: "https://cscuk.fcdo.gov.uk",
    type: "Government",
    foundedYear: 1959
  },
  {
    id: "org-7",
    name: "Alexander von Humboldt Foundation",
    logoUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
    description: "The Humboldt Foundation promotes academic cooperation between excellent scientists and scholars from abroad and from Germany.",
    websiteUrl: "https://www.humboldt-foundation.de",
    type: "Foundation",
    foundedYear: 1953
  },
  {
    id: "org-8",
    name: "Wellcome Trust",
    logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop",
    description: "Wellcome Trust is a global charitable foundation focused on health and scientific research based in London, United Kingdom.",
    websiteUrl: "https://wellcome.org",
    type: "Foundation",
    foundedYear: 1936
  },
  {
    id: "org-9",
    name: "Mastercard Foundation",
    logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
    description: "The Mastercard Foundation works to address global poverty and promote financial inclusion and educational access across developing nations.",
    websiteUrl: "https://mastercardfdn.org",
    type: "Foundation",
    foundedYear: 2006
  },
  {
    id: "org-10",
    name: "Rotary Foundation",
    logoUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
    description: "Rotary Foundation is a non-profit organization that funds global humanitarian grants, peace fellowships, and local community service projects.",
    websiteUrl: "https://www.rotary.org",
    type: "Foundation",
    foundedYear: 1917
  },
  {
    id: "org-11",
    name: "Samsung Research",
    logoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=120&fit=crop",
    description: "Samsung Electronics' advanced R&D hub, driving future technologies and offering global computing and engineering internships.",
    websiteUrl: "https://research.samsung.com",
    type: "Corporate",
    foundedYear: 1969
  },
  {
    id: "org-12",
    name: "The Rockefeller Foundation",
    logoUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&h=120&fit=crop",
    description: "A private science-driven philanthropic organization dedicated to promoting the well-being of humanity throughout the world.",
    websiteUrl: "https://www.rockefellerfoundation.org",
    type: "Foundation",
    foundedYear: 1913
  },
  {
    id: "org-13",
    name: "Rhodes Trust",
    logoUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
    description: "An educational charity administering the Rhodes Scholarships, prestigious postgraduate awards for Oxford University studies.",
    websiteUrl: "https://www.rhodeshouse.ox.ac.uk",
    type: "Foundation",
    foundedYear: 1902
  },
  {
    id: "org-14",
    name: "Boehringer Ingelheim Fonds",
    logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop",
    description: "A non-profit organization supporting outstanding basic research in biomedicine by funding excellent PhD candidates.",
    websiteUrl: "https://www.bifonds.de",
    type: "Foundation",
    foundedYear: 1983
  },
  {
    id: "org-15",
    name: "L'Oréal Foundation",
    logoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=120&h=120&fit=crop",
    description: "Supports women scientists, access to education, and reconstructive surgery through programs like L'Oréal-UNESCO For Women in Science.",
    websiteUrl: "https://www.fondationloreal.com",
    type: "Foundation",
    foundedYear: 2007
  },
  {
    id: "org-16",
    name: "Knut and Alice Wallenberg Foundation",
    logoUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=120&h=120&fit=crop",
    description: "Sweden's largest private research funding foundation, supporting basic research in medicine, technology, and natural sciences.",
    websiteUrl: "https://kaw.wallenberg.org",
    type: "Foundation",
    foundedYear: 1917
  }
];

export const MAJORS = [
  { code: "STEM", name: "Science, Tech, Engineering & Math" },
  { code: "Humanities", name: "Humanities & Languages" },
  { code: "SocialSciences", name: "Social Sciences & Policy" },
  { code: "Medicine", name: "Medicine & Health" },
  { code: "Arts", name: "Arts & Design" },
  { code: "Business", name: "Business, Finance & Econ" }
];

export const MOCK_OPPORTUNITIES: DetailOpportunity[] = [
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
    deadline: new Date("2027-01-15"),
    academicLevels: ["Graduate"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Mobility", "Europe"],
    gpaMin: 3.2,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-4",
    organizationId: "org-3",
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-10-01") },
      { event: "Application Deadline", date: new Date("2027-01-15") },
      { event: "Selection Interviews", date: new Date("2027-03-10") },
      { event: "Results Announcement", date: new Date("2027-05-01") },
      { event: "Program Commencement", date: new Date("2027-09-01") }
    ],
    applicationSteps: [
      "Review the catalogue of Erasmus Mundus Joint Master programs and select up to three courses.",
      "Visit the website of your chosen master program and review specific requirements.",
      "Prepare your academic records, CV, SOP, and secure two recommendation letters.",
      "Submit your complete application through the program's official online portal before January 15.",
      "Attend the online interview if shortlisted by the selection consortium."
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
    deadline: new Date("2026-10-12"),
    academicLevels: ["Graduate", "PhD"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Graduate", "Leadership", "US"],
    gpaMin: 3.5,
    ieltsMin: 7.0,
    toeflMin: 100,
    satMin: 1450,
    actMin: 32,
    experienceYearsMin: 2,
    universityId: "uni-1",
    organizationId: "org-2",
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-02-01") },
      { event: "Submission Deadline", date: new Date("2026-10-12") },
      { event: "National Interviews", date: new Date("2026-11-20") },
      { event: "Placement In US Universities", date: new Date("2027-04-15") },
      { event: "Pre-Departure Orientation", date: new Date("2027-07-01") }
    ],
    applicationSteps: [
      "Locate the Fulbright commission or US embassy website in your home country to read country-specific deadlines and requirements.",
      "Draft your study objectives outlining why your research must be completed at a US institution.",
      "Request three recommendation letters early through the online system.",
      "Submit the application online along with certified academic translations.",
      "Complete the in-person or virtual interview with the national selection panel."
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
    deadline: new Date("2027-01-31"),
    academicLevels: ["Undergraduate", "Graduate"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Undergraduate", "STEM", "CERN"],
    gpaMin: 3.3,
    ieltsMin: 6.0,
    toeflMin: 80,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-5",
    organizationId: "org-5",
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-11-01") },
      { event: "Application Deadline", date: new Date("2027-01-31") },
      { event: "Project Matchmaking Selection", date: new Date("2027-03-15") },
      { event: "Final Offers Dispatched", date: new Date("2027-04-10") },
      { event: "Program Starts", date: new Date("2027-06-15") }
    ],
    applicationSteps: [
      "Prepare your CV, emphasizing coding proficiency (C++, Python, Go) and system administration experience.",
      "Ask a university professor to write a recommendation letter focusing on your technical achievements.",
      "Complete the online application form and upload your transcripts.",
      "Indicate your research fields of interest (e.g., ML, Data Storage, Quantum Computing) during submission."
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
    deadline: new Date("2026-11-30"),
    academicLevels: ["PhD", "PostDoc"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["PhD", "Research", "Germany"],
    gpaMin: 3.4,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 1,
    universityId: "uni-4",
    organizationId: "org-1",
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-07-01") },
      { event: "Application Deadline", date: new Date("2026-11-30") },
      { event: "Selection Committee Review", date: new Date("2027-02-15") },
      { event: "Notification of Awards", date: new Date("2027-04-30") },
      { event: "German Language Course Start", date: new Date("2027-08-01") }
    ],
    applicationSteps: [
      "Identify a host professor in Germany who is willing to supervise your research project.",
      "Write a detailed research proposal detailing methodology and scheduling.",
      "Obtain the signed letter of academic supervision from the host university.",
      "Submit all application documents via the DAAD portal before November 30."
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
    deadline: new Date("2026-10-30"),
    academicLevels: ["Undergraduate"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Undergrad Year 1 & 2", "CS", "Google"],
    gpaMin: 3.0,
    ieltsMin: 6.0,
    toeflMin: 80,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-5",
    organizationId: "org-5",
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-09-01") },
      { event: "Application Deadline", date: new Date("2026-10-30") },
      { event: "Coding Assessment", date: new Date("2026-11-15") },
      { event: "Technical Interviews", date: new Date("2026-12-10") },
      { event: "Internship Starts", date: new Date("2027-06-01") }
    ],
    applicationSteps: [
      "Prepare a clean, one-page software engineering resume emphasizing projects, tech stack, and GitHub links.",
      "Submit your resume and transcript on Google's career website.",
      "Complete the Google Online Challenge (coding assessment) sent to applicants.",
      "Prepare for two virtual technical interviews covering basic data structures and algorithms."
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
    deadline: new Date("2026-09-20"),
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-04-15") },
      { event: "Application Deadline", date: new Date("2026-09-20") },
      { event: "Interview Notifications", date: new Date("2026-10-15") },
      { event: "In-Person Interviews", date: new Date("2026-11-05") },
      { event: "Program Commencement", date: new Date("2027-08-15") }
    ],
    applicationSteps: [
      "Write drafts of your leadership statement, detailing how you managed a project or drove community impact.",
      "Record a high-quality 1-minute video introduction.",
      "Ask academic and professional mentors to upload recommendations via the portal.",
      "Submit the application online, and if selected, attend the leadership panel interview."
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
    deadline: new Date("2026-12-05"),
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-09-01") },
      { event: "Application Deadline", date: new Date("2026-12-05") },
      { event: "Department Ranking", date: new Date("2027-01-20") },
      { event: "Selection Interviews", date: new Date("2027-03-05") },
      { event: "Scholarship Offers", date: new Date("2027-04-15") }
    ],
    applicationSteps: [
      "Apply for admission to the University of Cambridge through the Graduate Admissions Portal.",
      "Complete the dedicated Gates Cambridge section of the application form.",
      "Arrange for your referees to submit their academic reference letters and the Gates reference letter.",
      "Submit the application form by the national deadline."
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
    deadline: new Date("2026-12-15"),
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-11-01") },
      { event: "Application Deadline", date: new Date("2026-12-15") },
      { event: "Review by Admissions Committee", date: new Date("2027-02-28") },
      { event: "Notification of Results", date: new Date("2027-03-31") },
      { event: "Autumn Semester Starts", date: new Date("2027-09-15") }
    ],
    applicationSteps: [
      "Select a Master's degree program at ETH Zurich and check admissions criteria.",
      "Draft a thesis pre-proposal, detailing the research question and methods.",
      "Submit the master admissions application and include the ESOP application form.",
      "Ensure reference letters are uploaded by December 15."
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
    deadline: new Date("2026-09-01"),
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-06-01") },
      { event: "Application Deadline", date: new Date("2026-09-01") },
      { event: "Selection Committee Review", date: new Date("2026-11-15") },
      { event: "Contract Offers Sent", date: new Date("2026-12-15") },
      { event: "Fellowship Start", date: new Date("2027-02-01") }
    ],
    applicationSteps: [
      "Complete the online application form on the CERN careers page.",
      "Submit your research list and project outlines.",
      "Instruct your referees to submit recommendation letters directly via the provided link.",
      "Participate in the technical video interview with the section leader."
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
    deadline: new Date("2026-10-15"),
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
    timeline: [
      { event: "Applications Open", date: new Date("2026-08-01") },
      { event: "Application Deadline", date: new Date("2026-10-15") },
      { event: "Awards Announced", date: new Date("2026-12-15") },
      { event: "Funding Disbursed", date: new Date("2027-01-15") }
    ],
    applicationSteps: [
      "Write a research proposal explaining target telescope operations or data analysis methodologies.",
      "Formulate a cost-itemized budget for travel or computational resource acquisition.",
      "Submit application through the AAS grant portal."
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
    deadline: new Date("2026-12-31"),
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
    timeline: [
      { event: "Applications Open", date: null }, // Rolling
      { event: "Application Deadline", date: new Date("2026-12-31") },
      { event: "Interview with Principal Investigator", date: null },
      { event: "Visa Processing", date: null }
    ],
    applicationSteps: [
      "Browse the catalog of VSRP projects on the KAUST internship portal.",
      "Select a research project and review the project faculty supervisor details.",
      "Submit your online application including resume, statement, and recommendation.",
      "Attend the technical interview with the principal investigator if contacted."
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
    deadline: null, // Rolling
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
    timeline: [
      { event: "Applications Open", date: null }, // Rolling
      { event: "Selection Committee Meets", date: new Date("2026-11-15") },
      { event: "Notification of Outcome", date: new Date("2026-12-15") }
    ],
    applicationSteps: [
      "Identify a host scholar in Germany and align on a research project proposal.",
      "Gather your publications list, recommendation letters, and certificates.",
      "Submit the application online. Committee meets in March, July, and November."
    ],
    officialUrl: "https://www.humboldt-foundation.de/en/apply/sponsor-programmes/humboldt-research-fellowship"
  },
  {
    id: "13",
    title: "Eiffel Excellence Scholarship Program",
    host: "Ministry for Europe and Foreign Affairs",
    location: "Paris, France",
    countryCode: "FR",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "€1,181 / month + travel",
    currency: "EUR",
    deadline: new Date("2027-01-10"),
    academicLevels: ["Graduate", "PhD"],
    disciplines: ["STEM", "SocialSciences", "Business"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "PhD", "Eiffel", "France"],
    gpaMin: 3.4,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-12",
    organizationId: "org-3",
    description: "The Eiffel Excellence Scholarship Program was established by the French Ministry for Europe and Foreign Affairs to enable French higher education institutions to attract top foreign students for master's and PhD programs.",
    benefits: [
      "Monthly allowance of €1,181 for master's level students.",
      "Monthly allowance of €1,400 for PhD level students.",
      "International travel costs and local transport costs covered.",
      "Health insurance and housing search assistance."
    ],
    eligibilityCriteria: [
      "Foreign nationality (non-French citizens).",
      "Up to 25 years old for Master's, up to 30 years old for PhD.",
      "Must be nominated by a French higher education institution.",
      "Excellent academic background and clear study objectives."
    ],
    requiredDocuments: [
      "Curriculum Vitae detailing projects and achievements.",
      "Academic transcripts and grading scale translations.",
      "Professional project essay detailing career plans.",
      "Language certificate matching program instructions.",
      "Nomination letter from the host French university."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-10-01") },
      { event: "Application Deadline", date: new Date("2027-01-10") },
      { event: "Results Proclaimed", date: new Date("2027-04-15") }
    ],
    applicationSteps: [
      "Contact the international relations department of the French university you wish to join.",
      "Submit your study project proposal to them and request nomination.",
      "If the university agrees to nominate you, complete their application package.",
      "The university submits the completed file on your behalf to Campus France."
    ],
    officialUrl: "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence"
  },
  {
    id: "14",
    title: "Delft Justus & Louise van Effen Scholarships",
    host: "Delft University of Technology",
    location: "Delft, Netherlands",
    countryCode: "NL",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "€30,000 / year + tuition waiver",
    currency: "EUR",
    deadline: new Date("2026-12-01"),
    academicLevels: ["Graduate"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Engineering", "Delft"],
    gpaMin: 3.7,
    ieltsMin: 7.0,
    toeflMin: 100,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-11",
    organizationId: "org-10",
    description: "These highly competitive scholarships are financed by the legacy of Justus & Louise van Effen to support outstanding international students admitted to TU Delft Master's programs.",
    benefits: [
      "Full coverage of university tuition fees.",
      "Living expenses contribution of €30,000 per year.",
      "Membership in the Delft scholarship community.",
      "Personal development workshops and career seminars."
    ],
    eligibilityCriteria: [
      "Admitted to one of TU Delft's MSc programs.",
      "Cumulative GPA of 80% or higher of the scale maximum (GPA 3.7+).",
      "Degrees must be from a world-renowned university outside the Netherlands."
    ],
    requiredDocuments: [
      "Delft MSc application profile.",
      "Two reference letters in English.",
      "Certified transcripts and diploma translations.",
      "Motivation essay explaining academic targets.",
      "DELFT Scholarship Form detailing financial goals."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-10-15") },
      { event: "Application Deadline", date: new Date("2026-12-01") },
      { event: "Results Proclaimed", date: new Date("2027-03-15") }
    ],
    applicationSteps: [
      "Complete the DELFT online MSc admissions application.",
      "Upload your motivation essay and reference letters.",
      "Ensure your English test scores are sent directly to TU Delft.",
      "Submit the application package before December 1."
    ],
    officialUrl: "https://www.tudelft.nl/en/education/practical-matters/scholarships/justus-louise-van-effen-scholarships"
  },
  {
    id: "15",
    title: "Mastercard Foundation Scholars Program",
    host: "Mastercard Foundation",
    location: "Toronto, Canada",
    countryCode: "CA",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "$45,000 / year + airfare",
    currency: "CAD",
    deadline: new Date("2026-11-30"),
    academicLevels: ["Undergraduate", "Graduate"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Undergrad", "Leadership", "Mastercard"],
    gpaMin: 3.2,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-6",
    organizationId: "org-9",
    description: "The Mastercard Foundation Scholars Program provides young people who are academically talented yet economically disadvantaged with access to quality education. The program aims to develop next-generation leaders.",
    benefits: [
      "Full coverage of tuition fees and books.",
      "Monthly living allowance and campus housing.",
      "International travel costs and visa fees covered.",
      "Leadership training and career guidance sessions."
    ],
    eligibilityCriteria: [
      "Academically talented with strong leadership potential.",
      "Economically disadvantaged or facing barriers to higher education.",
      "Admitted to a participating partner university (such as U of Toronto)."
    ],
    requiredDocuments: [
      "Partner university admissions application.",
      "Mastercard Foundation Scholars application form.",
      "Academic transcript records.",
      "Financial declaration form with supporting proof.",
      "Two letters of recommendation."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-09-01") },
      { event: "Application Deadline", date: new Date("2026-11-30") },
      { event: "Selection Panel Review", date: new Date("2027-02-15") }
    ],
    applicationSteps: [
      "Apply to the University of Toronto for an eligible degree program.",
      "Submit the Mastercard Foundation Scholars Application through their portal.",
      "Provide documents verifying financial status and community references.",
      "Complete the interview if shortlisted by the selection committee."
    ],
    officialUrl: "https://mastercardfdn.org/our-work/scholars/"
  },
  {
    id: "16",
    title: "Rotary Peace Fellowship Program",
    host: "Rotary Foundation",
    location: "Melbourne, Australia",
    countryCode: "AU",
    type: "Fellowship",
    fundingType: "FullyFunded",
    amount: "Tuition, room & board, travel",
    currency: "AUD",
    deadline: new Date("2026-05-15"),
    academicLevels: ["Graduate"],
    disciplines: ["SocialSciences", "Humanities"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Peace Studies", "Rotary"],
    gpaMin: 3.0,
    ieltsMin: 7.0,
    toeflMin: 100,
    satMin: null,
    actMin: null,
    experienceYearsMin: 3,
    universityId: "uni-13",
    organizationId: "org-10",
    description: "Each year, Rotary awards fully funded fellowships for dedicated leaders from around the world to study at one of their Peace Centers. Fellowships cover tuition, fees, room and board, round-trip transportation, and internship/field-study expenses.",
    benefits: [
      "Full tuition fee coverage for Master's coursework.",
      "On-campus room and board expenses fully covered.",
      "Round-trip airfare and visa costs.",
      "Applied field experience and internship budget."
    ],
    eligibilityCriteria: [
      "Minimum three years of full-time relevant work experience in peace or development.",
      "Bachelor's degree completed with solid grades.",
      "Strong leadership achievements and commitment to community peacebuilding."
    ],
    requiredDocuments: [
      "Fellowship application form.",
      "Curriculum Vitae detailing humanitarian or peace work.",
      "Certified academic transcripts.",
      "Two letters of reference.",
      "Endorsement from local Rotary district."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-02-01") },
      { event: "Application Deadline", date: new Date("2026-05-15") },
      { event: "District Endorsement", date: new Date("2026-07-01") },
      { event: "Results Announced", date: new Date("2026-11-01") }
    ],
    applicationSteps: [
      "Research the Rotary Peace Centers and partner universities.",
      "Contact your local Rotary club to request interview and endorsement.",
      "Submit your online fellowship application including essays and references.",
      "Rotary selection committee announces final placements in November."
    ],
    officialUrl: "https://www.rotary.org/en/our-programs/peace-fellowships"
  },
  {
    id: "17",
    title: "Global Korea Scholarship (GKS)",
    host: "National Institute for International Education",
    location: "Seoul, South Korea",
    countryCode: "KR",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "₩1,000,000 / month + tuition",
    currency: "KRW",
    deadline: new Date("2027-03-15"),
    academicLevels: ["Graduate", "PhD"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Korean Government", "SNU"],
    gpaMin: 3.2,
    ieltsMin: 6.0,
    toeflMin: 80,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-14",
    organizationId: "org-2",
    description: "The Global Korea Scholarship is designed to provide international students with opportunities to conduct advanced studies in South Korea, promoting international exchange in education.",
    benefits: [
      "Full coverage of tuition fees.",
      "Monthly living stipend of ₩1,000,000.",
      "Round-trip airfare and settlement allowance.",
      "Covered Korean language training course (1 year).",
      "Medical insurance and research allowances."
    ],
    eligibilityCriteria: [
      "Both applicant and parents must be citizens of their home country (non-Korean).",
      "Under 40 years of age for graduate programs.",
      "Cumulative GPA of 80% or higher from prior degree program."
    ],
    requiredDocuments: [
      "GKS application form.",
      "Personal statement and Study Plan essay.",
      "Two letters of recommendation.",
      "Medical assessment form.",
      "Official transcripts and graduation certificates."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2027-02-01") },
      { event: "Application Deadline", date: new Date("2027-03-15") },
      { event: "First Round Selection", date: new Date("2027-04-15") },
      { event: "Final Results", date: new Date("2027-06-15") }
    ],
    applicationSteps: [
      "Apply through the Korean Embassy in your home country (Embassy Track) OR directly to a university (University Track).",
      "Submit all apostilled transcripts, plans, and statements.",
      "Complete the initial evaluation interview.",
      "If selected, undergo the mandatory 1-year Korean language training."
    ],
    officialUrl: "https://www.studyinkorea.go.kr"
  },
  {
    id: "18",
    title: "Wellcome Trust International Training Fellowships",
    host: "Wellcome Trust",
    location: "London, United Kingdom",
    countryCode: "GB",
    type: "ResearchGrant",
    fundingType: "FullyFunded",
    amount: "£40,000 / year + salary",
    currency: "GBP",
    deadline: new Date("2026-11-15"),
    academicLevels: ["PhD", "PostDoc"],
    disciplines: ["Medicine", "STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Health Research", "Science", "Wellcome"],
    gpaMin: 3.5,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 2,
    universityId: "uni-9",
    organizationId: "org-8",
    description: "This scheme offers early-career researchers from low- and middle-income countries the opportunity to carry out research training in health, biosciences, or clinical medicine.",
    benefits: [
      "Fellow salary and research budget up to £40,000 per year.",
      "International travel costs and research training courses.",
      "Mentorship and networking with global health researchers."
    ],
    eligibilityCriteria: [
      "Citizen of a low- or middle-income country.",
      "PhD or medical degree completed, with interest in research.",
      "Sponsor and host institution confirmed in the UK or a developing nation."
    ],
    requiredDocuments: [
      "Detailed research proposal matching health targets.",
      "Host sponsor statement and letter of support.",
      "Curriculum Vitae with publications list.",
      "Cost estimations and budget justifications."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-07-01") },
      { event: "Application Deadline", date: new Date("2026-11-15") },
      { event: "Shortlisting Interviews", date: new Date("2027-02-10") }
    ],
    applicationSteps: [
      "Review the eligible list of low- and middle-income nations.",
      "Formulate a health-focused research proposal and secure a sponsor at a UK university.",
      "Submit the application online via the Wellcome Grant Tracker.",
      "Attend the selection interview in London or virtually."
    ],
    officialUrl: "https://wellcome.org/grant-funding/schemes/international-training-fellowships"
  },
  {
    id: "19",
    title: "Samsung Global Internship in AI & Robotics",
    host: "Samsung Research",
    location: "Seoul, South Korea",
    countryCode: "KR",
    type: "Internship",
    fundingType: "Paid",
    amount: "₩2,500,000 / month + housing",
    currency: "KRW",
    deadline: new Date("2026-11-01"),
    academicLevels: ["Graduate", "PhD"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["AI", "Robotics", "Internship", "Samsung"],
    gpaMin: 3.6,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 1,
    universityId: "uni-14",
    organizationId: "org-11",
    description: "Samsung Research offers paid internships for graduate students worldwide to participate in future-tech R&D projects in AI, computer vision, natural language processing, and advanced robotics.",
    benefits: [
      "Monthly salary of ₩2,500,000.",
      "Complimentary corporate housing in Seoul.",
      "Round-trip airfare and airport transfers.",
      "Access to state-of-the-art AI clusters and cleanrooms."
    ],
    eligibilityCriteria: [
      "Currently enrolled in a Master's or PhD program in Computer Science or robotics.",
      "Familiar with deep learning frameworks (PyTorch, TensorFlow) or ROS.",
      "Strong publication record at ML conferences (CVPR, NeurIPS) is a plus."
    ],
    requiredDocuments: [
      "Academic resume detailing technical projects.",
      "Link to GitHub portfolio or Google Scholar profile.",
      "Transcripts of graduate studies."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-09-15") },
      { event: "Application Deadline", date: new Date("2026-11-01") },
      { event: "Coding Challenge", date: new Date("2026-11-15") },
      { event: "Technical Video Interviews", date: new Date("2026-12-10") }
    ],
    applicationSteps: [
      "Submit your resume and project link on Samsung Research career pages.",
      "Complete the online software engineering coding challenge.",
      "Complete two rounds of technical interviews on machine learning or robotics systems.",
      "Internship begins in spring/summer 2027."
    ],
    officialUrl: "https://research.samsung.com/careers"
  },
  {
    id: "20",
    title: "Knight-Hennessy Scholars Program",
    host: "Stanford University",
    location: "Stanford, California",
    countryCode: "US",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "Full tuition + living stipend",
    currency: "USD",
    deadline: new Date("2026-10-14"),
    academicLevels: ["Graduate", "PhD"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "PhD", "Stanford", "Leadership"],
    gpaMin: 3.7,
    ieltsMin: 7.0,
    toeflMin: 100,
    satMin: 1480,
    actMin: 33,
    experienceYearsMin: 0,
    universityId: "uni-8",
    organizationId: "org-4",
    description: "The Knight-Hennessy Scholars program is a multidisciplinary graduate scholarship program at Stanford University, preparing students to take leadership roles in addressing complex global challenges.",
    benefits: [
      "Full coverage of Stanford graduate tuition fees.",
      "Stipend for living and academic expenses (such as room, board, and books).",
      "Travel grant for one annual round-trip flight to Stanford.",
      "Access to the Denning House community hub and leadership seminars."
    ],
    eligibilityCriteria: [
      "Admitted to a graduate degree program (JD, MA, MBA, MD, MS, PhD) at Stanford.",
      "Graduated with prior degree within seven years of applying.",
      "Outstanding academic profile, civic commitment, and leadership capacity."
    ],
    requiredDocuments: [
      "Online Knight-Hennessy application profile.",
      "Two essays detailing personal values and goals.",
      "Two recommendation letters focusing on character and leadership.",
      "Brief video introduction.",
      "Stanford graduate program admissions application."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-07-01") },
      { event: "Application Deadline", date: new Date("2026-10-14") },
      { event: "Finalists Announced", date: new Date("2027-01-20") },
      { event: "Immersion Weekend", date: new Date("2027-02-25") },
      { event: "Scholar Awards Announced", date: new Date("2027-03-15") }
    ],
    applicationSteps: [
      "Apply separately to your target Stanford graduate degree program.",
      "Submit the Knight-Hennessy Scholars application online by October 14.",
      "Provide transcripts, resume, and two letters of recommendation.",
      "Submit a 2-minute video introduction through the portal."
    ],
    officialUrl: "https://knight-hennessy.stanford.edu/"
  },
  {
    id: "21",
    title: "Rhodes Scholarship at Oxford University",
    host: "Rhodes Trust",
    location: "Oxford, United Kingdom",
    countryCode: "GB",
    type: "Fellowship",
    fundingType: "FullyFunded",
    amount: "Full tuition + £18,180 stipend / year",
    currency: "GBP",
    deadline: new Date("2026-10-01"),
    academicLevels: ["Graduate", "PhD"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Leadership", "Postgraduate", "Oxford", "UK"],
    gpaMin: 3.7,
    ieltsMin: 7.5,
    toeflMin: 110,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-3",
    organizationId: "org-13",
    description: "The Rhodes Scholarship is a life-changing opportunity for exceptional young people from around the world to study at the University of Oxford. It is the oldest and perhaps the most prestigious international scholarship program in the world.",
    benefits: [
      "Covers all University composition fees and tuition fees.",
      "Provides a personal living stipend of £18,180 per annum.",
      "Covers student visa fees and international health surcharge.",
      "Round-trip economy class flights between home and Oxford.",
      "Access to extensive leadership courses and alumni events at Rhodes House."
    ],
    eligibilityCriteria: [
      "Citizenship of a country eligible for Rhodes Scholarships (Global Rhodes covers remaining countries).",
      "Outstanding academic record (normally First Class Honours or GPA 3.7+).",
      "Must be between 18 and 24 years old (specific exceptions apply for postgraduate degrees).",
      "English language proficiency matching Oxford's highest requirements."
    ],
    requiredDocuments: [
      "Completed online application form.",
      "Academic transcript from all universities attended.",
      "Comprehensive CV detailing achievements, publications, and service.",
      "Statement of Purpose (up to 1,000 words) describing research goals.",
      "Four to six letters of recommendation (minimum three academic)."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-06-01") },
      { event: "Application Deadline", date: new Date("2026-10-01") },
      { event: "Shortlisting Interviews", date: new Date("2026-11-15") },
      { event: "Final Panel Selections", date: new Date("2026-12-05") }
    ],
    applicationSteps: [
      "Check country-specific eligibility on the Rhodes House website.",
      "Apply for admission to your selected degree course at the University of Oxford separately.",
      "Prepare your CV and write your personal statement without external help.",
      "Register your academic and character referees in the Rhodes application portal.",
      "Submit the completed application before October 1."
    ],
    officialUrl: "https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/"
  },
  {
    id: "22",
    title: "Nanyang Scholarship",
    host: "Nanyang Technological University",
    location: "Singapore",
    countryCode: "SG",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "Full tuition + S$6,500 annual allowance",
    currency: "SGD",
    deadline: new Date("2027-01-15"),
    academicLevels: ["Undergraduate"],
    disciplines: ["STEM", "Business", "Humanities", "Arts"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Undergraduate", "NTU", "Singapore"],
    gpaMin: 3.5,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: 1450,
    actMin: 32,
    experienceYearsMin: 0,
    universityId: "uni-17",
    description: "The Nanyang Scholarship is NTU's premier undergraduate scholarship awarded to outstanding freshmen. It recognizes students who excel academically, demonstrate strong leadership potential, and possess outstanding co-curricular records.",
    benefits: [
      "Full coverage of subsidized tuition fees.",
      "Living allowance of S$6,500 per academic year.",
      "Accommodation allowance of up to S$2,000 per academic year.",
      "Travel grant of up to S$5,000 for overseas study/internship.",
      "Computer allowance of S$1,750 (one-off)."
    ],
    eligibilityCriteria: [
      "Open to all nationalities applying for full-time undergraduate admission.",
      "Excellent academic qualifications (A-levels, IB, or high SAT/ACT).",
      "Outstanding leadership capabilities and active co-curricular involvement."
    ],
    requiredDocuments: [
      "Admissions application form with certified transcripts.",
      "Personal statement outlining goals and leadership experiences.",
      "One appraisal/referee letter from high school teacher.",
      "Certificates of co-curricular achievements."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-10-15") },
      { event: "Application Deadline", date: new Date("2027-01-15") },
      { event: "Selection Interviews", date: new Date("2027-03-01") }
    ],
    applicationSteps: [
      "Apply for admission to an undergraduate degree program at NTU Singapore.",
      "Complete the Scholarship Application form accessible from the admissions portal.",
      "Submit your high school transcripts, SAT/ACT results, and teacher's appraisal.",
      "Attend the selection interview in Singapore or virtually if shortlisted."
    ],
    officialUrl: "https://www.ntu.edu.sg/admissions/undergraduate/scholarships/nanyang-scholarship"
  },
  {
    id: "23",
    title: "Karen McKellin International Leader of Tomorrow Award",
    host: "University of British Columbia",
    location: "Vancouver, Canada",
    countryCode: "CA",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "Full tuition + living costs based on need",
    currency: "CAD",
    deadline: new Date("2026-11-15"),
    academicLevels: ["Undergraduate"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Undergraduate", "Need-Based", "UBC", "Canada"],
    gpaMin: 3.6,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-18",
    description: "The Karen McKellin International Leader of Tomorrow Award recognizes international undergraduate students who demonstrate superior academic achievement, leadership skills, and involvement in student affairs and community service.",
    benefits: [
      "Full coverage of tuition fees and mandatory student fees.",
      "Stipend for living costs, textbooks, and health insurance based on financial need.",
      "Renewable for up to three additional years of undergraduate study."
    ],
    eligibilityCriteria: [
      "Must be an international student studying on a Canadian study permit.",
      "Applying for their first undergraduate degree at UBC.",
      "Demonstrate outstanding academic achievement and leadership capabilities.",
      "Demonstrate a level of financial need that would otherwise prevent them from attending UBC."
    ],
    requiredDocuments: [
      "UBC Undergraduate Admission Application.",
      "International Scholars Program nomination form.",
      "Financial circumstances profile detailing household income.",
      "Two letters of reference (one academic, one community/leadership)."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-09-01") },
      { event: "Application Deadline", date: new Date("2026-11-15") },
      { event: "Supporting Documents Deadline", date: new Date("2026-12-15") },
      { event: "Award Offers Dispatched", date: new Date("2027-04-15") }
    ],
    applicationSteps: [
      "Select your undergraduate program at UBC and complete the online application.",
      "Submit the nomination package for the International Scholars Program.",
      "Upload transcripts and financial tax returns/employer income slips.",
      "Have your school counselor upload your academic recommendations."
    ],
    officialUrl: "https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/"
  },
  {
    id: "24",
    title: "ANU Chancellor's International Scholarship",
    host: "Australian National University",
    location: "Canberra, Australia",
    countryCode: "AU",
    type: "Scholarship",
    fundingType: "PartiallyFunded",
    amount: "25% or 50% tuition fee reduction",
    currency: "AUD",
    deadline: new Date("2026-10-31"),
    academicLevels: ["Undergraduate", "Graduate"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Tuition Reduction", "ANU", "Australia"],
    gpaMin: 3.4,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: 1350,
    actMin: 30,
    experienceYearsMin: 0,
    universityId: "uni-19",
    description: "The ANU Chancellor's International Scholarship offers a fee reduction to attract high-achieving international students to study undergraduate and postgraduate coursework programs at ANU.",
    benefits: [
      "25% or 50% tuition fee reduction for the entire duration of the program.",
      "Guaranteed on-campus accommodation reservation for the first year.",
      "Exemption from application processing fees."
    ],
    eligibilityCriteria: [
      "Must be an international student as defined by Australian law.",
      "Admitted to an eligible undergraduate or postgraduate coursework degree program.",
      "Excellent academic background (GPA 3.4+ or equivalent high school grades)."
    ],
    requiredDocuments: [
      "Admissions application profile.",
      "High school or university transcripts.",
      "English language proficiency test report.",
      "Passport biographical details page."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-06-01") },
      { event: "Application Deadline", date: new Date("2026-10-31") },
      { event: "Offers Released", date: new Date("2026-12-01") }
    ],
    applicationSteps: [
      "Apply for admission to your program of choice at ANU.",
      "No separate application is required; all eligible applicants are automatically assessed.",
      "Accept your admissions and scholarship offer before the deadline stated in your offer letter."
    ],
    officialUrl: "https://www.anu.edu.au/study/scholarships/find-a-scholarship/anu-chancellors-international-scholarship"
  },
  {
    id: "25",
    title: "iCeMS Young Scientist Research Fellowship",
    host: "Kyoto University",
    location: "Kyoto, Japan",
    countryCode: "JP",
    type: "Fellowship",
    fundingType: "Paid",
    amount: "¥400,000 / month salary",
    currency: "JPY",
    deadline: new Date("2026-11-30"),
    academicLevels: ["PhD", "PostDoc"],
    disciplines: ["STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Postdoc", "Stem Cells", "Kyoto University", "Japan"],
    gpaMin: 3.5,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 1,
    universityId: "uni-20",
    description: "The Institute for Integrated Cell-Material Sciences (iCeMS) at Kyoto University offers fellowships for outstanding early-career scientists to conduct interdisciplinary research blending materials science and cell biology.",
    benefits: [
      "Monthly salary of ¥400,000 including medical benefits.",
      "Relocation expenses and travel allowance to Kyoto.",
      "Annual research grant of ¥1,000,000 for materials and equipment.",
      "Assistance with visa and housing reservation in Kyoto."
    ],
    eligibilityCriteria: [
      "Must hold a PhD or be near completion by the start date.",
      "Strong background in chemistry, physics, materials science, or cell biology.",
      "At least one first-author publication in a peer-reviewed international journal."
    ],
    requiredDocuments: [
      "Detailed CV with full list of publications.",
      "Three-page research proposal detailing integration with cell-material sciences.",
      "Contact information for three academic references.",
      "PDF copies of two representative publications."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-08-01") },
      { event: "Application Deadline", date: new Date("2026-11-30") },
      { event: "Interviews & Seminars", date: new Date("2027-01-15") },
      { event: "Fellowship Begins", date: new Date("2027-04-01") }
    ],
    applicationSteps: [
      "Review the research areas of iCeMS principal investigators on the official website.",
      "Prepare your research proposal and publications list in English.",
      "Submit your complete application dossier via the iCeMS recruitment portal.",
      "Deliver a research seminar virtually or in Kyoto if shortlisted."
    ],
    officialUrl: "https://www.icems.kyoto-u.ac.jp/en/research/"
  },
  {
    id: "26",
    title: "L'Oréal-UNESCO For Women in Science International Awards",
    host: "L'Oréal Foundation",
    location: "Paris, France",
    countryCode: "FR",
    type: "ResearchGrant",
    fundingType: "FullyFunded",
    amount: "€100,000 scientific endowment",
    currency: "EUR",
    deadline: new Date("2026-06-30"),
    academicLevels: ["PostDoc", "EarlyCareer"],
    disciplines: ["STEM", "Medicine"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Women in Science", "Biomedical", "Grant", "L'Oreal"],
    gpaMin: 3.6,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 5,
    organizationId: "org-15",
    description: "The L'Oréal-UNESCO For Women in Science initiative awards international grants and fellowships to outstanding female researchers globally, to support their contributions to physical sciences, mathematics, and life sciences.",
    benefits: [
      "Endowment of €100,000 to support ongoing scientific research.",
      "International media visibility and networking opportunities in Paris.",
      "Travel expenses to the awards ceremony in Paris covered.",
      "Mentorship and leadership coaching modules."
    ],
    eligibilityCriteria: [
      "Identify as a female researcher working in life or physical sciences.",
      "Hold a PhD or equivalent doctoral degree and lead an active research team.",
      "Outstanding scientific track record, certified by peers and publications."
    ],
    requiredDocuments: [
      "Completed nomination form (candidates must be nominated by peers).",
      "Detailed CV with list of publications and patents.",
      "Description of current research work (up to 5 pages).",
      "Three letters of recommendation from world-renowned scientists."
    ],
    timeline: [
      { event: "Nominations Open", date: new Date("2026-03-01") },
      { event: "Nomination Deadline", date: new Date("2026-06-30") },
      { event: "Jury Selection", date: new Date("2026-10-15") },
      { event: "Awards Ceremony", date: new Date("2027-03-15") }
    ],
    applicationSteps: [
      "Request a nomination from a university professor, department head, or member of a national science academy.",
      "Create your profile on the For Women in Science online platform.",
      "Complete the research description and upload your publications index.",
      "Ensure your nominator submits the official recommendation letters before June 30."
    ],
    officialUrl: "https://www.forwomeninscience.com/"
  },
  {
    id: "27",
    title: "Karolinska Institutet Global Master's Scholarship",
    host: "Karolinska Institutet",
    location: "Stockholm, Sweden",
    countryCode: "SE",
    type: "Scholarship",
    fundingType: "TuitionWaiver",
    amount: "100% or 50% tuition coverage",
    currency: "SEK",
    deadline: new Date("2027-01-15"),
    academicLevels: ["Graduate"],
    disciplines: ["Medicine", "STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Medical Studies", "Karolinska", "Sweden"],
    gpaMin: 3.5,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-21",
    description: "Karolinska Institutet offers a handful of tuition waiver scholarships for excellent students admitted to one of their Global Master's Programs starting each autumn semester.",
    benefits: [
      "100% or 50% waiver of tuition fees at Karolinska Institutet.",
      "Dedicated integration program and Swedish language introduction.",
      "Note: Does not cover living expenses or travel costs."
    ],
    eligibilityCriteria: [
      "Must be a citizen of a country outside the EU/EEA (required to pay tuition fees in Sweden).",
      "Applied to one of KI's Global Master's programs by the national deadline.",
      "Outstanding academic record in undergraduate studies (GPA 3.5+)."
    ],
    requiredDocuments: [
      "Admissions application submitted via UniversityAdmissions.se.",
      "Syllabus and transcript records.",
      "KI Scholarship application statement.",
      "Proof of English proficiency."
    ],
    timeline: [
      { event: "Admissions Apply Open", date: new Date("2026-10-15") },
      { event: "Admissions Apply Deadline", date: new Date("2027-01-15") },
      { event: "Scholarship Apply Open", date: new Date("2027-02-01") },
      { event: "Scholarship Apply Deadline", date: new Date("2027-02-15") }
    ],
    applicationSteps: [
      "Submit an admissions application to a Global Master's program at Karolinska Institutet via UniversityAdmissions.se.",
      "Upload all supporting academic documents to UniversityAdmissions.se.",
      "Submit the online KI Scholarship form during the scholarship application window in February.",
      "Offers are announced alongside Swedish university admission results in April."
    ],
    officialUrl: "https://ki.se/en/education/scholarships"
  },
  {
    id: "28",
    title: "Boehringer Ingelheim Fonds PhD Fellowship",
    host: "Boehringer Ingelheim Fonds",
    location: "Heidelberg, Germany",
    countryCode: "DE",
    type: "PhDPosition",
    fundingType: "FullyFunded",
    amount: "€2,200 / month + travel allowances",
    currency: "EUR",
    deadline: new Date("2026-10-01"),
    academicLevels: ["PhD"],
    disciplines: ["Medicine", "STEM"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["PhD Fellowship", "Biomedicine", "Germany"],
    gpaMin: 3.6,
    ieltsMin: 6.5,
    toeflMin: 90,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    organizationId: "org-14",
    description: "The Boehringer Ingelheim Fonds (BIF) awards PhD fellowships to outstanding junior scientists who wish to pursue an ambitious PhD project in basic biomedical research in an internationally leading laboratory.",
    benefits: [
      "Monthly stipend of €2,200 (including flat-rate allowance for materials).",
      "Additional health insurance and travel allowances.",
      "Participation in international seminars and BIF alumni networks.",
      "Personalized mentoring and career coaching workshops."
    ],
    eligibilityCriteria: [
      "Under 28 years of age at the deadline.",
      "Hold a Master's or equivalent degree in biology, medicine, chemistry, or physics.",
      "PhD project must be in basic biomedical research and conducted in an excellent host lab."
    ],
    requiredDocuments: [
      "Detailed PhD project proposal (up to 10 pages).",
      "Host supervisor's endorsement letter.",
      "Transcripts of high school, Bachelor's, and Master's courses.",
      "Scientific publications or master's thesis summary."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-07-01") },
      { event: "Application Deadline", date: new Date("2026-10-01") },
      { event: "Interviews in Germany", date: new Date("2027-01-20") }
    ],
    applicationSteps: [
      "Confirm your project and lab placement with the host supervisor.",
      "Write a detailed biomedical research project proposal.",
      "Register and upload all transcripts and proposals to the BIF online application portal.",
      "Attend the selection interview in Heidelberg or virtually if shortlisted."
    ],
    officialUrl: "https://www.bifonds.de/fellowships-grants/phd-fellowships.html"
  },
  {
    id: "29",
    title: "Wallenberg Academy Fellows Research Grant",
    host: "Knut and Alice Wallenberg Foundation",
    location: "Stockholm, Sweden",
    countryCode: "SE",
    type: "ResearchGrant",
    fundingType: "FullyFunded",
    amount: "SEK 1,500,000 / year for 5 years",
    currency: "SEK",
    deadline: new Date("2026-09-15"),
    academicLevels: ["PostDoc", "EarlyCareer"],
    disciplines: ["STEM", "Medicine", "SocialSciences", "Humanities"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Research Grant", "Fellow", "Wallenberg", "Sweden"],
    gpaMin: 3.7,
    ieltsMin: null,
    toeflMin: null,
    satMin: null,
    actMin: null,
    experienceYearsMin: 4,
    organizationId: "org-16",
    description: "The Wallenberg Academy Fellows program provides leading young researchers from Sweden and abroad with long-term resources, enabling them to focus on research and tackle difficult, high-impact scientific questions.",
    benefits: [
      "Funding of SEK 1,500,000 to 2,500,000 per year for 5 years.",
      "Direct integration into the Swedish Royal Academies network.",
      "Mentorship and leadership development programs.",
      "Option to apply for a second 5-year extension grant."
    ],
    eligibilityCriteria: [
      "Completed PhD within the last 8 years.",
      "Outstanding research achievements in engineering, natural sciences, medicine, social sciences, or humanities.",
      "Nominated by a Swedish university (self-nominations are not accepted)."
    ],
    requiredDocuments: [
      "Swedish university nomination letter.",
      "Comprehensive research plan (up to 8 pages).",
      "CV listing all research publications, citation metrics, and grants.",
      "Letters of recommendation from three international experts."
    ],
    timeline: [
      { event: "Nominations Open", date: new Date("2026-05-15") },
      { event: "Nomination Deadline", date: new Date("2026-09-15") },
      { event: "Results Proclaimed", date: new Date("2027-04-30") }
    ],
    applicationSteps: [
      "Contact a Swedish university and seek nomination from their rector/department head.",
      "Prepare your comprehensive research plan and list of publications.",
      "The nominating university submits your application portfolio to the Knut and Alice Wallenberg Foundation portal."
    ],
    officialUrl: "https://kaw.wallenberg.org/en/wallenberg-academy-fellows"
  },
  {
    id: "30",
    title: "Flanders Master Mind Scholarships",
    host: "Government of Flanders & KU Leuven",
    location: "Leuven, Belgium",
    countryCode: "BE",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "€10,000 / year + tuition waiver",
    currency: "EUR",
    deadline: new Date("2027-04-01"),
    academicLevels: ["Graduate"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Flemish Government", "Belgium"],
    gpaMin: 3.5,
    ieltsMin: 7.0,
    toeflMin: 94,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-24",
    description: "The Flemish Ministry of Education awards Master Mind Scholarships to outstanding students for Master's programs in Flanders and Brussels. KU Leuven hosts a significant portion of these scholarships.",
    benefits: [
      "Living stipend of €10,000 per academic year.",
      "Full waiver of university tuition fees at KU Leuven.",
      "Covered health and basic accident insurance."
    ],
    eligibilityCriteria: [
      "Applying to a Master's degree program at a participating Flemish university (like KU Leuven).",
      "Outstanding academic performance (GPA 3.5+ on a 4.0 scale).",
      "All nationalities are eligible except Belgian citizens."
    ],
    requiredDocuments: [
      "University Master admissions profile.",
      "Two letters of academic recommendation.",
      "Certified transcripts and English language certificate.",
      "Motivation letter explaining the choice of Flanders and course."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-11-01") },
      { event: "Application Deadline", date: new Date("2027-04-01") },
      { event: "Results Proclaimed", date: new Date("2027-06-15") }
    ],
    applicationSteps: [
      "Apply for admission to a Master's degree program at KU Leuven.",
      "During application, tick the box indicating your interest in the Master Mind Scholarship.",
      "If the university pre-selects your file, they will upload your nomination to the Flemish Government database.",
      "Flemish selection committee awards the final scholarships."
    ],
    officialUrl: "https://www.studyinflanders.be/scholarships/master-mind-scholarships"
  },
  {
    id: "31",
    title: "University of Helsinki Scholarship Programme",
    host: "University of Helsinki",
    location: "Helsinki, Finland",
    countryCode: "FI",
    type: "Scholarship",
    fundingType: "FullyFunded",
    amount: "Full tuition waiver + €10,000 living grant",
    currency: "EUR",
    deadline: new Date("2027-01-05"),
    academicLevels: ["Graduate"],
    disciplines: ["All"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Master", "Helsinki", "Finland"],
    gpaMin: 3.6,
    ieltsMin: 6.5,
    toeflMin: 92,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-22",
    description: "The University of Helsinki offers scholarships for excellent students from outside the EU/EEA who are applying for English-taught Master's programs at the university.",
    benefits: [
      "Full coverage of tuition fees (100% tuition waiver).",
      "Living stipend of €10,000 per academic year.",
      "Free student health service membership."
    ],
    eligibilityCriteria: [
      "Non-EU/EEA citizen who is liable for tuition fees in Finland.",
      "Meets the entry requirements for a Master's degree program at the University of Helsinki.",
      "Outstanding academic record from prior studies (GPA 3.6+)."
    ],
    requiredDocuments: [
      "Master admissions application form.",
      "Certified Bachelor's degree transcripts and translations.",
      "Motivation letter and study project plan.",
      "Academic recommendation letter."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2026-12-01") },
      { event: "Application Deadline", date: new Date("2027-01-05") },
      { event: "Admissions Results", date: new Date("2027-04-15") }
    ],
    applicationSteps: [
      "Apply for your Master's program via the Studyinfo.fi portal.",
      "Apply for the scholarship on the same online application form.",
      "Mail or upload your certified documents to the university admissions service.",
      "Scholarship outcome is sent alongside your admissions offer."
    ],
    officialUrl: "https://www.helsinki.fi/en/admissions-and-education/apply-masters-programmes/scholarships-and-tuition-fees"
  },
  {
    id: "32",
    title: "UiO Life Science Summer Research Internship",
    host: "University of Oslo",
    location: "Oslo, Norway",
    countryCode: "NO",
    type: "Internship",
    fundingType: "Paid",
    amount: "NOK 50,000 total stipend",
    currency: "NOK",
    deadline: new Date("2027-02-15"),
    academicLevels: ["Undergraduate", "Graduate"],
    disciplines: ["STEM", "Medicine"],
    eligibleCitizenships: ["GLOBAL"],
    tags: ["Summer Internship", "Life Science", "Oslo", "Norway"],
    gpaMin: 3.2,
    ieltsMin: null,
    toeflMin: null,
    satMin: null,
    actMin: null,
    experienceYearsMin: 0,
    universityId: "uni-23",
    description: "UiO:Life Science offers 40 summer research projects for students in life sciences, giving them hands-on research experience under professional mentorship.",
    benefits: [
      "Total stipend of NOK 50,000 for a 6-week summer project.",
      "Supervised lab placement in a leading UiO research group.",
      "Participation in the end-of-summer poster exhibition."
    ],
    eligibilityCriteria: [
      "Registered student in a Bachelor's or Master's program in a life sciences-related field.",
      "Sufficient academic background to complete the selected research project.",
      "Good command of English."
    ],
    requiredDocuments: [
      "Application profile with preference list of research projects.",
      "Motivation statement for top 3 project choices.",
      "Academic transcript of records."
    ],
    timeline: [
      { event: "Applications Open", date: new Date("2027-01-15") },
      { event: "Application Deadline", date: new Date("2027-02-15") },
      { event: "Project Allocations", date: new Date("2027-04-15") }
    ],
    applicationSteps: [
      "Browse the list of available summer projects on the UiO:Life Science page.",
      "Complete the online application form and list your top project preferences.",
      "Upload your university transcripts and CV.",
      "Wait for project matching results from the committee."
    ],
    officialUrl: "https://www.uio.no/english/research/strategic-research-areas/life-science/funding/summer-projects/"
  }
];
