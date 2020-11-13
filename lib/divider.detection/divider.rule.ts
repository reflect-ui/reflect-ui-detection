import { ReflectSceneNodeType } from "@bridged.xyz/design-sdk/lib/nodes";
import { DetectionRule } from "../rules";

export default <DetectionRule>{
    allowedTypes: [
        {
            target: ReflectSceneNodeType.line,
            allow: true
        },
        {
            target: ReflectSceneNodeType.rectangle,
            allow: true
        },
        {
            target: ReflectSceneNodeType.component,
            allow: true
        },
        {
            target: ReflectSceneNodeType.instance,
            allow: true
        },
    ],
    maxHegith: 4,
    minHeight: 0,
    minWidth: 248,
    maxWidth: 1080,
}