import { ReflectSceneNode } from "@design-sdk/core";
import { CheckResult } from "..";
import { SizingRule } from "../rules";

/**
 * check if the node matches the rule by iterating valid rule variables
 * @param node
 * @param rule
 */
export function checkIfValidSize(
  node: ReflectSceneNode,
  rule: SizingRule
): CheckResult {
  const ratio = node.width / node.height;

  const validMinSize: boolean = rule.minSize
    ? node.width >= rule.minSize && node.height >= rule.minSize
    : true;
  const validMaxSize: boolean = rule.maxSize
    ? node.width <= rule.maxSize && node.height <= rule.maxSize
    : true;

  const validMaxWidth: boolean = rule.maxWidth
    ? node.width <= rule.maxWidth
    : true;
  const validMaxHeight: boolean = rule.maxHegith
    ? node.height <= rule.maxHegith
    : true;

  const validMinWidth: boolean = rule.minWidth
    ? node.width >= rule.minWidth
    : true;
  const validMinHeight: boolean = rule.minHeight
    ? node.height >= rule.minHeight
    : true;

  const validMinRatio: boolean = rule.minRatio ? rule.minRatio <= ratio : true;
  const validMaxRatio: boolean = rule.maxRatio ? rule.maxRatio >= ratio : true;

  const validSize =
    // min max size
    validMinSize &&
    validMaxSize &&
    // min max w/h
    validMaxWidth &&
    validMaxHeight &&
    validMinWidth &&
    validMinHeight &&
    // min max ratio
    validMinRatio &&
    validMaxRatio;

  if (validSize) {
    return {
      result: true,
      reason: [`node size is valid`],
    };
  } else {
    const reasons = [];
    if (!validMinSize) {
      reasons.push(`node size is smaller than min size`);
    }
    if (!validMaxSize) {
      reasons.push(`node size is bigger than max size`);
    }
    if (!validMaxWidth) {
      reasons.push(`node width is bigger than max width`);
    }
    if (!validMaxHeight) {
      reasons.push(`node height is bigger than max height`);
    }
    if (!validMinWidth) {
      reasons.push(`node width is smaller than min width`);
    }
    if (!validMinHeight) {
      reasons.push(`node height is smaller than min height`);
    }
    if (!validMinRatio) {
      reasons.push(`node ratio is smaller than min ratio`);
    }
    if (!validMaxRatio) {
      reasons.push(`node ratio is bigger than max ratio`);
    }
    return {
      result: false,
      reason: reasons,
    };
  }
}
