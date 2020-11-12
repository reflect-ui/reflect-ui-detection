import { ReflectTextNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { DetectionResult } from "..";
import { checkIfValidText } from "../rules/processors/text.check";
import rule from "./button-text.rule"
export function detectIfValidButtonText(node: ReflectTextNode): DetectionResult {
    const result = checkIfValidText(node, rule)
    if (result === true) {
        return <DetectionResult>{
            result: true,
            accuracy: 0.8,
            reason: ['text passed all logic barriers'],
            entity: 'button.text'
        }
    }

    // validation failed
    return <DetectionResult>{
        result: false,
        accuracy: 1,
        reason: ['text did not passed all logic barriers'],
        entity: 'button.text'
    }
}