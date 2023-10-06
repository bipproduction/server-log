const CONFIG = require('./models/CONFIG');
/**
 * @type {CONFIG}
 */
const config = require('./src/config');
const fs = require('fs')
const path = require('path')
const express = require('express');

const { exec, execSync } = require('child_process');
const app = express();
app.use(express.json())
const cors = require('cors');
const RESPONSE = require('./models/RESPONSE');
const { URL } = require('url');
const handler = require('express-async-handler')
const { fetch } = require('cross-fetch');
const log = require('./src/log');
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const port = config.server.port;
const _ = require('lodash');

const list_action = [
    {
        id: "hipmi_5005",
        name: "hipmi",
        path: "hipmi",
        url: "https://hipmi.wibudev.com",
        action: log
    }
]


app.post('/log', async (req, res) => {
    let log;
    /**
     * @type {RESPONSE}
     */
    const body = req.body
    const search = new URL(body.msg).searchParams
    const param = search.get("param")
    const cmd = search.get("type")
    const pswd = search.get("pswd")
    if (!param || !cmd || !pswd) return res.status(201).send("wrong format")
    if (pswd !== "1234") return res.status(201).send("wrong password")
    if (cmd === "log") {

        const child = exec(`pm2 log ${param}`)
        child.stdout.on("data", (d) => {
            log += d
        })
    }
    await new Promise(r => setTimeout(r, 3000))
    res.status(201).send(log)
})

app.post('/', handler(async (req, res) => {

    const menu = `
    ---------------------------------------
    📚 DAFTAR PERINTAH :
    log:
          hipmi
          arm
          ninox
    
    contoh:
        bipsrv log hipmi
        bipsvr log arm
    ---------------------------------------
    `

    /**
     * @type {RESPONSE}
     */
    const body = req.body
    const [args, type, param] = body.msg.split(" ")

    console.log(body)
    if (!type || !param) {
        fetch(`${config.wa_host}/code?nom=${body.sender}&text=${encodeURIComponent(menu)}`)
        console.log("no type or param, show menu")
        return res.status(201).send("no type or param")
    }

    if (type === "log") {
        const action = list_action.find((v) => v.name === param)
        if (action) {
            const prop = {
                ...body,
                req,
                res,
                ...action
            }
            return await action.action(_.omit(prop, ['action']))
        }
    }


    return res.status(201).send("ok")
}))


app.listen(port, () => {
    console.log(`Server is running on port ${port} | version ${config.server.version}`);
});
