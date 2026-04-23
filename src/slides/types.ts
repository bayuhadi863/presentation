import type { ComponentType } from "react";

export type SlideMode = "web" | "presentation";

export type SlideProps = {
  mode: SlideMode;
};

export type SlideDefinition = {
  id: string;
  label: string;
  Component: ComponentType<SlideProps>;
};
