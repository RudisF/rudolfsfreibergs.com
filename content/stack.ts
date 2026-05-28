export interface Tool {
  name: string;
  logo: string;
}

export const stack: Tool[] = [
  { name: "HubSpot", logo: "/images/stack/HubSpot_Logo.svg.png" },
  { name: "Salesforce", logo: "/images/stack/Salesforce.com_logo.svg.png" },
  { name: "Pipedrive", logo: "/images/stack/pipedrive.png" },
  { name: "Membrain", logo: "/images/stack/membrain_logo.png" },
  { name: "Adobe Commerce", logo: "/images/stack/Adobe_Commerce_Logo.webp" },
  { name: "Magento", logo: "/images/stack/Magento.svg.png" },
  { name: "Google Analytics", logo: "/images/stack/Logo_Google_Analytics.svg.png" },
  { name: "Ahrefs", logo: "/images/stack/ahrefs_BIG-20d12c92.png" },
  { name: "CXL", logo: "/images/stack/CXL.png" },
  { name: "Clay", logo: "/images/stack/clay_logo.png" },
  { name: "Smartlead", logo: "/images/stack/smartlead-logo-1654x350.png" },
  { name: "Salesforge", logo: "/images/stack/SF-Logo.png" },
  { name: "n8n", logo: "/images/stack/n8n_logo.png" },
  { name: "Claude", logo: "/images/stack/Claude_AI_logo.svg.png" },
  { name: "RevGenius", logo: "/images/stack/RevGenius_new.png" },
  { name: "FF", logo: "/images/stack/FF.webp" },
  { name: "B2B Marketing", logo: "/images/stack/b2b-marketing-vector-logo.png" },
  { name: "SSE Riga", logo: "/images/stack/sse_riga_logo.svg" },
];

export interface Client {
  name: string;
  logo: string;
  /** Optional per-logo class (e.g. a scale tweak) to balance visual size. */
  className?: string;
}

export const clients: Client[] = [
  { name: "Haypp", logo: "/images/clients/Haypp.jpg" },
  { name: "Läderach", logo: "/images/clients/Laderach.gif" },
  { name: "MET Store", logo: "/images/clients/MET_Store.png" },
  { name: "PUMA", logo: "/images/clients/new-Puma-cat-logo-black-png-large-size.png", className: "scale-[0.8]" },
  { name: "Spice", logo: "/images/clients/Spice.png" },
];
