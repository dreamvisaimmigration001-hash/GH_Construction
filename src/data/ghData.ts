import {
  Project,
  ServiceItem,
  IndustryItem,
  Testimonial,
  PartnerClient,
  JobPosition,
  ApplicationStatusRecord,
} from "../types";
import rawProjects from "./enrichedProjects.json";

export const PROJECTS: Project[] = rawProjects as Project[];

export const COMPANY_INFO = {
  name: "GH Construction Ltd.",
  shortName: "GH Construction",
  tagline: "Spaces Built Around Your Business.",
  subheadline:
    "Commercial construction, interior build-outs and project solutions delivered with experience, precision and a business-first approach.",
  established: "Winter 2008",
  motto: "Big Enough to Serve | Small Enough to Care",
  address: {
    street: "42 Beran Dr",
    city: "Scarborough",
    province: "ON",
    postalCode: "M1G 1G4",
    country: "Canada",
    full: "42 Beran Dr, Scarborough, ON M1G 1G4, Canada",
    mapsUrl:
      "https://maps.google.com/?q=42+Beran+Dr,+Scarborough,+ON+M1G+1G4,+Canada",
  },
  email: {
    general: "Info@ghconstructions.ca",
    marketing: "marketing@ghconstruction.ca",
  },
  contacts: [
    {
      name: "Nadder Jomha",
      role: "Project Partner & Operations",
      phone: "780-504-1792",
      phoneHref: "tel:7805041792",
      email: "nadder@ghconstruction.ca",
    },
    {
      name: "Terry Jomha",
      role: "Project Partner & Operations",
      phone: "780-991-5332",
      phoneHref: "tel:7809915332",
      email: "Info@ghconstructions.ca",
    },
  ],
  ethos: {
    heading: "We Think Business",
    body: 'We are so much more than your typical construction company. We understand what it takes to build, develop, and maintain a successful business. The goals of our partners are at the forefront of our mind as we enter each project. We go above and beyond to make sure that everything our client needs, we can take care of. Our goal is to always be seen as more than just construction. We help grow businesses and relationships, and construction is just one component. We are not a "nail and hammer" construction company; we think big picture and come up with unique solutions with every issue.',
  },
  story: {
    lead: "GH Construction, a leading general contractor and commercial construction company, was established in the Winter of 2008. Our primary focus has always been crafting exquisite spaces for our esteemed clients.",
    body: "Renowned for our proficiency in building intricate interiors, we pride ourselves on being more than just a construction company; we are dedicated collaborators working hand-in-hand with our clients to actualize their aspirations. Our commitment extends beyond the physical structures we create; we are devoted to fostering enduring partnerships built on trust, quality, and shared success.",
  },
};

