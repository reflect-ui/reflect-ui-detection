import { DEFAULT_TEXT_FIELD_NAMING_CONVENTION_PATTERNS } from "@reflect-ui/namings";
import { DetectionRule } from "../rules";

export default <DetectionRule>{
  minSize: 24,
  minHeight: 32,
  minWidth: 200,
  maxHegith: 200,
  mustBeSquare: false,
  allowedNamePatterns: DEFAULT_TEXT_FIELD_NAMING_CONVENTION_PATTERNS,
};
