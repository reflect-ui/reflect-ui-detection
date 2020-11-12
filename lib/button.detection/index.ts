import { ReflectChildrenMixin, ReflectFrameNode, ReflectGroupNode, ReflectRectangleNode, ReflectSceneNode, ReflectTextNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { ButtonManifest } from "@reflect.bridged.xyz/core/lib"
import { DetectionResult } from "..";
import { detectIfButtonBase, ReflectButtonBaseNode } from "../button-base.detection";
import { ReflectButtonIconNode } from "../button-icon.detection";
import { detectIfValidButtonText } from "../button-text.detection";
import { checkIfValidSize } from "../processors/size.check";
import { getSingle } from "../utils";
import rule from "./button.rules"

export type DetectedButtonManifest = ButtonManifest<ReflectButtonBaseNode, ReflectTextNode, ReflectButtonIconNode>


const GRAND_CHILDREN_NO_MORE_THAN = 5 // todo -> move this logic to rules interface field
export function detectIfButton(node: ReflectSceneNode): DetectionResult<DetectedButtonManifest> {

    // region SLOTS
    let buttonTextSlotNode: ReflectTextNode
    let buttonBaseSlotNode: ReflectButtonBaseNode
    let buttonIconSlotNode: ReflectButtonIconNode
    // endregion SLOTS


    // run rule based first
    const sizeValidationResult = checkIfValidSize(node, rule)
    const isNotButton = !sizeValidationResult.result
    if (isNotButton) {
        return {
            entity: "button",
            result: false,
            accuracy: 1,
            reason: [
                `this node coul't pass logic barrier`,
                ...sizeValidationResult.reason
            ]
        }
    }


    if (node instanceof ReflectChildrenMixin) {
        const childrenLen = node.children.length
        const grandchildren = mapGrandchildren(node, {
            includeThis: true
        })

        if (grandchildren.length > GRAND_CHILDREN_NO_MORE_THAN) {
            return {
                entity: "button",
                result: false,
                accuracy: 1,
                reason: [
                    `this node contains more than ${GRAND_CHILDREN_NO_MORE_THAN} children in total, which is not a correct manifest for button composition`
                ]
            }
        }

        // ======================================
        // region slot:base
        //
        const baseCandidateNodes: Array<ReflectButtonBaseNode> = grandchildren.filter((n) => {
            return (n instanceof ReflectFrameNode) || (n instanceof ReflectRectangleNode)
        }) as Array<ReflectButtonBaseNode>

        const buttonBaseDetectionResult = detectIfButtonBase(baseCandidateNodes)
        if (!buttonBaseDetectionResult.result) {
            return {
                entity: "button",
                result: false,
                accuracy: 1,
                reason: [
                    'this node does not contains any base slot for the button manifest',
                    ...buttonBaseDetectionResult.reason
                ]
            }
        } else {
            buttonBaseSlotNode = buttonBaseDetectionResult.data
        }


        //
        // endregion slot:base
        //======================================



        // ======================================
        // region process slot:text
        //

        const textNodes: Array<ReflectTextNode> = grandchildren.filter((c) => {
            return c instanceof ReflectTextNode
        }) as Array<ReflectTextNode>
        const textNodesCount = textNodes.length
        if (textNodesCount !== 1) {
            return {
                entity: "button",
                result: false,
                accuracy: 1,
                reason: [
                    `this node contains ${textNodesCount} text slots, button requires exactly 1 text slot.`
                ]
            }
        }

        buttonTextSlotNode = getSingle<ReflectTextNode>(textNodes)
        const textSlotDetectionResult = detectIfValidButtonText(buttonTextSlotNode, buttonBaseSlotNode)
        if (!textSlotDetectionResult.result) {
            return {
                entity: "button",
                result: false,
                accuracy: 1,
                reason: [
                    `this node contains single text, but the text validation for button text slot is failed.`,
                    ...textSlotDetectionResult.reason
                ]
            }
        }

        //
        // endregion process slot:text
        // ======================================


    } else {
        return {
            entity: "button",
            result: false,
            accuracy: 1,
            reason: [
                'this node does not contains any children, which is not a correct manifest for button composition'
            ]
        }
    }


    return {
        entity: "button",
        result: true,
        accuracy: 1,
        data: <DetectedButtonManifest>{
            text: buttonTextSlotNode,
            base: buttonBaseSlotNode,
            icon: buttonIconSlotNode
        },
        reason: [
            `all blocking logic passed.`
        ]
    }
}


function mapGrandchildren(node: ReflectChildrenMixin, options?: {
    includeThis?: boolean
}): Array<ReflectSceneNode> {
    const children: Array<ReflectSceneNode> = []

    // if includeThis option enabled, add this.
    if (options?.includeThis) {
        children.push(node)
    }

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