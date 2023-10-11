const CONFIG = require('./models/CONFIG');
/**
 * @type {CONFIG}
 */
const config = require('./src/config');
const fs = require('fs')
const path = require('path')
const express = require('express');

const app = express();
app.use(express.json())
const cors = require('cors');
const RESPONSE = require('./models/RESPONSE');
const handler = require('express-async-handler')
const log = require('./src/log');
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const port = config.server.port;
const _ = require('lodash');
const send_wa = require('./src/send_wa');
const restart = require('./src/restart');
require('colors')

const list_action = [
    {
        name: "log",
        act: log
    },
    {
        name: "restart",
        act: restart
    }
]

const list_server = [
    {
        id: "hipmi_5005",
        port: 5005,
        studio_port: 5551,
        name: "hipmi",
        path: "hipmi",
        url: "https://hipmi.wibudev.com"
    },
    {
        id: "arm_5004",
        port: 5004,
        studio_port: 5552,
        name: "arm",
        path: "arm",
        url: "https://arm.wibudev.com"
    }
]


// app.post('/log', async (req, res) => {
//     let log;
//     /**
//      * @type {RESPONSE}
//      */
//     const body = req.body
//     const search = new URL(body.msg).searchParams
//     const param = search.get("param")
//     const cmd = search.get("type")
//     const pswd = search.get("pswd")
//     if (!param || !cmd || !pswd) return res.status(201).send("wrong format")
//     if (pswd !== "1234") return res.status(201).send("wrong password")
//     if (cmd === "log") {

//         const child = exec(`pm2 log ${param}`)
//         child.stdout.on("data", (d) => {
//             log += d
//         })
//     }


//     await new Promise(r => setTimeout(r, 3000))
//     res.status(201).send(log)
// })

app.post('/', handler(async (req, res) => {

    const menu = `
🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀   
📚 DAFTAR PERINTAH :
Server Availabel:
${list_server.map((v) => v.name).join("\n")}

Option Available:
${list_action.map((v) => v.name).join("\n")}

Example:
bipsvr ${list_server[0].name} ${list_action[0].name}
🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀
    `
    /**
     * @type {RESPONSE}
     */
    const body = req.body
    const [args, server, action] = body.msg.split(" ")

    console.log(args, server, action, "disini".green)

    if (!action || !server) {
        send_wa(body.sender, menu)
        console.log("no type or param, show menu")
        return res.status(201).send("no type or param")
    }

    const _server = list_server.find((v) => v.name === server)
    const _action = list_action.find((v) => v.name === action)

    const prop = {
        ...body,
        req,
        res,
        ..._server
    }

    send_wa(prop.sender, `😎 ${prop.senderName} wait ... `)
    if (_server && !_action) {
        const avab = `
        Available Option:
        ${list_action.map((v) => v.name).join("\n")}
        `
        send_wa(prop.sender, avab)
    }
    if (_server && _action) return await _action.act(prop)


    // if (action === "log") {
    //     console.log("")
    //     const action = list_server.find((v) => v.name === server)
    //     if (action) {
    //         const prop = {
    //             ...body,
    //             req,
    //             res,
    //             ...action
    //         }
    //         return await action.action(_.omit(prop, ['action']))
    //     }
    // } else if (action === "tanya") {
    //     send_wa(body.sender, "😎 tunggu sebentar ...")
    //     const q = body.msg.split(" ").slice(2).join(" ")
    //     const j = await fetch(`https://hercai.onrender.com/v2/hercai?question=${q}`).then(v => v.json())
    //     const hasil = j.reply
    //         .replace("Hercai", "bipsvr")
    //         .replace("Five", "Malik Kurosaki")
    //         .replace("OpenAI", "BIP")
    //         .replace("Herc.ai.", "bipsvr.ai")
    //         .replace("@User", "@Penanya")

    //     send_wa(body.sender, hasil)
    //     return res.status(201).send("ok")
    // } else {
    //     send_wa(body.sender, `
    //     Menu Yang Tersedia Adalah:
    //     ${menu}
    //     `)
    // }

    return res.status(201).send("ok")
}))

app.listen(port, () => {
    console.log(`Server is running on port ${port} | version ${config.server.version}`.cyan);
});


async function tanya(res, body) {
    send_wa(body.sender, "😎 tunggu sebentar ...")
    const q = body.msg.split(" ").slice(1).join(" ")
    const j = await fetch(`https://hercai.onrender.com/v2/hercai?question=${q}`).then(v => v.json())
    const hasil = j.reply
        .replace("Hercai", "bipsvr")
        .replace("Five", "Malik Kurosaki")
        .replace("OpenAI", "BIP")
        .replace("Herc.ai.", "bipsvr.ai")
        .replace("@User", "@Penanya")

    send_wa(body.sender, hasil)
    return res.status(201).send("ok")
}