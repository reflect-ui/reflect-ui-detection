import { DetectionRule } from "../rules";
import {
  DEFAULT_CHIP_BACKGROUND_NAMING_CONVENTION_PATTERNS,
  DEFAULT_CHIP_CONTENT_NAMING_CONVENTION_PATTERNS,
  DEFAULT_CHIP_NAMING_CONVENTION_PATTERNS,
} from "@reflect-ui/namings";

export default <DetectionRule>{
  mustBeSquare: true,
  allowedTypes: [
    {
      target: "*",
      allow: true,
    },
  ],
  allowedChildren: [
    {
      target: "*",
      allow: true,
    },
  ],
  allowedNamePatterns: DEFAULT_CHIP_CONTENT_NAMING_CONVENTION_PATTERNS,
};
