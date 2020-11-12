import { ReflectFrameNode, ReflectRectangleNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { DetectionResult } from "..";

export function detectIfButtonBase(node: SceneNode): DetectionResult {
    if (node instanceof ReflectRectangleNode || node instanceof ReflectFrameNode) {

    } else {
        return {
            entity: "button.base",
            result: false,
            accuracy: 1,
            reason: ['button base does not match type. form of incapable of displaying fill']
        }
    }
}
