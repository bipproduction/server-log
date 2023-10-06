const {fetch} = require('cross-fetch')
const config = require("../config")
module.exports = async function ( nom, text) {
    return await fetch(`${config.server.wa_host}/code?nom=${nom}&text=${encodeURIComponent(text)}`)
}