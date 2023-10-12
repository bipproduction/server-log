const { execSync } = require('child_process')
const send_wa = require('../send_wa')
const pm2 = require('pm2')

/**
 * 
 * @param {import('../../models_ts/PROP2').PROP2} prop 
 */
module.exports = async function (prop) {
    const cmd = `
    PID_NAME="${prop.server.studio_name}"
    # Periksa apakah proses dengan nama PID tersebut sudah berjalan
    pm2 describe $PID_NAME &>/dev/null
    # Periksa status exit code dari perintah describe
    if [ $? -eq 0 ]; then
        pm2 restart $PID_NAME
        echo "Proses $PID_NAME sudah berjalan, di-restart."
    else
        pm2 start "npx prisma studio --port ${prop.server.studio_port}" --name ${prop.server.studio_name}
        echo "Proses $PID_NAME belum berjalan, di-start."
    fi
    `
    const child = execSync(cmd)
    console.log(child.toString())

    send_wa(prop.body.sender, `😎 H1 ${prop.body.senderName} ${prop.server.name} Studio START Success \n http://${prop.server.url}:${prop.server.studio_port}`)
    return prop.res.status(201).send("ok")
}