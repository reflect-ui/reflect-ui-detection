import rule from "./icon.rules";
import { CheckResult, DetectionResult } from "..";
import { checkIfSquare } from "../processors/square.check";
import { checkIfValidSize } from "../processors/size.check";
import { checkIfValidName } from "../processors/name.check";
import {
  ReflectFrameNode,
  ReflectGroupNode,
  ReflectSceneNode,
} from "@design-sdk/core/nodes";
import { checkIfValidStructure } from "../processors/structure.check";

export type ReflectIconNode = ReflectFrameNode | ReflectGroupNode;

export function detectIfIcon(
  node: ReflectSceneNode
): DetectionResult<ReflectIconNode> {
  const name = node.name;

  // 1. size check
  const sizeValidationResult: CheckResult = checkIfValidSize(node, rule);
  if (!sizeValidationResult.result) {
    return {
      result: false,
      entity: "icon",
      accuracy: 1,
      reason: ["size validation failed", ...sizeValidationResult.reason],
    };
  }

  // 2. name check
  const isNameValid = checkIfValidName(name, rule);
  if (isNameValid) {
    return {
      result: true,
      entity: "icon",
      accuracy: 1,
      data: node as ReflectIconNode,
    };
  }

  // 3. square check
  const squareValidationResult: CheckResult = checkIfSquare(node);
  if (!squareValidationResult.result) {
    return {
      result: false,
      entity: "icon",
      accuracy: 1,
      reason: ["not a square", ...squareValidationResult.reason],
    };
  }

  const structureValidation = checkIfValidStructure(node, rule);
  if (!structureValidation.result) {
    return {
      result: false,
      entity: "icon",
      accuracy: 1,
      reason: ["structure validation fialed", ...structureValidation.reason],
    };
  }

  return {
    result: true,
    entity: "icon",
    accuracy: 0.5,
    data: node as ReflectIconNode,
  };
}
