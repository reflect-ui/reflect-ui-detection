import type { ReflectSceneNode, ReflectTextNode } from "@design-sdk/figma-node";
import { paintToColor } from "@design-sdk/figma-utils";
import tinycolor, { ColorFormats } from "tinycolor2";
import type { DetectionResult } from "../detect";
export function detectIfPlaceholderText(
  root: ReflectSceneNode,
  text: ReflectTextNode
): DetectionResult<ReflectTextNode> {
  const _bg =
    root.primaryFill.type == "SOLID"
      ? _1_to_255(paintToColor(root.primaryFill))
      : { r: 0, g: 0, b: 0, a: 0 };
  const _tc = _1_to_255(text.textStyle.color);

  const contrasst = tinycolor.readability(
    _bg as ColorFormats.RGBA,
    _tc as ColorFormats.RGBA
  );

  // TODO: the 3 is a static value for now. we need more accurate way to handle this.
  if (contrasst <= 3) {
    return {
      result: true,
      entity: "text-field.placeholder",
      accuracy: 0.8,
      data: text,
      reason: ["the text does not have enought contrast to be a value text."],
    };
  }

  return {
    result: false,
    entity: "text-field.placeholder",
    accuracy: 1,
    reason: ["no rules passed to be a placeholder text."],
  };
}

const _1_to_255 = (rgba) => {
  return {
    r: rgba.r * 255,
    g: rgba.g * 255,
    b: rgba.b * 255,
    a: rgba.a,
  };
};
