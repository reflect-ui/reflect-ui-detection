import { ReflectTextNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { TextRule } from "../rule.base";

export function checkIfValidText(node: ReflectTextNode, rule: TextRule) {
    const fontSize = node.fontSize as number
    const characters = node.characters
    const words = characters.split(' ')
    const lines = naiveTextLines({
        width: node.width,
        fontSize: fontSize,
        characters: characters,
        letterSpacing: (node.letterSpacing as LetterSpacing).unit == 'PIXELS' ? (node.letterSpacing as LetterSpacing).value : null
    })

    const validFontSize = fontSize >= rule.minFontSize && fontSize <= rule.maxFontSize
    const validCharacterLength = characters.length >= rule.minChars && characters.length <= rule.maxChars
    const validWordCount = words.length >= rule.minWords && words.length <= rule.maxWords
    const validLines = lines >= rule.minLines && lines <= rule.maxLines

    return validFontSize
        && validCharacterLength
        && validWordCount
        && validLines
}


/**
 * calculate estimated lines by its characters and width
 * reference: https://tex.stackexchange.com/questions/402779/how-can-i-calculate-a-number-of-lines-needed-to-fit-the-text
 * @param args 
 */
function naiveTextLines(args: {
    width: number
    fontSize: number
    characters: string
    letterSpacing?: number | null
}): number {
    const characterLines = args.characters.split('\n')
    return characterLines.length

    // TODO calculate by width and characters, properties.
}