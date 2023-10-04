const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 3000;
let htopProcess = null;

app.get('/htop', (req, res) => {
    const { start } = req.query;

    if (start === 'true' && !htopProcess) {
        // Memulai perintah 'htop' dan tangkap outputnya
        htopProcess = exec('htop -n 1', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
            }

            // Mengirimkan output htop sebagai respons JSON
            res.json({ status: 'started', output: stdout });
        });

        // Menghentikan proses 'htop' setelah beberapa waktu
        setTimeout(() => {
            htopProcess.kill();
            htopProcess = null;
        }, 5000); // Ubah sesuai kebutuhan
    } else if (start === 'false' && htopProcess) {
        // Menghentikan perintah 'htop' jika sudah berjalan
        htopProcess.kill();
        htopProcess = null;
        res.json({ status: 'stopped' });
    } else {
        res.status(400).json({ error: 'Invalid request' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
