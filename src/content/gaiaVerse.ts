export interface QuoteItem {
  text: string;
  author: string;
  tone?: string;
  tag?: string;
}

export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend: string;
  progress: number;
  accent: "green" | "blue" | "amber";
  detail: string;
}

export interface StoryPhase {
  id: "past" | "present" | "future";
  era: string;
  title: string;
  description: string;
  earthState: "vibrant" | "distressed" | "restored";
}

export interface ProblemCard {
  title: string;
  body: string;
  icon: string;
  accent: "green" | "blue" | "amber";
  interactionCopy: string;
}

export interface SolutionCard {
  title: string;
  body: string;
  icon: string;
  accent: "green" | "blue";
  interactionCopy: string;
}

export interface ActionChallenge {
  id: string;
  label: string;
  statusText: string;
  reward?: string;
  progress?: number;
}

export const introQuotes: QuoteItem[] = [
  {
    text: "The future of humanity is written in the health of the atmosphere, the oceans, and the soil beneath our feet.",
    author: "GaiaVerse Archive",
    tone: "urgent",
    tag: "planetary health"
  },
  {
    text: "We do not inherit Earth from the past. We borrow it from every generation that comes after us.",
    author: "GaiaVerse Archive",
    tone: "reflective",
    tag: "responsibility"
  },
  {
    text: "Climate action becomes real when care turns into systems, habits, and shared momentum.",
    author: "GaiaVerse Archive",
    tone: "hopeful",
    tag: "collective action"
  },
  {
    text: "A livable planet is not a luxury outcome. It is the foundation for every future we hope to build.",
    author: "GaiaVerse Archive",
    tone: "cinematic",
    tag: "future"
  }
];

export const storyPhases: StoryPhase[] = [
  {
    id: "past",
    era: "Past / Living Balance",
    title: "Healthy Earth",
    description:
      "Biodiversity thrived, forests acted as steady carbon sinks, and natural cycles kept climate systems resilient and self-renewing.",
    earthState: "vibrant"
  },
  {
    id: "present",
    era: "Present / Climate Tension",
    title: "Pollution and Climate Crisis",
    description:
      "Emissions, extraction, and waste have overloaded the atmosphere and oceans, pushing ecosystems beyond their natural thresholds.",
    earthState: "distressed"
  },
  {
    id: "future",
    era: "Future / Regenerative Shift",
    title: "Sustainable Earth",
    description:
      "Regenerative cities, restored habitats, clean energy grids, and circular materials can return stability to the systems that sustain life.",
    earthState: "restored"
  }
];

export const impactMetrics: ImpactMetric[] = [
  {
    id: "deforestation",
    label: "Deforestation",
    value: "10M",
    unit: "hectares lost yearly",
    trend: "Forest cover keeps shrinking across key biodiversity regions.",
    progress: 0.72,
    accent: "amber",
    detail: "Canopy loss weakens rainfall cycles and species resilience."
  },
  {
    id: "co2",
    label: "CO2 Emissions",
    value: "421",
    unit: "ppm atmospheric concentration",
    trend: "Carbon intensity remains above the safe climate envelope.",
    progress: 0.88,
    accent: "blue",
    detail: "Higher concentrations trap more heat and intensify disruption."
  },
  {
    id: "warming",
    label: "Global Warming",
    value: "1.2",
    unit: "degrees C above baseline",
    trend: "The warming signal now shapes weather in every region.",
    progress: 0.67,
    accent: "amber",
    detail: "Heatwaves, floods, droughts, and fires are becoming more severe."
  },
  {
    id: "plastic",
    label: "Plastic Pollution",
    value: "400M",
    unit: "tons produced each year",
    trend: "Single-use waste continues to leak into rivers and coastlines.",
    progress: 0.79,
    accent: "green",
    detail: "Microplastics now move through food chains and freshwater systems."
  },
  {
    id: "ocean",
    label: "Ocean Pollution",
    value: "8M",
    unit: "tons entering oceans yearly",
    trend: "Marine ecosystems absorb the cost of land-based consumption.",
    progress: 0.83,
    accent: "blue",
    detail: "Coral reefs, fisheries, and coastal habitats face compounding stress."
  }
];

