import { ReflectSceneNode } from "@bridged.xyz/design-sdk/lib/nodes"
export function checkIfRoot(node: ReflectSceneNode): boolean {
    return node.isRoot
}