export interface Certification {
  name: string;
  issuer: string;
}

export interface Mentorship {
  name: string;
  mentor: string;
}

export const certifications: Certification[] = [
  { name: "Strategic Account Manager (CSAM)", issuer: "Stockholm School of Economics in Riga" },
  { name: "B2B Marketing and Growth", issuer: "CXL" },
  { name: "Adobe Target", issuer: "Adobe Sales" },
  { name: "Sales Accreditation", issuer: "Adobe Commerce" },
  { name: "eCommerce Marketing", issuer: "CXL" },
  { name: "Conversion Optimization", issuer: "CXL" },
  { name: "Google Analytics 4", issuer: "Google" },
  { name: "AI Fluency for Business", issuer: "Anthropic" },
  { name: "Inbound Certified + 4 more courses", issuer: "HubSpot" },
];

export const mentorships: Mentorship[] = [
  { name: "Business Engagement", mentor: "Scott Gould" },
  { name: "ABM and B2B Marketing", mentor: "Fullfunnel.io" },
];
