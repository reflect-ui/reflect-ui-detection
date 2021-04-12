import { ButtonManifest } from "@reflect-ui/core";
import { ReflectButtonBaseNode } from "../button-base.detection";
import { ReflectButtonIconNode } from "../button-icon.detection";
import { DetectionResult } from "../index";
import { DetectedButtonManifest } from "../button.detection";
import {
  ReflectEllipseNode,
  ReflectGroupNode,
  ReflectSceneNode,
  ReflectSceneNodeType,
  ReflectTextNode,
} from "@bridged.xyz/design-sdk/lib/nodes";
import { ChipManifest } from "@reflect-ui/core/lib/chip/chip.manifest";
import { checkIfValidSize } from "../processors/size.check";
import { checkIfValidName } from "../processors/name.check";
import rule from "./chip.rules";
import ruleBackGround from "./chip.backgound";
import ruleContent from "./chip.content";
import ruleLeading from "./chip.leading";
import ruleRear from "./chip.rear";
import {
  ReflectBaseNode,
  ReflectChildrenMixin,
  ReflectFrameNode,
  ReflectRectangleNode,
} from "@bridged.xyz/design-sdk/lib/nodes";
import { detectIfIcon, ReflectIconNode } from "../icon.detection";

const GRAND_CHILDREN_NO_MORE_THAN = 100;

export type ReflectChipBackGroundNode = ReflectFrameNode | ReflectRectangleNode;
export type ReflectChipContent = ReflectTextNode;
export type ReflectChipIcon = ReflectIconNode;

export type DetectedChipManifest = ChipManifest<
  ReflectChipBackGroundNode,
  ReflectChipContent,
  ReflectChipIcon,
  ReflectChipIcon
>;

export function detectIfChip(
  node: ReflectSceneNode
): DetectionResult<DetectedChipManifest> {
  // region SLOTS

  let ContentSlotNode: ReflectChipContent;
  let BackgroundSlotNode: ReflectChipBackGroundNode;
  let LSlotNode: ReflectChipIcon;
  let RSlotNode: ReflectChipIcon;
  // endregion SLOTS

  const nameValidationResult = checkIfValidName(node.name, rule);
  if (!nameValidationResult) {
    return {
      entity: "chip",
      result: false,
      accuracy: 1,
      reason: [`Worng Chip Name ${node.name}`],
    };
  }
  if (node instanceof ReflectChildrenMixin) {
    const grandchildren = node.getGrandchildren({ includeThis: true });
    if (grandchildren.length > GRAND_CHILDREN_NO_MORE_THAN) {
      return {
        entity: "chip",
        result: false,
        accuracy: 1,
        reason: [
          `this node contains more than ${GRAND_CHILDREN_NO_MORE_THAN} children in total (${grandchildren.length}), which is not a correct manifest for button composition`,
        ],
      };
    }

    // ======================================
    // region slot
    //

    BackgroundSlotNode = grandchildren.find((n) =>
      checkIfValidName(n.name, ruleBackGround)
    ) as ReflectChipBackGroundNode;
    ContentSlotNode = grandchildren.find((n) =>
      checkIfValidName(n.name, ruleContent)
    ) as ReflectChipContent;
  }
  function findIconSlot(
    on: ReflectSceneNode
  ): Array<ReflectButtonIconNode> | undefined {
    const detections: Array<ReflectButtonIconNode> = [];
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

  const iconNodes = findIconSlot(node);
  if (iconNodes.length === 1) {
    console.log(`icon inside button detected for ${node.toString()}`);
    RSlotNode = iconNodes[0] as ReflectButtonIconNode;
  } else if (iconNodes.length === 0) {
    // do nothing. this must be non-icon button
  } else {
    return {
      entity: "chip",
      result: false,
      accuracy: 1,
      reason: [
        `this node contains ${iconNodes.length} icon slots, chip requires exactly 0 or 2 icon slot.`,
      ],
    };
  }
  var icon = RSlotNode.getGrandchildren({ includeThis: true }).find((n) =>
    detectIfIcon(n)
  ) as ReflectIconNode | undefined | null;

  if (icon) {
    RSlotNode = icon;
  }

  return {
    entity: "chip",
    result: true,
    accuracy: 1,
    data: <DetectedChipManifest>{
      base: BackgroundSlotNode,
      content: ContentSlotNode,
      leading: LSlotNode,
      trailing: RSlotNode,
    },
    reason: [`all blocking logic passed.`],
  };
}
