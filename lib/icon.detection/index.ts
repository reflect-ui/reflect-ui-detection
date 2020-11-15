import rule from "./icon.rules"
import { CheckResult, DetectionResult } from "..";
import { checkIfSquare } from "../processors/square.check";
import { checkIfValidSize } from "../processors/size.check";
import { checkIfValidName } from "../processors/name.check";
import { ReflectSceneNode } from '@bridged.xyz/design-sdk/lib/nodes'
import { checkIfValidStructure } from "../processors/structure.check";

export function detectIfIcon(node: ReflectSceneNode): DetectionResult {
    const name = node.name;

    // 1. size check
    const sizeValidationResult: CheckResult = checkIfValidSize(node, rule)
    if (!sizeValidationResult.result) {
        return {
            result: false,
            entity: "icon",
            accuracy: 1,
            reason: ['size validation failed', ...sizeValidationResult.reason]
        }
    }

    // 2. name check
    const isNameValid = checkIfValidName(name, rule)
    if (isNameValid) {
        return {
            result: true,
            entity: "icon",
            accuracy: 1
        }
    }


    // 3. square check
    const squareValidationResult: CheckResult = checkIfSquare(node)
    if (!squareValidationResult.result) {
        return {
            result: false,
            entity: "icon",
            accuracy: 1,
            reason: ['not a square', ...squareValidationResult.reason]
        }
    }


    const structureValidation = checkIfValidStructure(node, rule)
    if (!structureValidation.result) {
        return {
            result: false,
            entity: "icon",
            accuracy: 1,
            reason: ['structure validation fialed', ...structureValidation.reason]
        }
    }

    return {
        result: true,
        entity: "icon",
        accuracy: 0.5
    }
}
