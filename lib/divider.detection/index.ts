import {
  ReflectLineNode,
  ReflectRectangleNode,
  ReflectSceneNode,
} from "@design-sdk/core";
import { DividerManifest } from "@reflect-ui/core";
import { DetectionResult } from "..";
import { checkIfValidStructure } from "../processors/structure.check";
import rule from "./divider.rule";

// TODO: implement all
// TODO: block strocks with strockCap. - this cannot be a universal divider `node.strokeCap`
// TODO: this only detects the horizontal divider for now.
export function detectIfDivider(
  node: ReflectSceneNode
): DetectionResult<DividerManifest> {
  // TODO: migrate this to structure validator
  if (node.rotation !== 0) {
    return {
      result: false,
      entity: "divider",
      accuracy: 1,
      reason: [
        "the rotation of the divider cannot be else than 0°. (even -180°/180° is not allowed)",
      ],
    };
  }

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

  /// ----- sucess return with manifest -----
  let data: DividerManifest;
  if (node instanceof ReflectLineNode) {
    data = <DividerManifest>{
      height: _get_prefered_height(node.strokeWeight, node.height),
      thickness: node.strokeWeight,
      color: node.primaryColor,
      indent: 0,
      endIndent: 0,
    };
  } else if (node instanceof ReflectRectangleNode) {
    data = <DividerManifest>{
      height: _get_prefered_height(node.height),
      thickness: _get_prefered_height(node.height),
      color: node.primaryColor,
      indent: 0,
      endIndent: 0,
    };
  } else {
    // TODO:
    // - add component / instance / frame support

    const _FALLBACK_DATA: DividerManifest = {
      height: _get_prefered_height(node.height),
      thickness: _get_prefered_height(node.height),
      color: node.primaryColor,
      indent: 0,
      endIndent: 0,
    };
    data = _FALLBACK_DATA;
  }

  return {
    result: true,
    reason: ["all barrier passed"],
    entity: "divider",
    data: data,
    accuracy: 0.8,
  };
  /// ----- sucess return with manifest -----
}

const _MIN_DIVIDER_HEIGHT = rule.horizontal.minHeight;
const _MAX_DIVIDER_HEIGHT = rule.horizontal.maxHegith;

function _get_prefered_height(...initial_height: number[]): number {
  // the height cannot be 0. use a minimum value instead.
  // the height cannot be 0 or greater than the max value.
  return Math.max(
    Math.min(...initial_height, _MAX_DIVIDER_HEIGHT),
    _MIN_DIVIDER_HEIGHT
  );
}
