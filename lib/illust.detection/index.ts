import { ReflectFrameNode, ReflectSceneNode } from "@design-sdk/core/nodes";
import { DetectionResult } from "..";
import { checkIfValidComplexity } from "../processors/complexity.check";
import { checkIfValidSize } from "../processors/size.check";
import { checkIfValidStructure } from "../processors/structure.check";
import rule from "./illust.rule";

export function detectIfIllust(
  node: ReflectSceneNode
): DetectionResult<ReflectFrameNode> {
  const sizeValidation = checkIfValidSize(node, rule);
  if (!sizeValidation.result) {
    return {
      result: false,
      reason: ["structure logic barrier failed", ...sizeValidation.reason],
      accuracy: 1,
      entity: "graphics.illust",
    };
  }

  const structureValidation = checkIfValidStructure(node, rule);
  if (!structureValidation.result) {
    return {
      result: false,
      reason: ["structure logic barrier failed", ...structureValidation.reason],
      accuracy: 1,
      entity: "graphics.illust",
    };
  }

  const complexityValidation = checkIfValidComplexity(node, rule);
  if (!complexityValidation.result) {
    return {
      result: false,
      reason: [
        "complexity logic barrier failed",
        ...complexityValidation.reason,
      ],
      accuracy: 1,
      entity: "graphics.illust",
    };
  }

  return {
    result: true,
    reason: ["all logic barrier passed"],
    accuracy: 0.8,
    entity: "graphics.illust",
  };
}
