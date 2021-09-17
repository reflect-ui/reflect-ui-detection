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

  return {
    result: validSize,
    reason: ["valid size check failed"],
  };
}
