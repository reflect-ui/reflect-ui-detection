import { ReflectFrameNode, ReflectSceneNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { DetectionResult } from "..";
import { checkIfValidComplexity } from "../processors/complexity.check";
import { checkIfValidStructure } from "../processors/structure.check";
import rule from "./illust.rule"

export function detectIfIllust(node: ReflectSceneNode): DetectionResult<ReflectFrameNode> {
    const structureValidation = checkIfValidStructure(node, rule)
    if (!structureValidation.result) {
        return {
            result: false,
            reason: [
                'structure logic barrier failed',
                ...structureValidation.reason,
            ],
            accuracy: 1,
            entity: 'graphics.illust'
        }
    }

    const complexityValidation = checkIfValidComplexity(node, rule)
    if (!complexityValidation.result) {
        return {
            result: false,
            reason: [
                'complexity logic barrier failed',
                ...complexityValidation.reason,
            ],
            accuracy: 1,
            entity: 'graphics.illust'
        }
    }


    return {
        result: true,
        reason: ['all logic barrier passed'],
        accuracy: 0.8,
        entity: 'graphics.illust'
    }
}