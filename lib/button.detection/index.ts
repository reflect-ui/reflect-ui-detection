import { ReflectChildrenMixin, ReflectFrameNode, ReflectGroupNode, ReflectSceneNode, ReflectTextNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { DetectionResult } from "..";
import { checkIfValidSize } from "../rules/processors/size.check";
import rule from "./button.rules"

const GRAND_CHILDREN_NO_MORE_THAN = 5
export function detectIfButton(node: ReflectSceneNode): DetectionResult {
    // run rule based first
    const isValidSize = checkIfValidSize(node, rule)
    const isNotButton = !isValidSize
    if (isNotButton) {
        return {
            entity: "Button",
            result: false,
            accuracy: 1,
            reason: [
                `this node coul't pass logic barrier`
            ]
        }
    }
    //



    if (node instanceof ReflectChildrenMixin) {
        const childrenLen = node.children.length
        const grandchildren = mapGrandchildren(node)
        console.log('grandchildren', grandchildren)


        if (grandchildren.length > GRAND_CHILDREN_NO_MORE_THAN) {
            return {
                entity: "Button",
                result: false,
                accuracy: 1,
                reason: [
                    `this node contains more than ${GRAND_CHILDREN_NO_MORE_THAN} children in total, which is not a correct manifest for button composition`
                ]
            }
        }


        const textNodeCount = grandchildren.filter((c) => {
            return c instanceof ReflectTextNode
        }).length
        if (textNodeCount !== 1) {
            return {
                entity: "Button",
                result: false,
                accuracy: 1,
                reason: [
                    `this node contains ${textNodeCount} text slots, button requires exactly 1 text slot.`
                ]
            }
        }


    } else {
        return {
            entity: "Button",
            result: false,
            accuracy: 1,
            reason: [
                'this node does not contains any children, which is not a correct manifest for button composition'
            ]
        }
    }


    return {
        entity: "Button",
        result: true,
        accuracy: 1,
        reason: [
            `all blocking logic passed.`
        ]
    }
}



function mapGrandchildren(node: ReflectChildrenMixin): Array<ReflectSceneNode> {
    const children: Array<ReflectSceneNode> = []
    for (const child of node.children) {
        if (child instanceof ReflectChildrenMixin) {
            const grandchildren = mapGrandchildren(child)
            children.push(...grandchildren)
        }

        // frame can be also a child, but not group. group only holds children, so we do not push group nodes
        if (!(child instanceof ReflectGroupNode)) {
            children.push(child)
        }
    }

    return children
}