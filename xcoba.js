// const { fetch } = require('cross-fetch')
// const send_wa = require('./src/send_wa')
// async function main() {
//     const q = "bip tanya siapa namamu".split(" ").slice(2).join(" ")
//     const j = await fetch(`https://hercai.onrender.com/v2/hercai?question=${q}`).then(v => v.json())
//     const hasil = j.reply.replace("Hercai", "bipsvr").replace("Five", "Malik Kurosaki").replace("OpenAI", "BIP")
//     send_wa("6289697338821", hasil)

// }
// main()

const pm2_list = require('./pm2_list.json')

const {execSync} = require('child_process')
const fs = require('fs')
const child = execSync('pm2 jlist').toString()


fs.writeFileSync('pm2_list', child)
console.log('success')
// console.log(JSON.parse(child))
