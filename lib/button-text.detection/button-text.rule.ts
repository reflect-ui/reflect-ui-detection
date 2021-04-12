import { TextAlign } from "@reflect-ui/core/lib";
import { PlacementRule, TextRule } from "../rules";

export default <TextRule | PlacementRule>{
  horizontalCenter: true,
  horizontalLeft: false,
  horizontalRight: false,
  maxChars: 50,
  minChars: 2,
  minLines: 1,
  maxLines: 1,
  minWords: 1,
  maxWords: 6,
  minFontSize: 14,
  maxFontSize: 24,
  allowedTextHorizontalAlignments: [TextAlign.center, TextAlign.left],
  allowedTextAutoResize: ["WIDTH_AND_HEIGHT"],
};
