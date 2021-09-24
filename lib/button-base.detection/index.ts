import {
  ReflectFrameNode,
  ReflectRectangleNode,
  ReflectSceneNode,
  ReflectSceneNodeType,
} from "@design-sdk/core";
import { DetectionResult } from "..";
import { getSingle } from "../utils";

export type ReflectButtonBaseNode = ReflectFrameNode | ReflectRectangleNode;

const allowedTypes: ReadonlyArray<ReflectSceneNodeType> = [
  ReflectSceneNodeType.rectangle,
  ReflectSceneNodeType.frame,
  ReflectSceneNodeType.instance,
];
export function detectIfButtonBase(
  root: ReflectSceneNode,
  maybeNodes: ReflectButtonBaseNode | Array<ReflectButtonBaseNode>
): DetectionResult<ReflectButtonBaseNode> {
  let node: ReflectButtonBaseNode;
  if (Array.isArray(maybeNodes)) {
    const availableNodes = maybeNodes.filter((n) => {
      // explicit type check.
      // todo -> this should be handled on ReflectBaseNode conversion side.
      if (!allowedTypes.includes(n.origin)) {
        return false;
      }

      // size check - TODO (make it modular)

      // WIDTH
      const biggerW = Math.max(root.width, n.width);
      const smallerW = Math.min(root.width, n.width);
      const diffW = smallerW / biggerW;
      const validWidthDiff = diffW > 0.8;
      // console.log("validWidthDiff", diffW, validWidthDiff);
      if (!validWidthDiff) {
        return false;
      }

      // HEIGHT
      const biggerH = Math.max(root.height, n.height);
      const smallerH = Math.min(root.height, n.height);
      const diffH = smallerH / biggerH;
      const validHeightDiff = diffH > 0.9;
      // console.log("validHeightDiff", diffH, validHeightDiff);
      if (!validHeightDiff) {
        return false;
      }

      // 1. has fill or outline
      // 2. is visible
      const hsaVisibleStroke = n.strokes.length > 0 && n.strokeWeight > 0;
      return n.visible && (hsaVisibleStroke || n.hasVisibleFills);
    });
    // console.log("availableNodes", availableNodes);

    if (availableNodes.length == 0) {
      return {
        entity: "button.base",
        result: false,
        accuracy: 1,
        reason: ["no visible button base usage found"],
      };
    } else if (availableNodes.length >= 2) {
      console.log(`more than 2 button base used`, availableNodes);
      return {
        entity: "button.base",
        result: false,
        accuracy: 1,
        reason: [
          "more than 2 visible button base usage found. only single usage is accepted.",
        ],
      };
    } else {
      node = getSingle(availableNodes);
    }
  }

  return {
    entity: "button.base",
    result: true,
    accuracy: 1,
    reason: ["all logic barrier passed."],
    data: node,
  };
}