export const SERVICES: ServiceItem[] = [
  {
    id: "lease-consulting",
    number: "01",
    title: "Lease Consulting Services",
    tagline: "Securing tenant advantages before construction begins",
    description:
      "Navigating technical lease clauses, tenant improvement allowances, landlord turnkey conditions, and demising boundaries to protect your business capital before leases are finalized.",
    deliverables: [
      "Tenant improvement (TI) allowance negotiation assistance",
      "Base building condition assessments & utility check",
      "Leasehold review for electrical, mechanical & plumbing capacities",
      "Landlord design-criteria coordination",
    ],
  },
  {
    id: "discovering-spaces",
    number: "02",
    title: "Discovering New Spaces",
    tagline: "Strategic site vetting and technical feasibility",
    description:
      "Pre-acquisition walk-throughs and site evaluations to determine whether a building shell can accommodate heavy medical, restaurant, or retail mechanical and structural demands.",
    deliverables: [
      "Technical site evaluation & architectural suitability",
      "Existing infrastructure diagnostics (plumbing stacks, electrical services)",
      "Zoning, occupancy class, and change-of-use preliminary checks",
      "Site comparison and rough-order-of-magnitude costing",
    ],
  },
  {
    id: "space-design",
    number: "03",
    title: "Innovative Space Design",
    tagline: "Purpose-engineered commercial and clinical layouts",
    description:
      "Collaborating with leading interior architects and specialized clinic planners to design human-centered, high-efficiency workflows that elevate brand perception and patient experience.",
    deliverables: [
      "Ergonomic workflow planning & sightline optimization",
      "Specialized dental operatory & clinical equipment integration",
      "Custom millwork, lighting concepts & high-durability material palettes",
      "Client journey mapping from reception to private consultation",
    ],
  },
  {
    id: "construction-management",
    number: "04",
    title: "Construction Management Solutions",
    tagline: "Transparent, end-to-end general contracting delivery",
    description:
      "Rigorous site supervision, proactive trade coordination, and daily schedule enforcement that delivers complex commercial projects on time, on budget, and clean.",
    deliverables: [
      "Full-scope site management by dedicated site superintendents",
      "Vetted sub-trade bidding, scheduling, and quality oversight",
      "Open-book budget tracking and procurement management",
      "Comprehensive safety protocols & site cleanliness standards",
    ],
  },
  {
    id: "financing-recommendations",
    number: "05",
    title: "Financing Recommendations",
    tagline: "Practical financial roadmaps and capital structuring",
    description:
      "Connecting clinic founders and business owners with specialized commercial lenders, equipment financing advisors, and leasehold loan programs tailored to medical and retail build-outs.",
    deliverables: [
      "Detailed itemized construction estimates for bank underwriting",
      "Phased draw schedule alignment with milestone completions",
      "Connections to commercial banking and equipment financing partners",
      "Budget contingency planning and value engineering",
    ],
  },
  {
    id: "streamlined-permitting",
    number: "06",
    title: "Streamlined Permitting Process",
    tagline: "Expedited municipal approvals and code compliance",
    description:
      "Expert navigation through municipal building departments, Scarborough Building Code regulations, health authority guidelines, and development permit requirements.",
    deliverables: [
      "Development permit (DP) and building permit (BP) filing",
      "AHS / Medical health inspection pre-coordination",
      "Fire code, egress, barrier-free, and accessibility compliance",
      "Occupancy permit handoff and final sign-offs",
    ],
  },
  {
    id: "modifying-existing-spaces",
    number: "07",
    title: "Modifying Existing Spaces",
    tagline: "Zero-downtime renovations and expansion phasing",
    description:
      "Executing surgical modifications, adjacent space stitching, and dental/medical clinic expansions while existing operations remain open and uninterrupted.",
    deliverables: [
      "Phased construction scheduling to eliminate patient chair downtime",
      "Dust containment, negative air, and noise-isolated work windows",
      "Seamless structural knock-throughs and finishes stitching",
      "Weekend and after-hours execution options",
    ],
  },
  {
    id: "engineering-support",
    number: "08",
    title: "Engineering Support",
    tagline: "Integrated mechanical, electrical, and structural coordination",
    description:
      "Direct liaison with certified structural, mechanical, and electrical engineering partners to solve heavy load bearing, specialized medical gas, and commercial ventilation challenges.",
    deliverables: [
      "Mechanical coordination (HVAC, ventilation, grease exhaust, HEPA)",
      "Electrical service sizing, backup generator, and medical imaging power",
      "Structural load verification for heavy equipment and glass storefronts",
      "Plumbing engineering for multi-chair dental suction and medical water",
    ],
  },
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: "healthcare",
    name: "Healthcare & Medical",
    subtitle: "Dental, surgical, diagnostic, and specialty clinics",
    description:
      "Specialized clinical environments engineered around regulatory standards, infection control, radiation shielding, specialized medical gases, and calm patient-centric aesthetics.",
    featuredProjects: [
      "Synapse",
      "Stratica Dermatology",
      "Gateway Surgery",
      "Ivory Denture Clinic",
      "Parkland Dental",
    ],
    keyConsiderations: [
      "In-wall lead shielding for imaging & intraoral X-ray",
      "Medical gas & high-volume vacuum delivery lines",
      "Acoustic isolation between treatment operatories",
      "Strict clinical sterilization flow & solid-surface integrity",
    ],
    coverImage:
      "https://images.squarespace-cdn.com/content/v1/59668ef629687f451deeb479/1714066998157-C0IHR4HHVM7ZU5561KTE/GH-Synapse-BJang-92.jpg",
  },
  {
    id: "commercial",
    name: "Commercial",
    subtitle: "Offices, professional headquarters, and financial institutions",
    description:
      "High-impact corporate workspaces that express brand prestige, foster team collaboration, and provide confidential client conference spaces with acoustic precision.",
    featuredProjects: ["BCMB", "Juriscorp Law", "August Insurance"],
    keyConsiderations: [
      "Acoustically engineered boardroom partitions (STC 50+)",
      "Integrated architectural AV and low-voltage cable raceways",
      "Custom architectural reception desks and feature wall cladding",
      "Energy-efficient lighting and flexible zone controls",
    ],
    coverImage:
      "https://images.squarespace-cdn.com/content/v1/59668ef629687f451deeb479/bf7e786c-97b2-41bb-99a1-0794ed03bac3/GH-BCMB-1.jpg",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    subtitle: "Cafes, specialty eateries, and dining spaces",
    description:
      "Inviting hospitality atmospheres paired with back-of-house culinary engineering, from high-capacity grease interceptors and commercial make-up air to bespoke artisan millwork.",
    featuredProjects: ["Felice Cafe"],
    keyConsiderations: [
      "Commercial kitchen ventilation hoods and fire suppression",
      "Heavy plumbing rough-ins for espresso stations and dishwashers",
      "High-durability flooring capable of commercial sanitization",
      "Atmospheric lighting and intimate spatial acoustics",
    ],
    coverImage:
      "https://images.squarespace-cdn.com/content/v1/59668ef629687f451deeb479/1654534799644-88UCL9XM5IS1Z7N43KU9/GH-Felice+Cafe-86.jpg",
  },
  {
    id: "retail",
    name: "Retail",
    subtitle: "Boutiques, shopping flagships, and specialty retail",
    description:
      "High-traffic experiential retail spaces engineered for product merchandising impact, customer circulation flow, and distinctive architectural identity.",
    featuredProjects: ["Vine Arts", "It'Sugar", "Kunitz Shoes Expansion"],
    keyConsiderations: [
      "Bespoke perimeter shelving and central merchandising pods",
      "High-traffic flooring with enduring polish and finish",
      "Precision architectural display track and pendant lighting",
      "Cash wrap counter design and secured back-of-house inventory",
    ],
    coverImage:
      "https://images.squarespace-cdn.com/content/v1/59668ef629687f451deeb479/8ed2fd31-1ecd-4a1e-b376-727e8eecae0e/GH-Vine+Arts-20.jpg",
  },
];

