const { execSync } = require('child_process')
const send_wa = require('../send_wa')

/**
 * 
 * @param {import('../../models_ts/PROP2').PROP2} prop 
 */
module.exports = async function (prop) {
    execSync(`pm2 start "npx prisma studio --port ${prop.server.studio_port}" --name ${prop.server.studio_name}`)
    send_wa(prop.body.sender, `😎 H1 ${prop.body.senderName} ${prop.server.name} Studio START Success`)
    return prop.res.ststus(201).send("ok")
}