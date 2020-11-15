import { DetectionRule } from "../rules"
import { DEFAULT_ICON_NAMING_CONVENTION_PATTERNS } from "@reflect.bridged.xyz/linter/lib/constants/naming-conventions/icon.naming"
import { ReflectSceneNodeType } from "@bridged.xyz/design-sdk/lib/nodes"

/**
 * material: https://material.io/design/iconography/system-icons.html
 * reflect: todo
 */
export default <DetectionRule>{
    minSize: 12,
    maxSize: 40,
    minRatio: 1,
    maxRatio: 1.5,
    mustBeSquare: true,
    allowedTypes: [
        {
            target: '*',
            allow: false
        },
        {
            target: ReflectSceneNodeType.frame,
            allow: true
        },
        {
            target: ReflectSceneNodeType.group,
            allow: true
        }, {
            target: ReflectSceneNodeType.component,
            allow: true
        }, {
            target: ReflectSceneNodeType.instance,
            allow: true
        }, {
            target: ReflectSceneNodeType.vector,
            allow: true
        },
    ],
    allowedChildren: [
        {
            target: '*',
            allow: true
        },
        {
            target: ReflectSceneNodeType.text,
            allow: false
        },
        {
            target: ReflectSceneNodeType.image,
            allow: false
        },
        {
            target: ReflectSceneNodeType.instance,
            allow: false
        },
    ],
    allowedNamePatterns: DEFAULT_ICON_NAMING_CONVENTION_PATTERNS
}