export const problemCards: ProblemCard[] = [
  {
    title: "Air Pollution",
    body: "Urban smog and industrial emissions degrade human health while accelerating atmospheric imbalance.",
    icon: "AQ",
    accent: "blue",
    interactionCopy: "Trace the health burden"
  },
  {
    title: "Plastic Waste",
    body: "A convenience economy built on disposability leaves persistent waste in soils, rivers, and seas.",
    icon: "PW",
    accent: "green",
    interactionCopy: "Follow the waste stream"
  },
  {
    title: "Deforestation",
    body: "Rapid land clearing removes biodiversity buffers and increases vulnerability to drought, erosion, and heat.",
    icon: "DF",
    accent: "amber",
    interactionCopy: "See biome loss"
  },
  {
    title: "Climate Change",
    body: "Rising temperatures amplify extreme weather, displace communities, and destabilize global food systems.",
    icon: "CC",
    accent: "amber",
    interactionCopy: "Inspect risk pathways"
  },
  {
    title: "Biodiversity Loss",
    body: "Species decline weakens ecological networks that support pollination, water purity, and resilience.",
    icon: "BD",
    accent: "green",
    interactionCopy: "Reveal the cascade"
  }
];

export const solutionCards: SolutionCard[] = [
  {
    title: "Plant Trees",
    body: "Restore canopy corridors and native habitats to strengthen carbon storage and cooling systems.",
    icon: "TR",
    accent: "green",
    interactionCopy: "Activate restoration"
  },
  {
    title: "Reduce Plastic",
    body: "Shift to refill systems, reusable packaging, and circular materials that keep waste out of ecosystems.",
    icon: "RP",
    accent: "blue",
    interactionCopy: "Deploy circular design"
  },
  {
    title: "Save Water",
    body: "Smart irrigation, watershed protection, and conservation habits keep freshwater systems reliable.",
    icon: "SW",
    accent: "blue",
    interactionCopy: "Protect the watershed"
  },
  {
    title: "Renewable Energy",
    body: "Clean power reduces emissions while unlocking more resilient local energy infrastructure.",
    icon: "RE",
    accent: "green",
    interactionCopy: "Scale clean power"
  },
  {
    title: "Protect Wildlife",
    body: "Habitat preservation and migration corridors allow species to adapt as landscapes and climate shift.",
    icon: "WL",
    accent: "green",
    interactionCopy: "Safeguard habitats"
  }
];

export const actionChallenges: ActionChallenge[] = [
  {
    id: "commute",
    label: "Low-Carbon Commute Week",
    statusText: "Swap 3 short car trips for walking, cycling, or shared transit.",
    reward: "Estimated impact: 18 kg CO2 avoided",
    progress: 0.62
  },
  {
    id: "plastic",
    label: "Single-Use Reset",
    statusText: "Carry a bottle, cup, and tote for the next 7 days.",
    reward: "Estimated impact: 27 fewer disposable items",
    progress: 0.48
  },
  {
    id: "energy",
    label: "Home Energy Sprint",
    statusText: "Reduce standby power and replace one high-use bulb with LED lighting.",
    reward: "Estimated impact: 14 kWh saved",
    progress: 0.74
  }
];

export const heroHighlights = [
  "Cinematic Earth visualized in real time",
  "Climate storytelling across past, present, and future",
  "Action pathways designed to feel tangible and personal"
];

export const footerLinks = [
  { label: "Mission", href: "#hero" },
  { label: "Impact", href: "#impact" },
  { label: "Solutions", href: "#solutions" },
  { label: "GitHub", href: "https://github.com/" }
];
