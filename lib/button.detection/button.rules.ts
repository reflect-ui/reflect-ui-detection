import { DetectionRule } from "../rules";
import { reflectMaxPhone } from "screen-size-specs"

export default <DetectionRule>{
    minSize: 32,
    minWidth: 80,
    maxWidth: reflectMaxPhone.width,
    maxHegith: 80
}