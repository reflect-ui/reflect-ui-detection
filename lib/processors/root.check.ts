import { ReflectSceneNode } from "@design-sdk/core/nodes";
export function checkIfRoot(node: ReflectSceneNode): boolean {
  return node.isRoot;
}
