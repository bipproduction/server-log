const yaml = require('yaml')
const fs = require('fs')
const path = require('path')


const config = yaml.parse(fs.readFileSync(path.join(__dirname, './../../config.yaml')).toString())
module.exports = config