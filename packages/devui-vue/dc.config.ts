import { defineCliConfig } from 'devui-cli';

export default defineCliConfig({
  componentRootDir: './devui',
  libClassPrefix: 'd',
  libEntryFileName: 'vue-devui',
  libEntryRootDir: './devui',
  libPrefix: 'D',
  libStyleFileSuffix: '.scss'
})
