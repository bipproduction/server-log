const { exec } = require('child_process');
const send_wa = require('../send_wa');

/**
 * 
 * @param {import('../../models_ts/PROP2').PROP2} prop 
 */
module.exports = async function (prop) {
    let log;
    const child = exec(`pm2 restart ${prop.server.id}`)
    child.stdout.on('data', (data) => {
        log += data
    })

    await new Promise(r => setTimeout(r, 2000))
    send_wa(prop.sender, `😎 Hi! ${prop.body.senderName} restart ${prop.server.name} SUCCESS!`)
    return prop.res.status(201).send("ok")
}