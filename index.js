const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;

// Variabel untuk menyimpan log
let pm2Log = '';

// Status apakah proses PM2 sedang berjalan
let pm2ProcessRunning = false;

// Endpoint API untuk mendapatkan log dengan query parameter start
app.get('/log', (req, res) => {
  const start = req.query.start;

  if (start === 'true' && !pm2ProcessRunning) {
    // Mulai proses PM2 jika belum berjalan
    const command = 'pm2 monit';

    const child = exec(command);

    child.stdout.on('data', (data) => {
      // Tambahkan data log ke variabel pm2Log
      pm2Log += data;

      // Teruskan data log ke respons HTTP
      res.write(data);
    });

    child.stdio[0].on("pipe", (p) => {
        console.log(p)
    })

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
