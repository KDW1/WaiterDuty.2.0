const { json } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

const Cadet = require('./classes/cadet')



app.get('/', (req, res) => {
    res.render('index')
})

app.get('/addCadet', (req, res) => {
    let { cadetName, mon, tues, thurs, fri } = req.query;
    let cadetsData = fs.readFileSync('./cadets.json', 'utf-8')
    cadetsData = JSON.parse(cadetsData)
    let cadet = new Cadet(cadetName, mon, tues, thurs, fri)
    cadetsData.cadets.unshift(cadet)
    cadetsData = JSON.stringify(cadetsData)
    fs.writeFileSync('./cadets.json', cadetsData)
    res.send(cadet)
    
})
app.listen(port, () => {
    console.log(`Listening on port:${port}`)
})