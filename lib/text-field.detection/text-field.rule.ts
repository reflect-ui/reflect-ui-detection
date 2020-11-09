import { DEFAULT_TEXT_FIELD_NAMING_CONVENTION_PATTERNS } from "@reflect.bridged.xyz/linter/lib/constants/naming-conventions/text-field.naming";
import { DetectionRule } from "../rules/rule.base";

export default <DetectionRule>{
    minSize: 24,
    minHeight: 32,
    minWidth: 200,
    maxHegith: 200,
    mustBeSquare: false,
    allowedNamePatterns: DEFAULT_TEXT_FIELD_NAMING_CONVENTION_PATTERNS
}