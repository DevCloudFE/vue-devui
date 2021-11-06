import { devCliConfig } from '../shared/config'
import genLibEntry from '../shared/generate-lib-entry'
import logger from '../shared/logger'
import { resolveLibEntryDir } from '../shared/utils'
import { CreateCMD } from './create'

export default async function createLibEntryAction(names: string[] = [], cmd: CreateCMD) {
  try {
    const [name = devCliConfig.libEntryFileName] = names
    genLibEntry(resolveLibEntryDir(name))
  } catch (e: any) {
    logger.error(e.message)
  }
}
