import { ReflectSceneNode } from "@bridged.xyz/design-sdk/lib/nodes"
import { detectIfButton } from "./button.detection"
import { detectIfIcon } from "./icon.detection"
import { detectIfIllust } from "./illust.detection"
import { detectIfScreen } from "./screen.detection"

export interface DetectionResult<T = any> {
    result: boolean
    entity: Entity
    accuracy: number
    reason?: Array<string>
    others?: Array<DetectionResult<any>>
    data?: T
}

export interface CheckResult<T = any> {
    readonly result: boolean
    readonly reason: ReadonlyArray<string>
    readonly data?: T
}


export type Entity =
    "graphics" |
    "graphics.illust" |
    "graphics.image" |
    "icon" |
    "unknown" |
    'divider' |
    "screen" |
    "button" |
    "button.base" |
    "button.text" |
    "button.icon" |
    "chip" |
    "parameters"

export function detect(node: ReflectSceneNode): DetectionResult {
    // run the naming detection first.
    const named = findMatchingNamePatterns(node.name)
    if (named) {
        if (!named.others) {
            return <DetectionResult>{
                result: true,
                entity: named.entity,
                accuracy: 1,
                reason: ['naming pattern matched'],
            }
        }
    }

    const detections: Array<DetectionResult> = [];

    // detection 
    const iconDetect = detectIfIcon(node)
    detections.push(iconDetect)

    const screenDetect = detectIfScreen(node)
    detections.push(screenDetect)

    const buttonDetect = detectIfButton(node)
    console.warn('buttonDetect', buttonDetect)
    detections.push(buttonDetect)


    const illustDetect = detectIfIllust(node)
    detections.push(illustDetect)
    console.warn('illustDetect', illustDetect)


    try {
        return detections.sort((a, b) => { return b.accuracy - a.accuracy })[0]
    } catch (e) {
        return <DetectionResult>{
            accuracy: 1,
            entity: "unknown",
            reason: ["nothing matched with detection."]
        }
    }

}

function findMatchingNamePatterns(name: string): DetectionResult {
    return undefined
}