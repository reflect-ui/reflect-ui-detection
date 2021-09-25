import {
  ReflectChildrenMixin,
  ReflectSceneNode,
  ReflectSceneNodeType,
} from "@design-sdk/core";
import { CheckResult } from "..";
import { Allowence, StructureRule } from "../rules";

export function checkIfValidStructure(
  node: ReflectSceneNode,
  rule: StructureRule
): CheckResult {
  const validNodeType = checkIfValidNodeType(node.type, rule.allowedTypes);
  let validChildrenNodeTypes: boolean = true;
  if (node instanceof ReflectChildrenMixin) {
    validChildrenNodeTypes = node.grandchildren?.every((c) => {
      const valid = checkIfValidNodeType(c.type, rule.allowedChildren);
      return valid;
    });
  }
  const valid = validNodeType && validChildrenNodeTypes;

  return {
    result: valid,
    reason: valid ? ["structure passed"] : ["structure failed"],
  };
}

/**
 * check if node is a valid type for the target rule.
 * simply iterate through existsing node types, if matches, return true.
 * if no rule provided, return true by default.
 * @param node
 * @param rule
 */
// TODO -> make performant
function checkIfValidNodeType(
  type: ReflectSceneNodeType,
  allowence: Allowence<ReflectSceneNodeType>[]
): boolean {
  const config = allowence.find((a) => {
    return a.target === type;
  });
  if (config) {
    return config.allow;
  } else {
    // config not found
    const deafaultConfig = allowence.find((a) => {
      return a.target === "*";
    });
    // console.log(`no valud config found for ${type} in rule `, allowence, `default config is..`, deafaultConfig)
    return deafaultConfig.allow;
  }
}
