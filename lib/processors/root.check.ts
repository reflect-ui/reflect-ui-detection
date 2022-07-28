import type { ReflectSceneNode } from "@design-sdk/figma-node";
export function checkIfRoot(node: ReflectSceneNode): boolean {
  return node.isRoot;
}
