import { ReflectSceneNode } from "@design-sdk/core/nodes";
import { DetectionResult } from "..";
import { checkIfValidStructure } from "../processors/structure.check";
import rule from "./divider.rule";

// TODO implement all
export function detectIfDivider(node: ReflectSceneNode): DetectionResult {
  // MUST BE a specified type to be recognized as a divider.
  const structureValidationResult = checkIfValidStructure(
    node,
    rule.horizontal
  );
  if (!structureValidationResult.result) {
    return {
      result: false,
      entity: "divider",
      accuracy: 1,
      reason: ["type did not matched to be a divider"],
    };
  }

  return {
    result: true,
    reason: ["all barrier passed"],
    entity: "divider",
    accuracy: 0.8,
  };
}
