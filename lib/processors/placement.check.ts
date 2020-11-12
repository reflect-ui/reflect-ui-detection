import { ReflectConstraintMixin, ReflectSceneNode } from "@bridged.xyz/design-sdk/lib/nodes";
import { LCRS } from "@bridged.xyz/design-sdk/lib/utils/lcrs";
import { HorizontalPlacementRule, PlacementRule } from "../rules/rule.base";

export function checkIfValidPlacement(node: ReflectSceneNode, rule: PlacementRule): boolean {
    if (!node.parent) {
        // if node has no parent, cannot continue placement check process.
        return false
    }

    if (!(node instanceof ReflectConstraintMixin)) {
        // if node is not constraintable, cannot continue placement check process.
        return false
    }

    const isValidHorizontal = checkIfValidHorizontalPlacement(node, rule)

    console.log('isValidHorizontal', isValidHorizontal)

    // todo check vertical
    // isValidVertical
    return isValidHorizontal

}


function checkIfValidHorizontalPlacement(node: ReflectConstraintMixin, rule: HorizontalPlacementRule): boolean {
    const lcrs: LCRS = node.relativeLcrs
    const valid = (rule.horizontalCenter && lcrs == 'Center' || rule.horizontalCenter && lcrs == 'Stretch') ||
        (rule.horizontalLeft && lcrs == 'Left') ||
        (rule.horizontalRight && lcrs == 'Right')

    return valid
}