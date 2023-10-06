const { exec } = require('child_process')
const { fetch } = require('cross-fetch')
const TYPE_PROP = {
    id: "",
    name: "",
    path: "",
    url: "",
    req: "",
    res: "",
    wa_host: "",
    sender: "",
    senderName: "",
    msg: ""
}

/**
 * 
 * @param {TYPE_PROP} prop 
 * @returns 
 */
module.exports = async function (prop) {
    let log;
    const child = exec(`pm2 log ${prop.id}`)
    child.stdout.on("data", (data) => {
        log += data
    })

    await new Promise(r => setTimeout(r, 3000))
    await fetch(`${prop.wa_host}/code?nom=${prop.sender}&text=${encodeURIComponent(log)}`)
    return prop.res.status(201).send("ok")
}