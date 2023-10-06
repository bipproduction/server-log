module.exports = async function ( nom, text) {
    return await fetch(`https://code?nom=${nom}&text=${encodeURIComponent(text)}`)
}