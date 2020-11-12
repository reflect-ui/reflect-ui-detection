/**
 * Detection rule is used for pre-processing filtering the input node is valid for further processing.
 */

import { ReflectSceneNodeType, TextHorizontalAligment, TextVerticalAligment } from "@bridged.xyz/design-sdk/lib/nodes"

export interface TypesRule {
    allowedTypes?: Array<ReflectSceneNodeType>
}


export interface VerticalPlacementRule {
    verticalCenter: boolean
    verticalTop: boolean
    verticalBottom: boolean
}

export interface HorizontalPlacementRule {
    horizontalCenter: boolean
    horizontalLeft: boolean
    horizontalRight: boolean
}

export interface PlacementRule extends VerticalPlacementRule, HorizontalPlacementRule {

}

export interface TextRule {
    maxChars: number
    minChars: number

    minWords: number
    maxWords: number

    minLines: number
    maxLines: number

    minFontSize: number
    maxFontSize: number

    allowedTextVerticalAlignments?: ReadonlyArray<TextVerticalAligment>
    allowedTextHorizontalAlignments?: ReadonlyArray<TextHorizontalAligment>
}


export interface SizingRule {
    minSize?: number
    minHeight?: number
    minWidth?: number

    maxSize?: number
    maxHegith?: number
    maxWidth?: number

    mustBeSquare?: boolean
}

export interface NamingRule {
    allowedNamePatterns?: Array<string>
}

export interface SlotsRule {
    allowedTextSlotCount?: number
}

export interface StructureRule extends SlotsRule {
    allowedChildren?: Array<NodeType>
    mustBeRoot?: boolean
}

export interface DetectionRule extends SizingRule, NamingRule, StructureRule, TypesRule {

}