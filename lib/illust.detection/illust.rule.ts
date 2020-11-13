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
    minSize: 120,
    maxWidth: reflectMaxPhone.height,
    maxHegith: reflectMaxPhone.height,
    minRatio: 1 / 5,
    maxRatio: 5 / 1,
    // sizing

    // complexity
    minTotalChildCount: 20,
    maxTotalChildCount: 200,
    minTotalColorCount: 3,
    maxTotalColorCount: 100,


    allowedChildren: [
        {
            target: ReflectSceneNodeType.text,
            allow: false
        },
        {
            target: ReflectSceneNodeType.image,
            allow: false
        },
    ],
    allowedTypes: [ReflectSceneNodeType.frame, ReflectSceneNodeType.group]
}