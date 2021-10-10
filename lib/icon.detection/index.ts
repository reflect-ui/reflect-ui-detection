import rule from "./icon.rules";
import { CheckResult, DetectionResult } from "..";
import { checkIfSquare } from "../processors/square.check";
import { checkIfValidSize } from "../processors/size.check";
import { checkIfValidName } from "../processors/name.check";
import { ReflectSceneNode } from "@design-sdk/core";
import { checkIfValidStructure } from "../processors/structure.check";
import { material_icon } from "./res/is_mdi";
import { IconManifest, NamedDefaultOssIconConfig } from "@reflect-ui/core";

export type DetectedIconData =
  | ({ type: "named" } & IconManifest<NamedDefaultOssIconConfig>)
  | ({ type: "design-node" } & IconManifest<ReflectSceneNode>);

export function detectIfIcon(
  node: ReflectSceneNode
): DetectionResult<DetectedIconData> {
  const name = node.name;
  const size = node.width;
  const color = node.primaryColor;

  // TODO: cleanup this image check
  for (const child of Array.from(node.grandchildren ?? [])) {
    if (child.images.length > 0) {
      return {
        result: false,
        entity: "icon",
        accuracy: 1,
        reason: ["input contains a image fill."],
      };
    }
  }

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
    // if is in valid name pattern, check if the icon is identifiable via its name and check in the registry.
    // e.g. find material icon name in name.

    // find material icon
    const _maybe_mdi = material_icon(name);
    if (_maybe_mdi) {
      return {
        result: true,
        entity: "icon",
        accuracy: 1,
        data: {
          type: "named",
          icon: _maybe_mdi,
          size: size,
          color: color,
        },
      };
    }

    return {
      result: true,
      entity: "icon",
      accuracy: 1,
      data: {
        type: "design-node",
        icon: node,
        size: size,
        color: color,
      },
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
    data: {
      type: "design-node",
      icon: node,
      size: size,
      color: color,
    },
  };
}
