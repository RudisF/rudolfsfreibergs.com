export interface Adventure {
  year: number;
  location: string;
  slug: string;
  subtitle: string;
  body: string;
  images: string[];
  side?: "left" | "right";
  extras?: {
    photos: string[];
    body: string;
  };
}

export const adventures: Adventure[] = [
  {
    year: 2026,
    location: "Two Months in Nepal, 160km into the Himalayas",
    slug: "nepal",
    subtitle: "The cost of keeping still",
    body: "Nepal teaches you that you don't actually live inside a house. You live inside the landscape of your own mind. Inside your heart.\n\nI spent two months there studying sound vibrations and meditation alongside leaders from politics, economics, and technology. Afterward, a close friend from time in Peru and I headed into the Himalayas to do the hardest trek of our lives. The Three Passes loop: Kongma La, Cho La, Renjo La. 160 kilometres. The cost of keeping still, paid in altitude.",
    images: [
      "/images/adventures/Nepal_Three_Passes_Loop.jpg",
      "/images/adventures/Nepal.jpeg",
      "/images/adventures/Nepal_2.jpg",
      "/images/adventures/Nepal_3.jpg",
      "/images/adventures/Nepal_4.JPG",
      "/images/adventures/Nepal_5.jpg",
      "/images/adventures/Nepal_6.JPG",
    ],
    side: "left",
  },
  {
    year: 2025,
    location: "Mauritania - solo on the iron ore train",
    slug: "mauritania",
    subtitle: "Crossing the Sahara",
    body: "Deep inside the Sahara. On the edge of an iron ore train, moving through hundreds of miles of nothing, the scale of the world shifts. No notifications. No distractions to save you from yourself. Every small thing inside the desert becomes massive.\n\nWe cushion every blow in this culture. Too much comfort makes us soft in ways we don't notice until it's too late. Once a year now, I go somewhere that strips away my credentials, my context, my certainties. Wandering into chaos isn't courage - it's grounding yourself in a place that does not care about your titles.\n\nCovered in black dust under too many stars, I realised uncertainty is not a sign of a broken strategy. It's a gateway.",
    images: [
      "/images/adventures/Mauritania_Main.JPG",
      "/images/adventures/Mauritania_1.JPG",
      "/images/adventures/Mauritania_2.jpg",
      "/images/adventures/Mauritania_3.jpg",
      "/images/adventures/Mauritania_4.jpg",
      "/images/adventures/Mauritania_5.JPG",
    ],
    side: "right",
  },
  {
    year: 2017,
    location: "Half year in Peru",
    slug: "peru",
    subtitle: "The language of the body",
    body: "Six months in Peru. Three expeditions deep into the Amazon - trekking under canopy that swallows the light, sleeping in outposts, fishing for piranhas off the side of a boat. Time with local tribes who measure the world differently than we do. Ceremonies with shamans who don't ask where it hurts, but look for the source of the weight you carry.\n\nModern medicine treats the body like a machine with a broken part - take a chemical, fix the part, go back to your desk. After what I saw in the Amazon, that model feels shallow. Physical ailments are rarely just physical.\n\nWhat I received from those shamans is what pulled me, years later, into formal training with the Foundation for Shamanic Studies. The reality is simpler and harder to face than any diagnosis: we've disconnected from the basic rhythm of being alive.",
    images: [
      "/images/adventures/Peru_Main.jpg",
      "/images/adventures/Peru_1.JPG",
      "/images/adventures/Peru_2.jpg",
      "/images/adventures/Peru_3.JPG",
      "/images/adventures/Peru_4.jpg",
      "/images/adventures/Peru_Amazon_Jungle_Iquitos.jpg",
    ],
    side: "left",
  },
];
