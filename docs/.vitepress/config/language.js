const fs = require('fs')
const path = require('path')

export const language = fs.readdirSync(path.resolve(__dirname, '../crowdin'))