export const WHY_GH_PILLARS = [
  {
    title: "Experience Since 2008",
    description:
      "Over a decade and a half of dedicated commercial general contracting and intricate interior build-outs across Scarborough, with proven mastery in complex environments.",
  },
  {
    title: "Deep Technical Knowledge",
    description:
      "Specialized expertise in navigating intricate healthcare codes, medical gas infrastructures, acoustic assemblies, structural modifications, and complex building shells.",
  },
  {
    title: "Industry Relationships",
    description:
      "Established networks of the region’s finest trades, engineers, municipal inspectors, and commercial property managers, ensuring smooth coordination and preferential scheduling.",
  },
  {
    title: "Business Understanding",
    description:
      "We view every project through an owner’s lens—evaluating lease terms, cash flows, patient chair utilization, retail foot traffic, and the bottom-line ROI of your space.",
  },
  {
    title: "A-to-Z Project Support",
    description:
      "From preliminary leasehold vetting through full construction, inspection sign-offs, and enduring post-completion warranty support, we remain by your side.",
  },
  {
    title: "Uncompromising Quality",
    description:
      "Our name is on the line with every build. Every joint, partition, conduit, and surface finish is executed to withstand heavy commercial use while retaining architectural elegance.",
  },
  {
    title: "Direct, Transparent Communication",
    description:
      "Clear, accessible leadership with Terry and Nadder Jomha directly involved. No bureaucratic layers or hidden surprises—just responsive, honest collaboration.",
  },
  {
    title: "Adherence to Timelines & Budgets",
    description:
      "Systematic site management and phased scheduling designed to eliminate delays, protect operating revenues, and deliver spaces ahead of schedule and within budget.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "spruce-grove",
    quote:
      "As a commercial developer and business owner in the medical sector, I have dealt with countless construction firms over the past 20 years. GH Construction stands in a league of their own. Their diligence and systematic approach are unlike anything I’ve seen in the industry. I now exclusively use GH for my medical builds and recommend them to all of my tenants. They consistently deliver projects faster than the competition, and the entire process is remarkably smooth. They provide a true A-Z full-scope service, and their post-project support is exceptional—even a year later, they are quick to provide solutions. It is a rare pleasure to work with a company of this caliber.",
    author: "Commercial Developer & Medical Business Owner",
    role: "Managing Partner",
    organization: "Spruce Grove Radiology & Medical Developments",
  },
  {
    id: "wolski-design",
    quote:
      "Wolski Design Group has recently completed several projects with GH Construction: Township Dental, Level Orthodontics, Children’s Dental Centre & Cataract & Lens Institute. As part of the construction team their willingness to assist with coordination of all parties from Engineers, Clients, Landlords and Building Operators has made them an invaluable member; their navigation of building permits and diagnostic of site issues proves their strength in a highly competitive market. The professionalism in which they work is realized as calm and collected, accepting all challenges, with a spectacular end result. I would not hesitate to recommend them on future projects.",
    author: "Wolski Design Group",
    role: "Principal Interior Architectural Designer",
    organization: "Wolski Design Group",
  },
  {
    id: "westpark-dental",
    quote:
      "Our office recently underwent an expansion and renovation with GH Construction, and we couldn’t be happier with the experience. From the very beginning, their team was professional, efficient, and easy to communicate with. Nadder, Terry, Martin, and Rod were incredibly hardworking and went above and beyond to ensure everything ran smoothly and that we were satisfied every step of the way. Their attention to detail, commitment to quality, and excellent communication made the entire process stress-free. We highly recommend GH Construction to anyone looking for a reliable and professional construction team.",
    author: "Westpark Dental Team",
    role: "Clinic Ownership & Practice Management",
    organization: "Westpark Dental, Fort Saskatchewan",
  },
  {
    id: "milestones-wellness",
    quote:
      "Our experience working with GH has been outstanding from the first meeting with Nadder to the last detail fixed by Jordan. They really know how to build medical clinics, and the level of care and communication was beyond expectations. We are people profoundly detail-oriented, and with really high standards; we do scrutinize every nail... the GH team kept their promises to deliver great results, keeping within timelines and budgets. They were able to pivot when needed, find creative solutions, and keep the construction site clean and safe at all times.",
    author: "Milestones Diagnostics and Wellness",
    role: "Clinic Directors",
    organization: "Milestones Diagnostics & Wellness",
  },
  {
    id: "movenetics",
    quote:
      "I cannot say enough good things about my experience with GH Construction! The staff are incredibly knowledgeable, helpful, and kind with a great attention to detail. They were the construction company I chose to work with in building my dream clinic, Movenetics Physiotherapy. Their expertise and dedication helped bring my dream to life, and the reception from my friends and family with the completed product has been everything I could ask for! Thank you GH for delivering on what you promised.",
    author: "Mike Salame",
    role: "Clinic Founder & Lead Physiotherapist",
    organization: "Movenetics Physiotherapy",
  },
  {
    id: "dental-expansion",
    quote:
      "Being a busy dental practice, our biggest concern was any loss of chair time and having to shut down or re-book patients. The GH Construction Team was able to work around our schedule and phase the process in such a way that we didn’t lose any time with our patients and had minimal disruption. Costs were appropriately estimated and well-explained with no unexpected surprises, and the end result was a phenomenally upgraded office finished ahead of schedule.",
    author: "Dental Clinic Principal",
    role: "Practice Owner",
    organization: "Edmonton Dental Clinic Expansion",
  },
];

