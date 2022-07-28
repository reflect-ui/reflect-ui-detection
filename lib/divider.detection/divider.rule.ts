import { ReflectSceneNodeType } from "@design-sdk/figma-node";
import { DetectionRule } from "../rules";

export default {
  vertical: <DetectionRule>{
    allowedTypes: [
      {
        target: ReflectSceneNodeType.line,
        allow: true,
      },
      {
        target: ReflectSceneNodeType.rectangle,
        allow: true,
      },
      {
        target: ReflectSceneNodeType.component,
        allow: true,
      },
      {
        target: ReflectSceneNodeType.instance,
        allow: true,
      },
    ],
    maxHegith: Number.POSITIVE_INFINITY,
    minHeight: 24,
    minWidth: 0,
    maxWidth: 4,
  },
  horizontal: <DetectionRule>{
    allowedTypes: [
      {
        target: ReflectSceneNodeType.line,
        allow: true,
      },
      {
        target: ReflectSceneNodeType.rectangle,
        allow: true,
      },
      {
        target: ReflectSceneNodeType.component,
        allow: true,
      },
      {
        target: ReflectSceneNodeType.instance,
        allow: true,
      },
    ],
    maxHegith: 4,
    minHeight: 0,
    minWidth: 248,
    maxWidth: 1080,
  },
};
