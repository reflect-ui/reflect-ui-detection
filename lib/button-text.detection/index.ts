import { ReflectTextNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { DetectionResult } from "..";
import { ReflectButtonBaseNode } from "../button-base.detection";
import { checkIfValidPlacement } from "../processors/placement.check";
import { checkIfValidText } from "../processors/text.check";
import { PlacementRule, TextRule } from "../rules";
import rule from "./button-text.rule"
import { rgbTo8hex } from "@reflect.bridged.xyz/uiutils/lib"
import tinycolor from "tinycolor2"


export function detectIfValidButtonText(node: ReflectTextNode, base: ReflectButtonBaseNode): DetectionResult {
    const textValidation = checkIfValidText(node, rule as TextRule)
    if (!textValidation.result) {
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

    // todo - use this
    const bgColor = rgbTo8hex(base.primaryColor, base.primaryColor.a)
    const textColor = rgbTo8hex(node.primaryColor, node.primaryColor.a)
    const readability = tinycolor.readability(bgColor, textColor)
    const size: "large" | "small" = (node.fontSize as number) >= 18 ? 'large' : 'small'
    const isWcagReadable = tinycolor.isReadable(bgColor, textColor, { level: "AA", size: size })

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