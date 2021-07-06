const path = require('path')
const fs = require('fs')

exports.root = (target) => path.join(__dirname, '../', target)
exports.exists = (target) => fs.existsSync(target)
exports.readdir = (target) => fs.readdirSync(target)
