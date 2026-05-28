import type { SlideDefinition } from "../slides/types";

export type PresentationDefinition = {
  id: string;
  title: string;
  description?: string;
  slides: SlideDefinition[];
};
