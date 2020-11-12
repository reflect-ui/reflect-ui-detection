import { ReflectTextNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { DetectionResult } from "..";
import { ReflectButtonBaseNode } from "../button-base.detection";
import { checkIfValidPlacement } from "../processors/placement.check";
import { checkIfValidText } from "../processors/text.check";
import { PlacementRule, TextRule } from "../rules/rule.base";
import rule from "./button-text.rule"
import tinycolor from "tinycolor2"


export function detectIfValidButtonText(node: ReflectTextNode, base: ReflectButtonBaseNode): DetectionResult {
    const textValidation = checkIfValidText(node, rule as TextRule)
    if (!textValidation) {
        return <DetectionResult>{
            result: false,
            accuracy: 1,
            reason: ['text did not pass text manifest validation'],
            entity: 'button.text'
        }
    }


    const placementValidation = checkIfValidPlacement(node, rule as PlacementRule)
    if (!placementValidation) {
        return <DetectionResult>{
            result: false,
            accuracy: 1,
            reason: ['text did not pass text placement validation'],
            entity: 'button.text'
        }
    }



    // ===========================
    // region text readability
    //
    // TODO ----->> FIXME
    const readability = tinycolor.readability(base.primaryColor, node.primaryColor)
    const readabilityreverse = tinycolor.readability(node.primaryColor, base.primaryColor)
    console.warn('readability', readability, readabilityreverse, node.name)
    console.warn('base', base.primaryColor, base.name)
    console.warn('text', node.primaryColor, node.name)
    console.warn('is readable', tinycolor.isReadable(base.primaryColor, node.primaryColor, { level: "AA" }))
    //
    // endregion 
    // ===========================


    // validation success
    return <DetectionResult>{
        result: true,
        accuracy: 0.8,
        reason: ['text passed all logic barriers'],
        entity: 'button.text'
    }
}