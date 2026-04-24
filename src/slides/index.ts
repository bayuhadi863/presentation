import WelcomeSlide, { welcomeId, welcomeLabel } from "./welcome";
import ProblemSlide, { problemId, problemLabel } from "./problem";
import SystemSlide, { systemId, systemLabel } from "./system";
import AIWorkflowSlide, { aiWorkflowId, aiWorkflowLabel } from "./ai-workflow";
import CodegenMainSlide, {
  codegenMainId,
  codegenMainLabel,
} from "./codegen-main";
import CodegenLLMSlide, { codegenLLMId, codegenLLMLabel } from "./codegen-llm";
import CodegenGitSlide, { codegenGitId, codegenGitLabel } from "./codegen-git";
import CodegenJobSlide, { codegenJobId, codegenJobLabel } from "./codegen-job";
import CodegenGenerateSlide, {
  codegenGenerateId,
  codegenGenerateLabel,
} from "./codegen-generate";
import CodegenHistorySlide, {
  codegenHistoryId,
  codegenHistoryLabel,
} from "./codegen-history";
import CodegenDetailSlide, {
  codegenDetailId,
  codegenDetailLabel,
} from "./codegen-detail";
import CodegenResultSlide, {
  codegenResultId,
  codegenResultLabel,
} from "./codegen-result";
import CodegenGitlabPRSlide, {
  codegenGitlabPRId,
  codegenGitlabPRLabel,
} from "./codegen-gitlab-pr";
import CodegenGitlabCommitSlide, {
  codegenGitlabCommitId,
  codegenGitlabCommitLabel,
} from "./codegen-gitlab-commit";
import CodegenSwaggerSlide, {
  codegenSwaggerId,
  codegenSwaggerLabel,
} from "./codegen-swagger";
import AIImplDataStructureSlide, {
  aiImplDataStructureId,
  aiImplDataStructureLabel,
} from "./impl-ai-data-structure";
import AIImplIndexSlide, {
  aiImplIndexId,
  aiImplIndexLabel,
} from "./impl-ai-index";
import AIImplValidationSlide, {
  aiImplValidationId,
  aiImplValidationLabel,
} from "./impl-ai-validation";
import AIImplSanitizationSlide, {
  aiImplSanitizationId,
  aiImplSanitizationLabel,
} from "./impl-ai-sanitization";
import AIImplTransformationSlide, {
  aiImplTransformationId,
  aiImplTransformationLabel,
} from "./impl-ai-transformation";
import BackendCoverageSlide, {
  backendCoverageId,
  backendCoverageLabel,
} from "./backend-coverage";
import BackendQualitySlide, {
  backendQualityId,
  backendQualityLabel,
} from "./backend-quality";
import ConclusionSlide, { conclusionId, conclusionLabel } from "./conclusion";
import SuggestionsSlide, {
  suggestionsId,
  suggestionsLabel,
} from "./suggestions";
import ClosingSlide, { closingId, closingLabel } from "./closing";
import type { SlideDefinition } from "./types";

export const slides: SlideDefinition[] = [
  { id: welcomeId, label: welcomeLabel, Component: WelcomeSlide },
  { id: problemId, label: problemLabel, Component: ProblemSlide },
  { id: systemId, label: systemLabel, Component: SystemSlide },
  { id: aiWorkflowId, label: aiWorkflowLabel, Component: AIWorkflowSlide },
  { id: codegenMainId, label: codegenMainLabel, Component: CodegenMainSlide },
  { id: codegenLLMId, label: codegenLLMLabel, Component: CodegenLLMSlide },
  { id: codegenGitId, label: codegenGitLabel, Component: CodegenGitSlide },
  { id: codegenJobId, label: codegenJobLabel, Component: CodegenJobSlide },
  {
    id: aiImplDataStructureId,
    label: aiImplDataStructureLabel,
    Component: AIImplDataStructureSlide,
  },
  { id: aiImplIndexId, label: aiImplIndexLabel, Component: AIImplIndexSlide },
  {
    id: aiImplValidationId,
    label: aiImplValidationLabel,
    Component: AIImplValidationSlide,
  },
  {
    id: aiImplSanitizationId,
    label: aiImplSanitizationLabel,
    Component: AIImplSanitizationSlide,
  },
  {
    id: aiImplTransformationId,
    label: aiImplTransformationLabel,
    Component: AIImplTransformationSlide,
  },
  {
    id: codegenGenerateId,
    label: codegenGenerateLabel,
    Component: CodegenGenerateSlide,
  },
  {
    id: codegenHistoryId,
    label: codegenHistoryLabel,
    Component: CodegenHistorySlide,
  },
  {
    id: codegenDetailId,
    label: codegenDetailLabel,
    Component: CodegenDetailSlide,
  },
  {
    id: codegenResultId,
    label: codegenResultLabel,
    Component: CodegenResultSlide,
  },
  {
    id: codegenGitlabPRId,
    label: codegenGitlabPRLabel,
    Component: CodegenGitlabPRSlide,
  },
  {
    id: codegenGitlabCommitId,
    label: codegenGitlabCommitLabel,
    Component: CodegenGitlabCommitSlide,
  },
  {
    id: codegenSwaggerId,
    label: codegenSwaggerLabel,
    Component: CodegenSwaggerSlide,
  },
  {
    id: backendCoverageId,
    label: backendCoverageLabel,
    Component: BackendCoverageSlide,
  },
  {
    id: backendQualityId,
    label: backendQualityLabel,
    Component: BackendQualitySlide,
  },
  {
    id: conclusionId,
    label: conclusionLabel,
    Component: ConclusionSlide,
  },
  {
    id: suggestionsId,
    label: suggestionsLabel,
    Component: SuggestionsSlide,
  },
  { id: closingId, label: closingLabel, Component: ClosingSlide },
];

export const slideCount = slides.length;
