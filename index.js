const { json } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

let jsonData = fs.writeFile("./roster.json", "utf8", (err, jsonString) => {
    if(err) {
        console.log("Error: " + err)
    } else {
        return jsonData
    }
})
console.log(jsonData)
app.get('/', (req, res) => {
    res.render('index')
})
app.listen(port, () => {
    console.log(`Listening on port:${port}`)
})