const yaml = require('yaml')
const fs = require('fs')
const path = require('path')
const config = yaml.parse(fs.readFileSync(path.join(__dirname, './config.yaml')).toString())
const express = require('express');
const { exec, execSync } = require('child_process');
const app = express();
app.use(express.json())
const cors = require('cors');
const RESPONSE = require('./models/RESPONSE');
const { URL } = require('url');
const handler = require('express-async-handler')
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.use(cors())
const port = config.server.port;

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

    return res.status(201).send("ok")
}))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
