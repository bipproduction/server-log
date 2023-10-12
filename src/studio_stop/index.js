const { execSync } = require("child_process")
const send_wa = require("../send_wa")
require('colors')

/**
 * 
 * @param {import("../../models_ts/PROP2").PROP2} prop 
 * @returns 
 */
module.exports = async function studio_stop(prop) {
    try {
        execSync(`pm2 stop ${prop.server.studio_name}`)
        send_wa(prop.body.sender, `😎 H1 ${prop.body.senderName} ${prop.server.name} Studio STOP Success `)
    } catch (error) {
        console.log(`${error}`.yellow)
    }
    return prop.res.status(201).send("ok")
}