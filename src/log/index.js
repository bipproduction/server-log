const { exec } = require('child_process')
const send_wa = require('../send_wa')

/**
 * 
 * @param {import('../../models_ts/PROP2').PROP2} prop 
 * @returns 
 */
module.exports = async function (prop) {

    let log;
    const child = exec(`pm2 log ${prop.server.id}`)
    child.stdout.on("data", (data) => {
        log += data
    })

    await new Promise(r => setTimeout(r, 3000))
    await send_wa(prop.body.sender, `${log}`)
    return prop.res.status(201).send("ok")
}