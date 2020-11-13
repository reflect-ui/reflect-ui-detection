import rule from "./icon.rules"
import { CheckResult, DetectionResult } from "..";
import { checkIfSquare } from "../processors/square.check";
import { checkIfValidSize } from "../processors/size.check";
import { checkIfValidName } from "../processors/name.check";
import { ReflectSceneNode } from '@bridged.xyz/design-sdk/lib/nodes'

export function detectIfIcon(node: ReflectSceneNode): DetectionResult {
    const name = node.name;
    const isNameValid = checkIfValidName(name, rule)
    if (isNameValid) {
        return {
            result: true,
            entity: "icon",
            accuracy: 1
        }
    }

    const sizeValidationResult: CheckResult = checkIfValidSize(node, rule)
    const squareValidationResult: CheckResult = checkIfSquare(node)
    const isIcon = sizeValidationResult.result && squareValidationResult.result
    return {
        result: isIcon,
        entity: isIcon ? "icon" : "unknown",
        accuracy: 0.1
    }
}
