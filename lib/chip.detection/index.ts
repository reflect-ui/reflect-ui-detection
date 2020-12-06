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
import {ChipManifest} from "@reflect.bridged.xyz/core/lib/chip/chip.manifest";
import {checkIfValidSize} from "../processors/size.check";
import {checkIfValidName} from "../processors/name.check";
import rule from "./chip.rules"
import ruleBackGround from "./chip.backgound"
import ruleContent from "./chip.content"
import ruleLeading from "./chip.leading"
import ruleRear from "./chip.rear"
import {ReflectBaseNode, ReflectChildrenMixin, ReflectFrameNode, ReflectRectangleNode} from "@bridged.xyz/design-sdk/lib/nodes";
import {ReflectIconNode} from "../icon.detection";

const GRAND_CHILDREN_NO_MORE_THAN = 3;

export type ReflectChipBackGroundNode = ReflectFrameNode | ReflectRectangleNode | ReflectGroupNode
export type ReflectChipContent = ReflectTextNode | ReflectFrameNode
export type ReflectChipLeading = ReflectGroupNode | ReflectIconNode | ReflectRectangleNode | ReflectEllipseNode | ReflectFrameNode
export type ReflectChipRear = ReflectGroupNode | ReflectIconNode | ReflectRectangleNode | ReflectEllipseNode | ReflectFrameNode


export type DetectedChipManifest = ChipManifest< ReflectChipBackGroundNode, ReflectChipContent, ReflectChipLeading, ReflectChipRear>

export function detectIsChip(node: ReflectSceneNode): DetectionResult<DetectedChipManifest> {
    // region SLOTS
    let ContentSlotNode: ReflectChipContent
    let BackgroundSlotNode: ReflectChipBackGroundNode
    let LSlotNode: ReflectChipLeading
    let RSlotNode: ReflectChipRear
    // endregion SLOTS

    const nameValidationResult = checkIfValidName(node.name, rule)
    if (!nameValidationResult) {
        return {
            entity: "chip",
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
                entity: "chip",
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
        BackgroundSlotNode = grandchildren.find((n)=>checkIfValidName(n.name, ruleBackGround)) as ReflectChipBackGroundNode;
        ContentSlotNode = grandchildren.find((n)=>checkIfValidName(n.name, rule) ) as ReflectChipContent;
        LSlotNode = grandchildren.find((n)=>checkIfValidName(n.name, ruleLeading)) as ReflectChipLeading;
        RSlotNode = grandchildren.find((n)=>checkIfValidName(n.name, ruleRear)) as ReflectChipRear; 

    }
    return {
        entity: "chip",
        result: true,
        accuracy: 1,
        data: <DetectedChipManifest>{
            base: BackgroundSlotNode,
            content: ContentSlotNode,
            leading: LSlotNode,
            rear: RSlotNode
        },
        reason: [
            `all blocking logic passed.`
        ]
    }
}


