const yaml = require('yaml')
const fs = require('fs')
const path = require('path')
const config = yaml.parse(fs.readFileSync(path.join(__dirname, './config.yaml')).toString())
const express = require('express');
const { exec } = require('child_process');
const app = express();
app.use(express.urlencoded())
app.use(express.json())
const port = config.server.port;
let pm2Log = '';

// Status apakah proses PM2 sedang berjalan
let pm2ProcessRunning = false;

// Endpoint API untuk mendapatkan log dengan query parameter start
app.get('/log', (req, res) => {
    const start = req.query.start;

    if (start === 'true' && !pm2ProcessRunning) {
        // Mulai proses PM2 jika belum berjalan
        const command = 'pm2 logs --lines 5';

        const child = exec(command);

        child.stdout.on('data', (data) => {
            // Tambahkan data log ke variabel pm2Log
            pm2Log += data;

            // Teruskan data log ke respons HTTP
            console.log(data)
            res.write(data);
        });

        child.stderr.on('data', (error) => {
            console.error(`Error: ${error}`);
        });

        child.on('close', (code) => {
            pm2ProcessRunning = false;
            console.log(`Proses pm2 logs selesai dengan kode keluaran ${code}`);
            res.end();
        });

        pm2ProcessRunning = true;
    } else if (start === 'false' && pm2ProcessRunning) {
        // Hentikan proses PM2 jika sedang berjalan
        pm2ProcessRunning = false;
        res.end();
    } else {
        // Kondisi lainnya, kembalikan log yang ada
        res.send(pm2Log);
    }
});

app.post('/hipmi-log', (req, res) => {

    const body = req.body

    console.log(body)
    res.status(201).send("ok")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
