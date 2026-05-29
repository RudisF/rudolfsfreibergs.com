export type MediaItem = {
  id: string;
  title: string;
  source: string;
  category: "Podcast" | "Webinar" | "Event" | "Award" | "Media";
  year: number;
  href: string;
  image: string;
  hasVideo?: boolean;
};

// NOTE on years — confirm before launch:
//   #1, #2: placeholders from the brief.
//   #3, #4: no date supplied — guessed, needs confirmation.
//   #5: 2009 derived from the travelnews.lv URL (index_19022009 → 2009-02-19).
// NOTE on images — reused placeholders; drop real thumbnails into
//   /public/images/media/ and update the paths below.

export const media: MediaItem[] = [
  {
    id: "riga-tech-dinner-gtm",
    title: "Riga Tech Dinner: AI, Marketing and BD",
    source: "Meetup",
    category: "Event",
    year: 2026,
    href: "https://www.meetup.com/devops-and-ai-latvia/events/314750297/",
    image: "/images/media/Rudolfs_Freibergs_marketing.png",
  },
  {
    id: "mauritania-train-podcast",
    title: "Mauritānijas tuksneša vilcienu un ceļošanas filozofiju",
    source: "YouTube",
    category: "Podcast",
    year: 2026,
    href: "https://www.youtube.com/watch?v=xoDu5pck0Ag&t=727s",
    image: "/images/media/Rudolfs_Freibergs_Mauritania.png",
    hasVideo: true,
  },
  {
    id: "ecommerce-roadmap-webinar",
    title: "Strategic roadmap for eCommerce",
    source: "YouTube",
    category: "Webinar",
    year: 2023,
    href: "https://www.youtube.com/watch?v=ctGJMadNwNU&t=1691s",
    image: "/images/media/Rudolfs_Freibergs_eCommerce.png",
    hasVideo: true,
  },
  {
    id: "turiba-honorary-graduate",
    title: "Honorary graduate in Tourism industry",
    source: "Turība University",
    category: "Award",
    year: 2023,
    href: "https://www.turiba.lv/storage/files/intervija-rudolfs-freibergs.pdf",
    image: "/images/media/Rudolfs_Freibergs_university.png",
  },
  {
    id: "peru-134-days-lecture",
    title: "Tālu no komforta zonas - 134 dienas Peru",
    source: "Turība University",
    category: "Event",
    year: 2019,
    href: "https://www.facebook.com/events/biznesa-augstskola-tur%C4%ABba/r%C5%ABdolfs-freibergs-t%C4%81lu-no-komforta-zonas-134-dienas-peru/2319858271466571/",
    image: "/images/media/Rudolfs_Freibergs_Peru.png",
  },
  {
    id: "marcahuasi-peru-travelnews",
    title: "Ceļotāja stāsts: Maģiskas sajūtas Marcahuasi kalnos, Peru",
    source: "travelnews.lv",
    category: "Media",
    year: 2018,
    href: "https://www.travelnews.lv/index_19022009_2.php?m_id=18290&i_id=5&pub_id=109663",
    image: "/images/media/Rudolfs_Freibergs_Peru_2.jpg",
  },
];
