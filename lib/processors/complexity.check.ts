import { ReflectChildrenMixin, ReflectSceneNode } from "@design-sdk/figma-node";
import { CheckResult } from "..";
import { ComplexityRule } from "../rules";

export function checkIfValidComplexity(
  node: ReflectSceneNode,
  rule: ComplexityRule
): CheckResult {
  const reason: string[] = [];
  if (!(node instanceof ReflectChildrenMixin)) {
    reason.push(
      "no children containing node has been passeed, aboarting validation and returning success."
    );
    return {
      result: true,
      reason: reason,
    };
  }
  const childrenCount = node.children.length;
  const grandchildrenCount = node.grandchildren.length;

  // grandchild count
  const validMaxGrandchildrenCount =
    rule.maxTotalChildCount >= grandchildrenCount;
  if (!validMaxGrandchildrenCount) {
    reason.push(
      `validMaxGrandchildrenCount failed rule:actual=${rule.maxTotalChildCount}:${grandchildrenCount}`
    );
  }
  const validMinGrandchildrenCount =
    rule.minTotalChildCount <= grandchildrenCount;
  if (!validMinGrandchildrenCount) {
    reason.push(
      `validMinGrandchildrenCount failed rule:actual=${rule.minTotalChildCount}:${grandchildrenCount}`
    );
  }

  // color complexity
  // TODO
  // rule.minTotalColorCount

  const valid = validMaxGrandchildrenCount && validMinGrandchildrenCount;

  if (!valid) {
    return {
      result: false,
      reason: reason,
    };
  } else {
    return {
      result: true,
      reason: ["successfully passed complexity check"],
    };
  }
}
