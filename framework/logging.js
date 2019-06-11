module.exports = (data) => {
    var time = new Date()
    console.log(`${time.toDateString()} ${time.toLocaleTimeString()} -- ${data}`)
}