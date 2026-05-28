import type { PresentationDefinition } from "./types";
import { slides as proyekAkhirSlides } from "../slides";
import { slides as nedoStudioSlides } from "./nedo-studio";

export const presentations: PresentationDefinition[] = [
  {
    id: "proyek-akhir",
    title: "Proyek Akhir D4",
    description:
      "Development of Metadata-Based DSL Utilizing LLMs for Adaptive Multi-Platform Code Generation",
    slides: proyekAkhirSlides,
  },
  {
    id: "nedo-studio",
    title: "Progres Nedo Studio",
    description: "Role AI Developer — Lab Meeting 29 Mei 2026",
    slides: nedoStudioSlides,
  },
];
