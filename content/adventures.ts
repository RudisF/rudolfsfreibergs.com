export interface AdventurePhoto {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "50% 40%" */
  position?: string;
}

export interface Adventure {
  year: number;
  slug: string;
  /** Heading, split so the second part can be set in gold. */
  title: [string, string];
  paragraphs: string[];
  /** "wide-top": one wide image over three. "tall-left": one tall image beside three. */
  mosaic: "wide-top" | "tall-left";
  photos: AdventurePhoto[];
  /** Text panel on the left or the right of the mosaic. */
  textSide: "left" | "right";
  tone: "sand" | "navy";
}

export const adventures: Adventure[] = [
  {
    year: 2026,
    slug: "nepal",
    title: ["Two months in", "Nepal"],
    paragraphs: [
      "I spent two months in Nepal studying sound vibrations and meditation alongside leaders from politics, economics and technology.",
      "Afterward, a close friend from my time in Peru and I headed into the Himalayas for the hardest trek of our lives. The Three Passes loop: Kongma La, Cho La, Renjo La. 160 kilometres. The cost of keeping still, paid in altitude.",
    ],
    mosaic: "wide-top",
    photos: [
      {
        src: "/images/adventures/Nepal_Three_Passes_Loop.jpg",
        alt: "Meditating on the Three Passes loop, Nepal",
        position: "50% 45%",
      },
      { src: "/images/adventures/Nepal_6.JPG", alt: "Stupa and prayer flags in the Khumbu valley" },
      { src: "/images/adventures/Nepal_4.JPG", alt: "Stupa at night, Nepal" },
      { src: "/images/adventures/Nepal_5.jpg", alt: "Himalayan valley in black and white" },
    ],
    textSide: "right",
    tone: "sand",
  },
  {
    year: 2025,
    slug: "mauritania",
    title: ["Solo across", "the Sahara"],
    paragraphs: [
      "On the edge of an iron ore train, moving through hundreds of miles of nothing, the scale of the world shifts. No notifications. No distractions to save you from yourself.",
      "Once a year now, I go somewhere that strips away my credentials, my context, my certainties.",
      "Covered in black dust under too many stars, I realised uncertainty is not a sign of a broken strategy.",
    ],
    mosaic: "tall-left",
    photos: [
      { src: "/images/adventures/Mauritania_Main.JPG", alt: "On the iron ore train at sunset" },
      {
        src: "/images/adventures/Mauritania_5.JPG",
        alt: "With camel herders in the Sahara",
        position: "50% 45%",
      },
      {
        src: "/images/adventures/Mauritania_4.jpg",
        alt: "Tea being poured, Mauritania",
        position: "50% 45%",
      },
      {
        src: "/images/adventures/Mauritania_3.jpg",
        alt: "Street vendor with a bread cart, Mauritania",
        position: "50% 40%",
      },
    ],
    textSide: "left",
    tone: "navy",
  },
  {
    year: 2017,
    slug: "peru",
    title: ["Half a year in", "Peru"],
    paragraphs: [
      "Six months in Peru. Three expeditions deep into the Amazon: trekking under canopy that swallows the light, sleeping in outposts, fishing for piranhas off the side of a boat.",
      "Ceremonies with shamans who do not ask where it hurts, but look for the source of the weight you carry. That is what pulled me, years later, into formal training with the Foundation for Shamanic Studies.",
    ],
    mosaic: "wide-top",
    photos: [
      {
        src: "/images/adventures/Peru_Amazon_Jungle_Iquitos.jpg",
        alt: "With a local tribe in the Amazon near Iquitos",
      },
      { src: "/images/adventures/Peru_4.jpg", alt: "Above Machu Picchu", position: "50% 40%" },
      {
        src: "/images/adventures/Peru_2.jpg",
        alt: "Holding a sloth in the Amazon",
        position: "50% 40%",
      },
    ],
    textSide: "right",
    tone: "sand",
  },
];
