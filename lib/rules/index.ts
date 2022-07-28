/**
 * Detection rule is used for pre-processing filtering the input node is valid for further processing.
 */

import { ReflectSceneNodeType } from "@design-sdk/figma-node";
import { TextAlign, TextAlignVertical } from "@reflect-ui/core";

// we should suppport this on reflect-core
import { TextAutoResize } from "@design-sdk/figma-types";

export interface VerticalPlacementRule {
  verticalCenter: boolean;
  verticalTop: boolean;
  verticalBottom: boolean;
}

export interface HorizontalPlacementRule {
  horizontalCenter: boolean;
  horizontalLeft: boolean;
  horizontalRight: boolean;
}

export interface PlacementRule
  extends VerticalPlacementRule,
    HorizontalPlacementRule {}

export interface ComplexityRule {
  minTotalChildCount: number;
  maxTotalChildCount: number;
  minTotalColorCount: number;
  maxTotalColorCount: number;
}

export interface TextRule {
  maxChars: number;
  minChars: number;

  minWords: number;
  maxWords: number;

  minLines: number;
  maxLines: number;

  minFontSize: number;
  maxFontSize: number;

  allowedTextVerticalAlignments?: ReadonlyArray<TextAlignVertical>;
  allowedTextHorizontalAlignments?: ReadonlyArray<TextAlign>;

  allowedTextAutoResize?: ReadonlyArray<TextAutoResize>;
}

export interface SizingRule {
  minSize?: number;
  minHeight?: number;
  minWidth?: number;

  maxSize?: number;
  maxHegith?: number;
  maxWidth?: number;

  // when this is allowed, calcualtes (+-) 90 rotated node's width as height  with visualWidth and visualHeight
  rightAngleCalculation?: SizingRule;

  minRatio?: number;
  maxRatio?: number;
  mustBeSquare?: boolean;
}

export interface NamingRule {
  allowedNamePatterns?: Array<string>;
}

export interface SlotsRule {
  allowedTextSlotCount?: number;
}

export interface Allowence<T> {
  target: T | "*";
  allow: boolean;
}

export interface StructureRule extends SlotsRule {
  allowedTypes?: Array<Allowence<ReflectSceneNodeType>>;
  allowedChildren?: Array<Allowence<ReflectSceneNodeType>>;
  mustBeRoot?: boolean;
}

export interface DetectionRule extends SizingRule, NamingRule, StructureRule {}
