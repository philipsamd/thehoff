export type AssetStatus =
  | "Draft"
  | "In Review"
  | "Legal Approved"
  | "Regulatory Approved"
  | "Final Approved"
  | "Expiring Soon"
  | "Archived";

export interface Asset {
  id: string;
  name: string;
  type: string;
  product: string;
  campaign: string;
  channel: string;
  persona: string;
  funnelStage: string;
  region: string;
  owner: string;
  status: AssetStatus;
  version: string;
  expiration: string;
  usageRights: string;
  source: string;
  destination: string;
  tags: string[];
  utm: string;
  approvalHistory: { stage: string; by: string; date: string }[];
  related: string[];
  performance: { impressions: number; ctr: number; downloads: number };
  thumbColor: string;
}

export const assets: Asset[] = [
  {
    id: "AMD-00421",
    name: "ePatch_AFib_LinkedIn_15sec.mp4",
    type: "Video",
    product: "ePatch",
    campaign: "PCP Awareness, HRS 2026",
    channel: "LinkedIn",
    persona: "PCP",
    funnelStage: "Awareness",
    region: "US",
    owner: "Maya Reynolds",
    status: "Final Approved",
    version: "v3.2",
    expiration: "2026-09-30",
    usageRights: "Paid + Organic, US only",
    source: "Philips Asset Library (PAL)",
    destination: "Seismic, LinkedIn Campaign Manager",
    tags: ["AFib", "ePatch", "PCP", "Video", "15s"],
    utm: "utm_source=linkedin&utm_medium=paid&utm_campaign=epatch_pcp_2026",
    approvalHistory: [
      { stage: "Brand", by: "K. Alvarez", date: "2026-02-10" },
      { stage: "Legal", by: "T. Brooks", date: "2026-02-14" },
      { stage: "Regulatory", by: "Dr. P. Chen", date: "2026-02-18" },
      { stage: "Final", by: "M. Reynolds", date: "2026-02-19" },
    ],
    related: ["AMD-00422", "AMD-00510"],
    performance: { impressions: 412300, ctr: 1.84, downloads: 47 },
    thumbColor: "from-sky-500 to-blue-700",
  },
  {
    id: "AMD-00510",
    name: "MCOT_Enterprise_IDN_Deck.pptx",
    type: "Presentation",
    product: "MCOT",
    campaign: "Enterprise IDN",
    channel: "Seismic",
    persona: "C-suite, Service Line Leader",
    funnelStage: "Consideration",
    region: "NAM",
    owner: "David Park",
    status: "Final Approved",
    version: "v4.0",
    expiration: "2026-12-31",
    usageRights: "Internal + Customer-facing",
    source: "SharePoint",
    destination: "Seismic",
    tags: ["MCOT", "IDN", "Deck", "Enterprise"],
    utm: "—",
    approvalHistory: [
      { stage: "Brand", by: "K. Alvarez", date: "2026-01-22" },
      { stage: "Legal", by: "T. Brooks", date: "2026-01-28" },
      { stage: "Final", by: "D. Park", date: "2026-01-30" },
    ],
    related: ["AMD-00610"],
    performance: { impressions: 0, ctr: 0, downloads: 312 },
    thumbColor: "from-indigo-500 to-blue-700",
  },
  {
    id: "AMD-00610",
    name: "Federal_VA_MSPV_OnePager.pdf",
    type: "PDF",
    product: "MCOT + ePatch",
    campaign: "Federal VA",
    channel: "Email, Seismic",
    persona: "VA/DoD, Procurement",
    funnelStage: "Consideration",
    region: "US",
    owner: "Lena Ortiz",
    status: "Legal Approved",
    version: "v1.4",
    expiration: "2026-08-15",
    usageRights: "Federal accounts only",
    source: "PAL",
    destination: "Seismic, Salesforce",
    tags: ["Federal", "VA", "MSPV", "Procurement"],
    utm: "—",
    approvalHistory: [
      { stage: "Brand", by: "K. Alvarez", date: "2026-02-02" },
      { stage: "Legal", by: "T. Brooks", date: "2026-02-09" },
    ],
    related: ["AMD-00510"],
    performance: { impressions: 0, ctr: 0, downloads: 88 },
    thumbColor: "from-emerald-500 to-teal-700",
  },
  {
    id: "AMD-00712",
    name: "ISECG_OneSite_SEO_Brief.docx",
    type: "Document",
    product: "IntelliSpace ECG",
    campaign: "SEO",
    channel: "SEO",
    persona: "Cardiologist, IT",
    funnelStage: "Awareness",
    region: "US",
    owner: "Priya Shah",
    status: "In Review",
    version: "v0.6",
    expiration: "—",
    usageRights: "Internal",
    source: "Contentful",
    destination: "OneSite",
    tags: ["SEO", "ISECG", "Brief", "OneSite"],
    utm: "—",
    approvalHistory: [{ stage: "Brand", by: "K. Alvarez", date: "2026-02-20" }],
    related: [],
    performance: { impressions: 0, ctr: 0, downloads: 9 },
    thumbColor: "from-violet-500 to-indigo-700",
  },
  {
    id: "AMD-00820",
    name: "HRS_2026_Booth_QR_Assets.zip",
    type: "Archive",
    product: "MCOT, ePatch",
    campaign: "HRS 2026",
    channel: "Event",
    persona: "EP, Cardiologist",
    funnelStage: "Awareness",
    region: "US",
    owner: "Jordan Kim",
    status: "Draft",
    version: "v0.2",
    expiration: "2026-05-10",
    usageRights: "Event only",
    source: "SharePoint",
    destination: "HRS Booth Kiosk",
    tags: ["HRS", "Event", "QR", "Booth"],
    utm: "utm_source=hrs&utm_medium=event&utm_campaign=hrs2026",
    approvalHistory: [],
    related: [],
    performance: { impressions: 0, ctr: 0, downloads: 0 },
    thumbColor: "from-amber-500 to-orange-600",
  },
  {
    id: "AMD-00905",
    name: "Cardiac_Workstation_Claims_Library.xlsx",
    type: "Spreadsheet",
    product: "Cardiac Workstation",
    campaign: "Claims Governance",
    channel: "Internal",
    persona: "All Marketing",
    funnelStage: "—",
    region: "NAM",
    owner: "Dr. P. Chen",
    status: "Regulatory Approved",
    version: "v2.1",
    expiration: "2027-01-01",
    usageRights: "Claims source of truth",
    source: "PAL",
    destination: "All channels",
    tags: ["Claims", "Regulatory", "Library"],
    utm: "—",
    approvalHistory: [
      { stage: "Legal", by: "T. Brooks", date: "2026-01-05" },
      { stage: "Regulatory", by: "Dr. P. Chen", date: "2026-01-12" },
    ],
    related: [],
    performance: { impressions: 0, ctr: 0, downloads: 156 },
    thumbColor: "from-rose-500 to-red-700",
  },
];

