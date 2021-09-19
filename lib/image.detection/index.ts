import { ReflectSceneNode } from "@design-sdk/figma";
import { Figma } from "@design-sdk/figma-types";
import { DetectionResult } from "..";
import { checkIfValidSize, checkIfValidStructure } from "../processors";
import rule from "./image.rule";

/**
 * image detection, detects root image.
 *
 * throws when text is givven.
 *
 * Note:
 * - handled - multi fills with image fill on top
 * - handled - single fill with image fill
 * - not handled - image with opacity solid/gradient overlay.
 * @param shape
 * @returns
 */
export function detectIfImage(
  shape: ReflectSceneNode
): DetectionResult<Figma.ImagePaint> {
  const sizeValidation = checkIfValidSize(shape, rule);
  if (!sizeValidation.result) {
    return {
      result: false,
      reason: ["structure logic barrier failed", ...sizeValidation.reason],
      accuracy: 1,
      entity: "graphics.image",
    };
  }

  const structureValidation = checkIfValidStructure(shape, rule);
  if (!structureValidation.result) {
    return {
      result: false,
      reason: ["structure logic barrier failed", ...structureValidation.reason],
      accuracy: 1,
      entity: "graphics.image",
    };
  }

  // when can the fills can be mixed? -> This property can return figma.mixed if the node has multiple sets of fills. Text nodes can have multiple sets of fills if some characters are colored differently than others.
  // learn more at https://www.figma.com/plugin-docs/api/properties/nodes-fills/#docsNav
  // this can only happen when input is Text.
  // @ts-ignore
  if (shape.fills == Figma.figma.mixed) {
    // we cannot handle this case.
    throw "Cannot detect if the shape is in a image form since the input has a mixed fill. (are you givving text node as a input?)";
  }

  if (contains_one_or_more_image_fill(shape.fills)) {
    const is_clearly_a_single_and_only_image =
      is_single_fill_and_is_image(shape.fills) ||
      is_image_fill_on_top(shape.fills);

    if (is_clearly_a_single_and_only_image) {
      const image_fill = shape.fills[shape.fills.length - 1];
      return {
        result: true,
        entity: "graphics.image",
        accuracy: 1,
        reason: ["on top of the fill, the image is present."],
        data: image_fill as Figma.ImagePaint,
      };
    }
  } else {
    return {
      result: false,
      entity: "graphics.image",
      accuracy: 1,
      reason: ["no image available at all"],
    };
  }

  // default return.
  return {
    result: false,
    entity: "graphics.image",
    accuracy: 1,
    reason: ["unknown reason"],
  };
}

const contains_one_or_more_image_fill = (
  fills: ReadonlyArray<Figma.Paint>
): boolean => {
  return (
    is_not_empty_fill(fills) && fills.some((fill) => fill.type === "IMAGE")
  );
};

/**
 * when the fills has a single fill and the fill is image.
 * @param fills
 * @returns
 */
const is_single_fill_and_is_image = (fills: ReadonlyArray<Figma.Paint>) => {
  return is_single_fill(fills) && fills[0].type === "IMAGE";
};

/**
 * checks if the fills is single fill.
 * @param fills
 * @returns
 */
const is_single_fill = (fills: ReadonlyArray<Figma.Paint>): boolean => {
  return fills && fills.length === 1;
};

/**
 * if there are multiple fills and on the top of the fill, the type is image.
 * in figma, the top fill is the last in array.
 */
const is_image_fill_on_top = (fills: ReadonlyArray<Figma.Paint>): boolean => {
  return is_not_empty_fill(fills) && fills[fills.length - 1].type === "IMAGE";
};

/**
 * the fill is a valid array and contains at least one fill.
 * @param fills
 * @returns
 */
const is_not_empty_fill = (fills: ReadonlyArray<Figma.Paint>): boolean => {
  return fills && fills.length > 0;
};
