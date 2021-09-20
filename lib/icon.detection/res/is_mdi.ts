import { MdiConfig } from "@reflect-ui/core";
import mdi_names from "./mdi-names";
/**
 * retrieves icon data with node's full name with mdi prefix.
 * @param fullname
 * @returns
 */
export function material_icon(fullname: string): MdiConfig {
  // regex is valid, but does not work at this point. inspect this, make it live again.
  // const re = /(?<=mdi_)(.*?)*/g // finds **mdi_** pattern
  const splits = fullname.split("mdi_");
  const name = splits[splits.length - 1];
  return mdi_names.includes(name)
    ? {
        host: "material",
        family: name,
        variant: "default", // TODO: this is static
        default_size: 24, // TODO: this is static
      }
    : undefined;
}
