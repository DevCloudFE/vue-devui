import { CliConfig } from "../../shared/config";

export default function genConfigTemplate(config: Partial<CliConfig> = {}) {
  return `\
import { defineCliConfig } from 'dev-cli'

export default defineCliConfig(${JSON.stringify(config, null, 2)})
`
}