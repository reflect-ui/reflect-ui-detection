import { DetectionResult } from "..";
import { checkIfValidNodeType } from "../rules/processors/node-type.check";
import rule from "./divider.rule"

export function detectIfDevider(node: SceneNode): DetectionResult {


    // MUST BE a specified type to be recognized as a divider.
    const isValidType = checkIfValidNodeType(node, rule);
    if (!isValidType) {
        return {
            result: false,
            entity: 'divider',
            accuracy: 1,
            reason: ['type did not matched to be a divider']
        }
    }



    throw 'not implemented'
}