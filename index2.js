const { exec } = require('child_process')

async function main() {
    const child = exec("pm2 logs")
    await new Promise(r => {
        child.stdout.on("data", (data) => {
            console.log(data)
        })

        setTimeout(() => {
            r()
        }, 5000)
    })

    child.kill('SIGTERM');

}

main()