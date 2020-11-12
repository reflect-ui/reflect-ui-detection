import { PlacementRule, TextRule } from "../rules/rule.base";

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
    allowedTextHorizontalAlignments: ['CENTER', 'LEFT'],
}