import CoverSlide, { coverId, coverLabel } from "./cover";
import type { SlideDefinition } from "../../slides/types";

export const slides: SlideDefinition[] = [
  { id: coverId, label: coverLabel, Component: CoverSlide },
];

export const slideCount = slides.length;
