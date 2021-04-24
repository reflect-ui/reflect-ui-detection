import {
  ReflectConstraintMixin,
  ReflectSceneNode,
} from "@bridged.xyz/design-sdk/lib/nodes";
import { constraints } from "@bridged.xyz/design-sdk";
import { HorizontalPlacementRule, PlacementRule } from "../rules";

export function checkIfValidPlacement(
  node: ReflectSceneNode,
  rule: PlacementRule,
  relativeTo?: ReflectSceneNode
): boolean {
  if (!node.parent) {
    // if node has no parent, cannot continue placement check process.
    return false;
  }

  if (!(node instanceof ReflectConstraintMixin)) {
    // if node is not constraintable, cannot continue placement check process.
    return false;
  }

  const isValidHorizontal = checkIfValidHorizontalPlacement(
    node,
    rule,
    relativeTo
  );

  // todo check vertical
  // isValidVertical
  return isValidHorizontal;
}

function checkIfValidHorizontalPlacement(
  node: ReflectConstraintMixin,
  rule: HorizontalPlacementRule,
  relativeTo?: ReflectSceneNode
): boolean {
  console.log("relative to lcrs", node.getRelativeToLcrs(relativeTo));
  const lcrs: constraints.LCRS = relativeTo
    ? node.getRelativeToLcrs(relativeTo)
    : node.relativeLcrs;
  const valid =
    (rule.horizontalCenter && lcrs == "Center") ||
    (rule.horizontalCenter && lcrs == "Stretch") ||
    (rule.horizontalLeft && lcrs == "Left") ||
    (rule.horizontalRight && lcrs == "Right");

  return valid;
}
