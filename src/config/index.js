const yaml = require('yaml')
const fs = require('fs')
const path = require('path')
const CONFIG = require('../../models/CONFIG')


/**
 * @type {CONFIG}
 */
const config = yaml.parse(fs.readFileSync(path.join(__dirname, './../../config.yaml')).toString())
module.exports = config