import { ReflectSceneNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { DetectionResult } from "..";
import { checkIfRoot } from "../processors/root.check";
import { checkIfValidSize } from "../processors/size.check";
import rule from "./screen.rule"

export function detectIfScreen(node: ReflectSceneNode): DetectionResult {

    const isRootFrame = checkIfRoot(node)
    const sizeValidationResult = checkIfValidSize(node, rule)

    const isScreen = isRootFrame && sizeValidationResult.result

    return <DetectionResult>{
        result: isScreen,
        entity: "screen",
        accuracy: 0.5
    }
}