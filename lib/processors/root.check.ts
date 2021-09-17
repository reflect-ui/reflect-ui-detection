import { ReflectSceneNode } from "@design-sdk/core";
export function checkIfRoot(node: ReflectSceneNode): boolean {
  return node.isRoot;
}
