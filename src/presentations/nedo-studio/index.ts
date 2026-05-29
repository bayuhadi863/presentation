import CoverSlide, { coverId, coverLabel } from "./cover";
import ProgressSlide, { progressId, progressLabel } from "./progress";
import AgendaSlide, { agendaId, agendaLabel } from "./agenda";
import ArchitectureSlide, { architectureId, architectureLabel } from "./architecture";
import BackendPipelineSlide, { backendPipelineId, backendPipelineLabel } from "./backend-pipeline";
import RealtimeMonitoringSlide, { realtimeMonitoringId, realtimeMonitoringLabel } from "./realtime-monitoring";
import FrontendUiSlide, { frontendUiId, frontendUiLabel } from "./frontend-ui";
import FrontendRealtimeSlide, { frontendRealtimeId, frontendRealtimeLabel } from "./frontend-realtime";
import TechnicalHighlightsSlide, { technicalHighlightsId, technicalHighlightsLabel } from "./technical-highlights";
import ClosingSlide, { closingId, closingLabel } from "./closing";
import type { SlideDefinition } from "../../slides/types";

export const slides: SlideDefinition[] = [
  { id: coverId,                Component: CoverSlide,                label: coverLabel                },
  { id: progressId,             Component: ProgressSlide,             label: progressLabel             },
  { id: agendaId,               Component: AgendaSlide,               label: agendaLabel               },
  { id: architectureId,         Component: ArchitectureSlide,         label: architectureLabel         },
  { id: backendPipelineId,      Component: BackendPipelineSlide,      label: backendPipelineLabel      },
  { id: realtimeMonitoringId,   Component: RealtimeMonitoringSlide,   label: realtimeMonitoringLabel   },
  { id: frontendUiId,           Component: FrontendUiSlide,           label: frontendUiLabel           },
  { id: frontendRealtimeId,     Component: FrontendRealtimeSlide,     label: frontendRealtimeLabel     },
  { id: technicalHighlightsId,  Component: TechnicalHighlightsSlide,  label: technicalHighlightsLabel  },
  { id: closingId,              Component: ClosingSlide,              label: closingLabel              },
];

export const slideCount = slides.length;
