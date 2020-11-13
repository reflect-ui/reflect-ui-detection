import { DetectionRule } from "../rules"
import { DEFAULT_ICON_NAMING_CONVENTION_PATTERNS } from "@reflect.bridged.xyz/linter/lib/constants/naming-conventions/icon.naming"

/**
 * material: https://material.io/design/iconography/system-icons.html
 * reflect: todo
 */
export default <DetectionRule>{
    minSize: 12,
    maxSize: 40,
    mustBeSquare: true,
    allowedNamePatterns: DEFAULT_ICON_NAMING_CONVENTION_PATTERNS
}