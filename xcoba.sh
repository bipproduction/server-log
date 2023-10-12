PID_NAME="ex_500"
# Periksa apakah proses dengan nama PID tersebut sudah berjalan
pm2 describe $PID_NAME &>/dev/null
# Periksa status exit code dari perintah describe
if [ $? -eq 0 ]; then
    # Proses sudah berjalan, jadi restart
    # pm2 restart $PID_NAME
    echo "Proses $PID_NAME sudah berjalan, di-restart."
else
    # Proses belum berjalan, jadi jalankan
    # pm2 start /path/to/your/app.js --name $PID_NAME
    echo "Proses $PID_NAME belum berjalan, di-start."
fi