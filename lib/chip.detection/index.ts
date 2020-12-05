import {ButtonManifest} from "@reflect.bridged.xyz/core";
import {ReflectButtonBaseNode} from "../button-base.detection";
import {ReflectButtonIconNode} from "../button-icon.detection";
import {DetectionResult} from "../index";
import {DetectedButtonManifest} from "../button.detection";
import {
    ReflectEllipseNode,
    ReflectGroupNode,
    ReflectSceneNode,
    ReflectSceneNodeType,
    ReflectTextNode
} from "@bridged.xyz/design-sdk/dist/nodes";
import {ChipManifest} from "@reflect.bridged.xyz/core/dist/chip";
import {checkIfValidSize} from "../processors/size.check";
import {checkIfValidName} from "../processors/name.check";
import rule from "./chip.rules"
import ruleBackGround from "./chip.backgound"
import ruleContent from "./chip.content"
import ruleLeading from "./chip.leading"
import ruleRear from "./chip.rear"
import {ReflectChildrenMixin, ReflectFrameNode, ReflectRectangleNode} from "@bridged.xyz/design-sdk/dist/lib/nodes";
import {ReflectIconNode} from "../icon.detection";

const GRAND_CHILDREN_NO_MORE_THAN = 3;

export type DetectedChipManifest = ChipManifest<ReflectTextNode, ReflectSceneNodeType, ReflectSceneNodeType, ReflectSceneNodeType>
export type ReflectChipBackGroundNode = ReflectFrameNode | ReflectRectangleNode | ReflectGroupNode
export type ReflectChipContent = ReflectTextNode | ReflectFrameNode
export type ReflectChipLeading = ReflectGroupNode | ReflectIconNode | ReflectRectangleNode | ReflectEllipseNode | ReflectFrameNode
export type ReflectChipRear = ReflectGroupNode | ReflectIconNode | ReflectRectangleNode | ReflectEllipseNode | ReflectFrameNode


export function ChipIfButton(node: ReflectSceneNode): DetectionResult<DetectedChipManifest> {
    // region SLOTS
    let ContentSlotNode: ReflectTextNode
    let BackgroundSlotNode: ReflectChipBackGroundNode
    let LSlotNode: ReflectChipLeading
    let RSlotNode: ReflectChipRear
    // endregion SLOTS

    const nameValidationResult = checkIfValidName(node.name, rule)
    if (!nameValidationResult) {
        return {
            entity: "button",
            result: false,
            accuracy: 1,
            reason: [
                `Worng Chip Name `
            ]
        }
    }
    if (node instanceof ReflectChildrenMixin) {
        const grandchildren = node.getGrandchildren({includeThis: true})
        if (grandchildren.length > GRAND_CHILDREN_NO_MORE_THAN) {
            return {
                entity: "button",
                result: false,
                accuracy: 1,
                reason: [
                    `this node contains more than ${GRAND_CHILDREN_NO_MORE_THAN} children in total (${grandchildren.length}), which is not a correct manifest for button composition`
                ]
            }
        }


        // ======================================
        // region slot
        //
        BackgroundSlotNode = grandchildren.find((n)=>checkIfValidName(n.name, ruleBackGround));
        ContentSlotNode = grandchildren.find((n)=>checkIfValidName(n.name, rule)&& n instanceof ReflectTextNode) as ReflectTextNode;
        LSlotNode = grandchildren.find((n)=>checkIfValidName(n.name, ruleLeading));
        RSlotNode = grandchildren.find((n)=>checkIfValidName(n.name, ruleRear));

    }
    return {
        entity: "button",
        result: true,
        accuracy: 1,
        data: <DetectedChipManifest>{
            background : BackgroundSlotNode,
            content : ContentSlotNode,
            leading : LSlotNode,
            trailing : RSlotNode,
            variant : "Chip"
        },
        reason: [
            `all blocking logic passed.`
        ]
    }
}