export const campaigns = [
  {
    id: "C-001",
    name: "2026 MCOT Trust Campaign",
    objective: "Reinforce MCOT clinical & operational trust vs extended Holter",
    product: "MCOT",
    personas: ["EP", "Service Line Leader", "C-suite"],
    status: "In Flight",
    readiness: 72,
    pillars: ["Clinical evidence", "Diagnostic yield", "Workflow efficiency", "Patient experience"],
    channels: ["LinkedIn", "Google SEA", "OneSite", "Seismic", "HRS Booth"],
    kpis: { mql: 480, sql: 120, pipeline: "$8.4M" },
  },
  {
    id: "C-002",
    name: "2026 Federal VA MCOT + ePatch",
    objective: "Win Federal VA & DoD ambulatory monitoring contracts",
    product: "MCOT + ePatch",
    personas: ["VA/DoD", "Procurement"],
    status: "Launch Prep",
    readiness: 86,
    pillars: ["MSPV compliance", "Veteran outcomes", "Total cost of ownership"],
    channels: ["Email", "Seismic", "Federal Events"],
    kpis: { mql: 90, sql: 35, pipeline: "$12.1M" },
  },
  {
    id: "C-003",
    name: "HRS 2026",
    objective: "Drive booth traffic & EP engagement at HRS Annual",
    product: "Portfolio",
    personas: ["EP", "Cardiologist"],
    status: "Planning",
    readiness: 41,
    pillars: ["Innovation", "AI-enabled diagnostics", "Cardiologs"],
    channels: ["Event", "LinkedIn", "Email"],
    kpis: { mql: 320, sql: 60, pipeline: "$4.2M" },
  },
  {
    id: "C-004",
    name: "ePatch PCP Awareness",
    objective: "Build PCP awareness of ePatch for AFib detection",
    product: "ePatch",
    personas: ["PCP"],
    status: "In Flight",
    readiness: 64,
    pillars: ["AFib detection", "Ease of prescribing", "Patient comfort"],
    channels: ["LinkedIn", "Google SEA", "OneSite"],
    kpis: { mql: 610, sql: 140, pipeline: "$5.6M" },
  },
  {
    id: "C-005",
    name: "Enterprise IDN Portfolio",
    objective: "Position full AM&D portfolio to enterprise IDNs",
    product: "Portfolio",
    personas: ["C-suite", "Service Line Leader", "IT"],
    status: "In Flight",
    readiness: 58,
    pillars: ["Enterprise interoperability", "Cardiologs AI", "Total monitoring continuum"],
    channels: ["Seismic", "ABM", "Email"],
    kpis: { mql: 220, sql: 70, pipeline: "$22.5M" },
  },
];

