const { exec } = require('child_process');
const send_wa = require('../send_wa');

/**
 * 
 * @param {import("../../models/PROP2").PROP2} prop 
 */
module.exports = async function (prop) {
    let log;
    const child = exec(`pm2 restart ${prop.id}`)
    child.stdout.on('data', (data) => {
        log += data
    })

    await new Promise(r => setTimeout(r, 2000))
    send_wa(prop.sender, `😎 Hi! ${prop.sender} restart ${prop.name} SUCCESS!`)
    return prop.res.status(201).send("ok")
}