export const PARTNERS_COLLABORATORS: PartnerClient[] = [
  {
    name: "Wolski Design Group",
    type: "Interior Architecture & Design Partner",
    description: "Collaborator on leading dental & healthcare facilities",
  },
  {
    name: "JBID Design",
    type: "Commercial Interior Planning",
    description: "Clinic & optical spatial design partner",
  },
  {
    name: "Aspen Properties / Bell Tower",
    type: "Commercial Landlord & Facility Partner",
    description: "Lobby, conference centers & high-rise tenant build-outs",
  },
  {
    name: "Enbridge Centre",
    type: "Institutional Commercial Property",
    description: "Downtown corporate tenant improvements",
  },
  {
    name: "Spruce Grove Radiology",
    type: "Medical Sector Developer Partner",
    description: "High-spec imaging and medical facility development",
  },
  {
    name: "Westpark Dental",
    type: "Healthcare Client Partner",
    description: "Multi-operatory clinic expansion and renovation",
  },
  {
    name: "Milestones Diagnostics",
    type: "Clinical Wellness Partner",
    description: "Diagnostic and therapeutic care clinic build-out",
  },
  {
    name: "BCMB",
    type: "Corporate Governance Client",
    description: "Provincial headquarters and executive boardroom facility",
  },
];

export const JOB_POSITIONS: JobPosition[] = [
  {
    id: "snr-project-manager",
    referenceNo: "GH-PM-104",
    title: "Senior Commercial Project Manager",
    department: "Project Management",
    location: "Edmonton, AB (Head Office & Sites)",
    type: "Full-Time",
    experienceLevel: "7+ Years Experience",
    salaryRange: "$110,000 - $135,000 + Performance Bonus",
    overview:
      "Lead high-profile commercial interior build-outs, dental/medical healthcare clinics, and corporate renovations from pre-construction feasibility to final handover.",
    responsibilities: [
      "Manage project scope, schedule, budget, and trade contractor allocations for multi-million dollar interior developments",
      "Act as primary liaison for clients, architects, municipal permit officials, and building landlords",
      "Administer prime contracts, subcontracts, change orders, and progress billings",
      "Supervise Site Superintendents and ensure adherence to Scarborough Safety Codes & GH Construction standards",
    ],
    qualifications: [
      "Degree or diploma in Construction Management, Civil Engineering, or Architectural Technology",
      "7+ years experience managing commercial interior or healthcare tenant improvement projects in Scarborough",
      "Proficiency with Procore, MS Project, Bluebeam, and construction ERP systems",
      "Gold Seal Certification (PCO/GSC) or PMP designation considered a strong asset",
    ],
    postedDate: "Updated This Week",
  },
  {
    id: "snr-estimator",
    referenceNo: "GH-EST-202",
    title: "Senior Construction Estimator",
    department: "Estimating & Preconstruction",
    location: "Edmonton, AB",
    type: "Full-Time",
    experienceLevel: "5+ Years Experience",
    salaryRange: "$95,000 - $120,000 + Benefits",
    overview:
      "Drive competitive and accurate tenders for commercial interiors, leasehold improvements, and turnkey business spaces, collaborating closely with trade partners.",
    responsibilities: [
      "Perform detailed digital quantity takeoffs (architectural, finishes, mechanical/electrical scopes)",
      "Prepare comprehensive lump-sum, design-build, and construction management cost estimates",
      "Issue tender packages and build strong relationships with Edmonton and regional sub-trades",
      "Conduct value engineering and assist clients in optimizing tenant improvement allowances",
    ],
    qualifications: [
      "5+ years commercial interior estimating experience in Canadian markets",
      "Advanced skills with digital takeoff software (PlanSwift, Bluebeam, Procore)",
      "Strong knowledge of Scarborough construction labor markets and current material supply pricing",
      "CIQS (PQS) designation or relevant technical diploma preferred",
    ],
    postedDate: "Updated This Week",
  },
  {
    id: "site-superintendent-commercial",
    referenceNo: "GH-SITE-305",
    title: "Site Superintendent - Commercial & Medical Interiors",
    department: "Field Operations",
    location: "Edmonton, AB & Surrounding Area",
    type: "Full-Time",
    experienceLevel: "6+ Years Field Leadership",
    salaryRange: "$90,000 - $115,000 + Vehicle Allowance",
    overview:
      "Orchestrate daily site operations, safety enforcement, quality craftsmanship, and trade scheduling for fast-tracked medical, dental, and commercial projects.",
    responsibilities: [
      "Direct daily activities of sub-trades, suppliers, and internal carpenters on active job sites",
      "Enforce GH Construction Health, Safety & Environmental protocols and ensure 100% compliance",
      "Verify installation quality against architectural specifications and mechanical/electrical schematics",
      "Lead site coordination meetings and maintain daily digital logs and progress photos",
    ],
    qualifications: [
      "Journeyperson Carpenter or relevant construction supervisory background",
      "Demonstrated track record of delivering commercial tenant build-outs on tight delivery schedules",
      "Current CSTS, Standard First Aid, WHMIS, and Fall Protection certifications",
      "Gold Seal Certified (GSC) or willingness to pursue",
    ],
    postedDate: "Updated This Week",
  },
  {
    id: "finish-carpenter",
    referenceNo: "GH-CARP-401",
    title: "Architectural Millworker & Finish Carpenter",
    department: "Skilled Trades",
    location: "Edmonton, AB",
    type: "Full-Time",
    experienceLevel: "3+ Years Experience",
    salaryRange: "$34 - $42 / hr + Comprehensive Benefits",
    overview:
      "Execute precision architectural millwork, reception desks, feature walls, acoustic ceiling baffles, and custom commercial cabinetry installations.",
    responsibilities: [
      "Install high-end architectural woodwork, doors, frames, hardware, and decorative wall paneling",
      "Read and interpret detailed shop drawings, architectural details, and finish schedules",
      "Maintain rigorous standards of cleanliness, safety, and client site presentation",
    ],
    qualifications: [
      "Red Seal or Journeyperson Carpenter credential preferred (3rd/4th year apprentices welcomed)",
      "Experience in commercial offices, luxury retail, or clinical casework installation",
      "Valid Class 5 driver’s license and own professional hand/power tools",
    ],
    postedDate: "Updated This Week",
  },
  {
    id: "hse-coordinator",
    referenceNo: "GH-HSE-503",
    title: "Site Safety & HSE Coordinator",
    department: "Safety & Compliance",
    location: "Edmonton, AB",
    type: "Full-Time",
    experienceLevel: "3+ Years Experience",
    salaryRange: "$75,000 - $90,000 + Benefits",
    overview:
      "Champion safety excellence across all GH Construction job sites, ensuring COR compliance, subcontractor orientations, and hazard assessments.",
    responsibilities: [
      "Conduct regular job site safety audits, inspections, and toolbox safety talks",
      "Manage hazard assessments, incident investigations, and regulatory reporting in compliance with Scarborough OHS",
      "Maintain company safety manuals, COR audit readiness, and subcontractor compliance documentation",
    ],
    qualifications: [
      "NCSO (National Construction Safety Officer) designation required",
      "3+ years field safety experience in commercial construction or renovation environments",
      "Strong communication and conflict-resolution skills with trade contractors",
    ],
    postedDate: "Updated This Week",
  },
  {
    id: "project-coordinator",
    referenceNo: "GH-PC-602",
    title: "Junior Project Coordinator",
    department: "Project Management",
    location: "Edmonton, AB (Hybrid Office/Site)",
    type: "Full-Time",
    experienceLevel: "1-3 Years Experience",
    salaryRange: "$60,000 - $75,000 + Growth Path",
    overview:
      "Support Project Managers with RFIs, submittals, closeout documentation, trade coordination, and site progress tracking in a supportive mentorship environment.",
    responsibilities: [
      "Track and expedite RFIs, shop drawing submittals, sample approvals, and change notices",
      "Compile comprehensive operations & maintenance (O&M) closeout manuals and warranty binders",
      "Participate in project site reviews, deficiency walkthroughs, and client status updates",
    ],
    qualifications: [
      "Diploma or Degree in Construction Management, Architecture, or Civil Engineering Technology",
      "1-3 years Canadian commercial construction or design office experience",
      "High proficiency with Procore, Bluebeam, and Microsoft Excel",
    ],
    postedDate: "Updated This Week",
  },
];

