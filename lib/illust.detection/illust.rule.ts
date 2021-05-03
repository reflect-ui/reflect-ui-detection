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

/**
 * Currently there is no accurate and valid algorithm to detect complex full width/height illustration. this detection rule will only detect complex illust-like node that is in mini size
 * To use full sized illustration, user must specify it as a exportable or explicitly define it as an illust.
 */
export interface MiniIllustDetectionRule
  extends DetectionRule,
    ComplexityRule {}

export default <MiniIllustDetectionRule>{
  // sizing
  minSize: 56,
  maxWidth: reflectMaxPhone.width,
  maxHegith: 600,
  mustBeRoot: false,

  // todo
  rightAngleCalculation: {},
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
      target: "*",
      allow: true,
    },
    {
      target: ReflectSceneNodeType.text,
      allow: false,
    },
    {
      target: ReflectSceneNodeType.image,
      allow: false,
    },
    // Todo add constraints
  ],
  allowedTypes: [
    {
      target: "*",
      allow: false,
    },
    {
      target: ReflectSceneNodeType.frame,
      allow: true,
    },
    {
      target: ReflectSceneNodeType.group,
      allow: true,
    },
    {
      target: ReflectSceneNodeType.instance,
      allow: true,
    },
    {
      target: ReflectSceneNodeType.component,
      allow: true,
    },
  ],
};
