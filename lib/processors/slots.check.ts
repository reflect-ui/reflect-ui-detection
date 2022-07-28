import type { SceneNode } from "@design-sdk/figma-types";
import { SlotsRule } from "../rules";

export function checkIfSlotsValid(node: SceneNode, rule: SlotsRule): boolean {
  // we do not support slice node
  // if (node.type == "SLICE" || node.type == "VECTOR" || node.type == "STAR" || node.type == "LINE" || node.type == "ELLIPSE") {
  //     return true
  // }

  // node.children
  return true;
}
