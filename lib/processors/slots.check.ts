import { SceneNode } from "@bridged.xyz/design-sdk/lib/figma/types/v1";
import { SlotsRule } from "../rules";

export function checkIfSlotsValid(node: SceneNode, rule: SlotsRule): boolean {
  // we do not support slice node
  // if (node.type == "SLICE" || node.type == "VECTOR" || node.type == "STAR" || node.type == "LINE" || node.type == "ELLIPSE") {
  //     return true
  // }

  // node.children
  return true;
}