export const MOCK_APPLICATION_RECORDS: ApplicationStatusRecord[] = [
  {
    referenceNo: "GH-APP-2024-918",
    candidateName: "D. Al-Mansoor",
    positionTitle: "Senior Construction Estimator",
    positionRef: "GH-EST-202",
    submissionDate: "12 Sep 2024",
    department: "Estimating & Preconstruction",
    status: "In Review",
    statusStep: 2,
    lastUpdated: "16 Sep 2024 at 11:30 AM",
    notes:
      "Technical takeoff assessment under review by Preconstruction Director. Portfolio verification completed.",
    assignedManager: "Terry Jomha (Operations Partner)",
  },
  {
    referenceNo: "GH-APP-2024-742",
    candidateName: "M. Tremblay",
    positionTitle: "Site Superintendent - Commercial Interiors",
    positionRef: "GH-SITE-305",
    submissionDate: "04 Sep 2024",
    department: "Field Operations",
    status: "Interview Scheduled",
    statusStep: 3,
    lastUpdated: "15 Sep 2024 at 02:15 PM",
    notes:
      "On-site technical interview scheduled at Edmonton headquarters. Site safety leadership review pending.",
    assignedManager: "Nadder Jomha (Operations Partner)",
  },
  {
    referenceNo: "GH-APP-2024-511",
    candidateName: "K. Henderson",
    positionTitle: "Senior Commercial Project Manager",
    positionRef: "GH-PM-104",
    submissionDate: "22 Aug 2024",
    department: "Project Management",
    status: "Offer Extended",
    statusStep: 4,
    lastUpdated: "14 Sep 2024 at 04:45 PM",
    notes:
      "Formal offer documentation issued. Background & credential check verified with honors.",
    assignedManager: "Executive Leadership Committee",
  },
];
