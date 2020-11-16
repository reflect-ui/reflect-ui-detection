import { ReflectSceneNodeType } from "@bridged.xyz/design-sdk/lib/nodes";
import { reflectMaxPhone } from "screen-size-specs";
import { ComplexityRule, DetectionRule } from "../rules";

// SIZING
// ✅ size
// ✅ size ratio
// COMPLEXITY
// - child count
// - total color usage
// - stacked elements count
// - line angle
// STRUCTURE
// ✅ no-image
// ✅ no-text
export interface IllustDetectionRule extends DetectionRule, ComplexityRule {

}

export default <IllustDetectionRule>{
    // sizing
    minSize: 56,
    maxWidth: reflectMaxPhone.height,
    maxHegith: reflectMaxPhone.height,

    // todo
    rightAngleCalculation: {

    },
    minRatio: 1 / 5,
    maxRatio: 5 / 1,
    // sizing

    // complexity
    minTotalChildCount: 8,
    maxTotalChildCount: 500,
    minTotalColorCount: 3,
    maxTotalColorCount: 100,


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
    ],
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
        },
        {
            target: ReflectSceneNodeType.instance,
            allow: true
        },
        {
            target: ReflectSceneNodeType.component,
            allow: true
        }
    ]
}