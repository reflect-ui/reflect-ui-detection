import { ReflectSceneNode } from "@design-sdk/figma-node";
import { CheckResult } from "..";

export function checkIfSquare(node: ReflectSceneNode): CheckResult {
  const SQUARE_SAFE_DIFF_RANGE = 0.2;
  const isSquare = Math.abs(node.width - node.height) < SQUARE_SAFE_DIFF_RANGE;

  return {
    result: isSquare,
    reason: ["check if square"],
  };
}
