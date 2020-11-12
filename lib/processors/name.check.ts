import { NamingRule } from "../rules/rule.base";
import minimatch from "minimatch"

/**
 * validates the givven @param name by provided glob pattern or regex in givven @param rule
 * @param name 
 * @param rule 
 */
export function checkIfValidName(name: string, rule: NamingRule): boolean {
    // return true by default if no allowed naming convention rule provided.
    if (rule.allowedNamePatterns === undefined) {
        return true
    }

    for (const pattern of rule.allowedNamePatterns) {
        // pattern matching with ignoring case.
        const matched = minimatch(name, pattern, { nocase: true })
        if (matched) {
            return true;
        }
    }

    return false
}