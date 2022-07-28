import {
  ReflectChildrenMixin,
  ReflectFrameNode,
  ReflectRectangleNode,
  ReflectSceneNode,
  ReflectTextNode,
} from "@design-sdk/figma-node";
import { ButtonManifest } from "@reflect-ui/core";
import { DetectionResult } from "..";
import {
  detectIfButtonBase,
  ReflectButtonBaseNode,
} from "../button-base.detection";
import { DetectedButtonIconData } from "../button-icon.detection";
import { detectIfValidButtonText } from "../button-text.detection";
import { detectIfIcon } from "../icon.detection";
import { checkIfValidSize } from "../processors/size.check";
import { getSingle } from "../utils";
import rule from "./button.rules";

export type DetectedButtonManifest = ButtonManifest<
  ReflectButtonBaseNode,
  ReflectTextNode,
  DetectedButtonIconData
>;

const GRAND_CHILDREN_NO_MORE_THAN = 10; // todo -> move this logic to rules interface field
export function detectIfButton(
  node: ReflectSceneNode
): DetectionResult<DetectedButtonManifest> {
  // region SLOTS
  let buttonTextSlotNode: ReflectTextNode;
  let buttonBaseSlotNode: ReflectButtonBaseNode;
  let buttonIconSlotNode: DetectedButtonIconData;
  // endregion SLOTS

  // run rule based first
  const sizeValidationResult = checkIfValidSize(node, rule);
  const isNotButton = !sizeValidationResult.result;
  if (isNotButton) {
    return {
      entity: "button",
      result: false,
      accuracy: 1,
      reason: [
        `this node coul't pass logic barrier`,
        ...sizeValidationResult.reason,
      ],
    };
  }

  if (node instanceof ReflectChildrenMixin) {
    const grandchildren = node.getGrandchildren({ includeThis: true });

    if (grandchildren.length > GRAND_CHILDREN_NO_MORE_THAN) {
      return {
        entity: "button",
        result: false,
        accuracy: 1,
        reason: [
          `this node contains more than ${GRAND_CHILDREN_NO_MORE_THAN} children in total (${grandchildren.length}), which is not a correct manifest for button composition`,
        ],
      };
    }

    // ======================================
    // region slot:base
    //
    const baseCandidateNodes: Array<ReflectButtonBaseNode> =
      grandchildren.filter((n) => {
        return (
          n instanceof ReflectFrameNode || n instanceof ReflectRectangleNode
        );
      }) as Array<ReflectButtonBaseNode>;

    const buttonBaseDetectionResult = detectIfButtonBase(
      node,
      baseCandidateNodes
    );
    if (!buttonBaseDetectionResult.result) {
      return {
        entity: "button",
        result: false,
        accuracy: 1,
        reason: [
          "this node does not contains any base slot for the button manifest",
          ...buttonBaseDetectionResult.reason,
        ],
      };
    } else {
      buttonBaseSlotNode = buttonBaseDetectionResult.data;
    }

    //
    // endregion slot:base
    //======================================

    // ======================================
    // region process slot:icon
    //

    // const iconNodes: Array<ReflectBaseNode> = grandchildren.filter((c) => {
    //     const detection = detectIfIcon(c)
    //     return detection.result
    // }) as Array<ReflectTextNode>
    const iconNodes = findIconSlot(node);
    if (iconNodes.length === 1) {
      buttonIconSlotNode = iconNodes[0] as DetectedButtonIconData;
    } else if (iconNodes.length === 0) {
      // do nothing. this must be non-icon button
    } else {
      return {
        entity: "button",
        result: false,
        accuracy: 1,
        reason: [
          `this node contains ${iconNodes.length} icon slots, button requires exactly 0 or 1 icon slot.`,
        ],
      };
    }

    //
    // endregion slot:icon
    //======================================

    // ======================================
    // region process slot:text
    //

    const textNodes: Array<ReflectTextNode> = grandchildren.filter((c) => {
      return c instanceof ReflectTextNode;
    }) as Array<ReflectTextNode>;
    const textNodesCount = textNodes.length;
    if (textNodesCount !== 1) {
      return {
        entity: "button",
        result: false,
        accuracy: 1,
        reason: [
          `this node contains ${textNodesCount} text slots, button requires exactly 1 text slot.`,
        ],
      };
    }

    buttonTextSlotNode = getSingle<ReflectTextNode>(textNodes);
    const textSlotDetectionResult = detectIfValidButtonText(
      buttonTextSlotNode,
      buttonBaseSlotNode,
      buttonIconSlotNode
    );
    if (!textSlotDetectionResult.result) {
      return {
        entity: "button",
        result: false,
        accuracy: 1,
        reason: [
          `this node contains single text, but the text validation for button text slot is failed.`,
          ...textSlotDetectionResult.reason,
        ],
      };
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
        "this node does not contains any children, which is not a correct manifest for button composition",
      ],
    };
  }

  return {
    entity: "button",
    result: true,
    accuracy: 1,
    data: <DetectedButtonManifest>{
      text: buttonTextSlotNode,
      base: buttonBaseSlotNode,
      icon: buttonIconSlotNode,
    },
    reason: [`all blocking logic passed.`],
  };
}

function findIconSlot(
  on: ReflectSceneNode
): Array<DetectedButtonIconData> | undefined {
  const detections: Array<DetectedButtonIconData> = [];
  const detection = detectIfIcon(on);
  if (detection.result) {
    detections.push(detection.data);
  } else {
    if (on instanceof ReflectChildrenMixin) {
      on.children.forEach((child) => {
        detections.push(...findIconSlot(child));
      });
    }
  }
  return detections;
}
