import { CliConfig } from "../../shared/config";
import { PKG_NAME } from "../../shared/constant";

export default function genConfigTemplate(config: Partial<CliConfig> = {}) {
  return `\
import { defineCliConfig } from '${PKG_NAME}'

export default defineCliConfig(${JSON.stringify(config, null, 2)})
`
}