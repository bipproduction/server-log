const { execSync, exec } = require('child_process');
const { fetch } = require('cross-fetch')
let d;
const log = exec('pm2 log hipmi_5005')
log.stdout.on("data", (data) => {
    d += data
})
setTimeout(() => {
    log.kill("SIGHUP")
    console.log(d)
    fetch(`https://wa.wibudev.com/code?nom=6289697338821&text=${encodeURIComponent(d)}`).then((v) => {
        console.log(v.status)
    })
}, 2000);
