import rule from "./icon.rules"
import { DetectionResult } from "..";
import { checkIfSquare } from "../processors/square.check";
import { checkIfValidSize } from "../processors/size.check";
import { checkIfValidName } from "../processors/name.check";
import { ReflectSceneNode } from '@bridged.xyz/design-sdk/lib/nodes'

export function detectIfIcon(node: ReflectSceneNode): DetectionResult {
    const name = node.name;
    console.warn(name)
    const isNameValid = checkIfValidName(name, rule)
    if (isNameValid) {
        return {
            result: true,
            entity: "icon",
            accuracy: 1
        }
    }

    const isValidSize = checkIfValidSize(node, rule)
    const isSquare = checkIfSquare(node)
    const isIcon = isValidSize && isSquare
    return {
        result: isIcon,
        entity: isIcon ? "icon" : "unknown",
        accuracy: 0.1
    }
}