export const seoProjects = [
  { name: "ePatch PCP Awareness Page", readiness: 78, clusters: 6, owner: "Priya Shah", approval: "In Review", contentful: "Drafted" },
  { name: "MCOT Enterprise Trust Page", readiness: 92, clusters: 9, owner: "Priya Shah", approval: "Legal Approved", contentful: "Scheduled" },
  { name: "IntelliSpace ECG AI Marketplace", readiness: 54, clusters: 4, owner: "Marcus Lee", approval: "Draft", contentful: "Not started" },
  { name: "Federal VA Monitoring Solutions", readiness: 81, clusters: 7, owner: "Lena Ortiz", approval: "In Review", contentful: "Drafted" },
];

export const approvalQueue = [
  { item: "ePatch_PCP_Hero_Carousel.psd", stage: "Legal Review", owner: "T. Brooks", days: 3, due: "2026-03-02", risk: "Medium", approver: "Legal" },
  { item: "MCOT_Trust_LinkedIn_Video_v2.mp4", stage: "Regulatory Review", owner: "Dr. P. Chen", days: 5, due: "2026-03-01", risk: "High", approver: "Regulatory" },
  { item: "HRS_Booth_Backwall.ai", stage: "Brand Review", owner: "K. Alvarez", days: 1, due: "2026-03-05", risk: "Low", approver: "Brand" },
  { item: "Federal_VA_SolutionBrief_v3.pdf", stage: "Legal Review", owner: "T. Brooks", days: 7, due: "2026-02-28", risk: "High", approver: "Legal" },
  { item: "Cardiologs_AI_OnePager.pdf", stage: "Brand Review", owner: "K. Alvarez", days: 2, due: "2026-03-04", risk: "Medium", approver: "Brand" },
  { item: "ISECG_SEO_LandingPage_Copy.docx", stage: "Draft", owner: "P. Shah", days: 1, due: "2026-03-08", risk: "Low", approver: "—" },
];

export const integrations = [
  { name: "Philips Asset Library (PAL)", status: "Connected", desc: "Primary asset source of truth" },
  { name: "Contentful / OneSite CMS", status: "Connected", desc: "Web content & landing pages" },
  { name: "Salesforce / BioTel CRM", status: "Pilot", desc: "Account, opportunity, lead sync" },
  { name: "Seismic", status: "Connected", desc: "Seller enablement & content activation" },
  { name: "Smartsheet", status: "Manual Export", desc: "Campaign project plans" },
  { name: "SEMrush", status: "Connected", desc: "Keyword universe & ranking inputs" },
  { name: "Google Analytics 4", status: "Connected", desc: "Page & campaign performance" },
  { name: "Adobe Analytics", status: "Planned", desc: "Cross-channel attribution" },
  { name: "SharePoint / OneDrive", status: "Needs Configuration", desc: "Legacy asset migration source" },
];

export const aiPrompts = [
  "Find the best-performing LinkedIn ads for AFib campaigns.",
  "Show me all final-approved MCOT assets for enterprise IDNs.",
  "Create three LinkedIn ad variants from this approved ePatch message.",
  "Which assets are expired but still being downloaded?",
  "Which campaigns used the same keyword cluster?",
  "Summarize all approved claims for IntelliSpace ECG.",
  "Recommend assets for a PCP-focused ePatch campaign.",
];

export const roles = [
  "Admin",
  "Digital Strategy Manager",
  "Campaign Manager",
  "SEO Lead",
  "Paid Media Manager",
  "Sales Enablement",
  "Agency Contributor",
  "Brand Reviewer",
  "Legal Reviewer",
  "Regulatory Reviewer",
  "Sales Viewer",
];
