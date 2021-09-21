import { DetectedButtonIconData } from "../button-icon.detection";
import { DetectionResult } from "../index";
import { ChipManifest } from "@reflect-ui/core/lib/chip/chip.manifest";
import { checkIfValidName } from "../processors/name.check";
import rule from "./chip.rules";
import ruleBackGround from "./chip.backgound";
import ruleContent from "./chip.content";
import {
  ReflectSceneNode,
  ReflectTextNode,
  ReflectChildrenMixin,
  ReflectFrameNode,
  ReflectRectangleNode,
} from "@design-sdk/core";
import { detectIfIcon, DetectedIconData } from "../icon.detection";

const GRAND_CHILDREN_NO_MORE_THAN = 100;

export type ReflectChipBackGroundNode = ReflectFrameNode | ReflectRectangleNode;
export type ReflectChipContent = ReflectTextNode;
export type ReflectChipIcon = DetectedIconData;

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

  const iconNodes = findIconSlot(node);
  if (iconNodes.length === 1) {
    console.log(`icon inside button detected for ${node.toString()}`);
    RSlotNode = iconNodes[0] as DetectedButtonIconData;
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

  // RSlotNode might be undefined. we need explicit handling for this (@todo)
  var icon = undefined;
  // FIXME: chip l/r slot as icon detection disabled.
  //   RSlotNode?.getGrandchildren({ includeThis: true }).find((n) =>
  //   detectIfIcon(n)
  // ) as ReflectIconNode | undefined | null;

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
