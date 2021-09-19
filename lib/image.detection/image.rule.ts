import { ReflectSceneNodeType } from "@design-sdk/core";
import { reflectMaxPhone } from "screen-size-specs";
import { ComplexityRule, DetectionRule } from "../rules";

///
/// currently, image deetection does not use the standard rule based detecting, it uses custom logic gate to determine if the frame/shape is a primary image node.
///
export interface ImageDetectionRule extends DetectionRule, ComplexityRule {}

export default <ImageDetectionRule>{
  // sizing
  minSize: 8,
  maxWidth: Number.POSITIVE_INFINITY, // change this to root.width
  maxHegith: Number.POSITIVE_INFINITY, // change this to root.height
  mustBeRoot: false,

  // sizing
  minRatio: 1 / 100,
  maxRatio: 100 / 1,

  allowedChildren: [
    // image cannot have a children.
    {
      target: "*",
      allow: false,
    },
  ],
  allowedTypes: [
    {
      target: "*",
      allow: false,
    },
    {
      target: ReflectSceneNodeType.rectangle,
      allow: true,
    },
    {
      target: ReflectSceneNodeType.ellipse,
      allow: true,
    },
    {
      target: ReflectSceneNodeType.frame,
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
