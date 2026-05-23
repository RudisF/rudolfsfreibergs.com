export interface Adventure {
  year: number;
  location: string;
  slug: string;
  subtitle: string;
  body: string;
  image: string;
  side?: "left" | "right";
  extras?: {
    photos: string[];
    body: string;
  };
}

export const adventures: Adventure[] = [
  {
    year: 2026,
    location: "Two months in Nepal, 160km into the Himalayas",
    slug: "nepal",
    subtitle: "The cost of keeping still",
    body: "Nepal cultivates a profound understanding that we do not actually live inside physical houses, but rather inside the intricate landscapes of our minds and hearts. To deepen this awareness within my own life, I spent valuable time studying meditation alongside global leaders spanning the worlds of politics, economics, and technology. Balancing this intense inner exploration with rigorous physical challenge, a close friend and I journeyed deep into the Himalayas to tackle the most demanding trek of our lives. Together, we conquered the legendary Three Passes loop, testing our resilience and expanding our boundaries across a grueling 160-kilometer mountain expedition.",
    image: "/images/adventures/Adventures_1.jpg",
    side: "right",
  },
  {
    year: 2025,
    location: "Mauritania — solo on the iron ore train",
    slug: "mauritania",
    subtitle: "Crossing the Sahara",
    body: "Sitting on the edge of an iron ore train moving through hundreds of miles of absolute nothingness, the scale of the world shifts. There are no notifications or casual distractions to save you from yourself, so every small thing becomes massive. We live in a culture that cushions every blow, but too much comfort makes us soft in ways we don't notice until it's too late.\n\nNow, once a year, I go somewhere that strips away my credentials, my context, and my certainties. Wandering into chaos isn't about courage, it is about grounding yourself in an environment that does not care about your titles. On that train, covered in black dust under too many stars, I realized fear is not a sign of a broken strategy. It is a gateway, and the only place where you can actually see who you are when nobody is watching.",
    image: "/images/adventures/Adventures_2.JPG",
    side: "left",
  },
  {
    year: 2017,
    location: "Half a year in Peru",
    slug: "peru",
    subtitle: "The language of the body",
    body: "Modern medicine treats your body like a machine with a broken part — you take a chemical, fix the part, and go back to your desk. After three expeditions into the deep Amazon rainforest, that model feels incredibly shallow. When a shaman looks at a sick person, they don't just ask where it hurts, they look for the source of the weight you carry. They know what we have forgotten: industries cannot heal modern men. Physical ailments are rarely just physical: your body is simply screaming the things your mouth refuses to say.\n\nWe think we are suffering because of a medical diagnosis, but the reality is simpler and harder to face. We are suffering because we have disconnected from the basic rhythm of being alive.",
    image: "/images/adventures/Adventures_3.jpg",
    side: "right",
  },
];
