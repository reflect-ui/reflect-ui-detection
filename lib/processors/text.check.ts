import { FontName, LetterSpacing } from "@design-sdk/figma";
import { ReflectTextNode } from "@design-sdk/core";
import { TextAlign } from "@reflect-ui/core/lib/text-align/text-align.manifest";
import { CheckResult } from "..";
import { TextRule } from "../rules";

export function checkIfValidText(
  node: ReflectTextNode,
  rule: TextRule
): CheckResult {
  const fontSize = node.fontSize as number;
  const characters = node.text;
  const words = characters.split(" ");
  const lines = naiveTextLines({
    width: node.width,
    fontSize: fontSize,
    height: node.height,
    fontName: node.fontName as FontName,
    text: characters,
    letterSpacing: node.letterSpacing as LetterSpacing,
  });

  const validFontSize =
    fontSize >= rule.minFontSize && fontSize <= rule.maxFontSize;
  const validCharacterLength =
    characters.length >= rule.minChars && characters.length <= rule.maxChars;
  const validWordCount =
    words.length >= rule.minWords && words.length <= rule.maxWords;
  const validLines = lines >= rule.minLines && lines <= rule.maxLines;
  // const validVerticalAlignment = rule.allowedTextVerticalAlignments ? rule.allowedTextVerticalAlignments.includes(node.textAlignVertical) : false
  const validHorizontalAlignment = rule.allowedTextHorizontalAlignments
    ? rule.allowedTextHorizontalAlignments.includes(node.textAlign)
    : true;
  const validTextAutoResize = rule.allowedTextAutoResize
    ? rule.allowedTextAutoResize.includes(node.textAutoResize)
    : true;

  const validText =
    validFontSize &&
    validCharacterLength &&
    validWordCount &&
    validLines &&
    // && validVerticalAlignment
    validHorizontalAlignment &&
    validTextAutoResize;

  if (validText) {
    return {
      result: true,
      reason: ["text validation passed"],
    };
  } else {
    return {
      result: false,
      reason: ["text validation failed"],
    };
  }
}

/**
 * calculate estimated lines by its characters and width
 * reference: https://tex.stackexchange.com/questions/402779/how-can-i-calculate-a-number-of-lines-needed-to-fit-the-text
 * @param args
 */
function naiveTextLines(args: {
  width: number;
  height: number;
  fontName: FontName;
  fontSize: number;
  text: string;
  letterSpacing: LetterSpacing;
}): number {
  // Other option is to make dummy text on figma on runtime, get it's width, but it needs to be async
  const estimatedTextWitdh = naiveTextWidth(args);

  return Math.max(Math.round(estimatedTextWitdh / args.width), 1); // if 0, make it to 1

  // const characterLines = args.characters.split('\n')
  // return characterLines.length

  // TODO calculate by width and characters, properties.
}

function naiveTextWidth(args: {
  fontName: FontName;
  fontSize: number;
  text: string;
  letterSpacing: LetterSpacing;
}): number {
  const charLen = args.text.length;
  const widthPerChar = 0.442105 * args.fontSize; // TODO -> based on Roboto Regular Aa-Zz + special aschi characters
  let estimatedTextWitdh = widthPerChar * charLen;
  if (args.letterSpacing?.unit == "PERCENT") {
    estimatedTextWitdh *= args.letterSpacing?.value;
  } else if (args.letterSpacing?.unit == "PIXELS") {
    estimatedTextWitdh += charLen * args.letterSpacing.value;
  }

  return estimatedTextWitdh;
}

interface TextContentPosition {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

function textContentLcrs(node: ReflectTextNode): TextContentPosition {
  const lines = naiveTextLines(node);
  const contentWidth = naiveTextWidth(node);
  let startX: number;
  let centerX: number;
  let endX: number;

  switch (node.textAlign) {
    case TextAlign.left:
      break;
    case TextAlign.center:
      break;
    case TextAlign.right:
      break;
    case TextAlign.justify:
      break;
  }

  return;
}
