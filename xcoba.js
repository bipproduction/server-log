const {fetch} = require('cross-fetch')
fetch('https://log.wibudev.com/hipmi-log?pswd=1234', {
    method: "POST",
    body: JSON.stringify({
        nama: "malik"
    })
})