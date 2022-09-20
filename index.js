const { json } = require('express')
const express = require('express')
const fs = require('fs')
const { parse } = require('path')
const internal = require('stream')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

const Cadet = require('./classes/cadet')
const getLunchTime = require('./utils/basicFunctions')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    let cadetsData = fs.readFileSync('./cadets.json', 'utf-8')
    cadetsData = JSON.parse(cadetsData).cadets;
    for(let i = 0; i < cadetsData.length; i++) {
        cadetsData[i].parsedLunchTimes = []
        let cadet = cadetsData[i]
        console.log(cadet)
        for(let j = 0; j < cadet.lunchTimes.length; j++) {
            if(j != 2) {
                let parsedLunchTime = getLunchTime(parseInt(cadet.lunchTimes[j]))
                console.log(parsedLunchTime)
                cadetsData[i].parsedLunchTimes.push(parsedLunchTime)
            }
        }
    }
    console.log(cadetsData)
    if(cadetsData) {
        res.render('index', {
            cadetList: cadetsData
        })
    } else {
        res.render('index')
    }
})

app.get('/deleteCadet', (req, res) => {
    let { cadetName } = req.query
    let cadetsData = fs.readFileSync('./cadets.json', 'utf-8')
    cadetsData = JSON.parse(cadetsData)
    cadetsData.cadets.splice(cadetsData.cadets.indexOf((data) => {data.cadetName = cadetName}), 1)
    fs.writeFileSync('./cadets.json', JSON.stringify(cadetsData))
    res.redirect('/')
})
app.post('/addCadet', (req, res) => {
    let { cadetName, mon, tues, thurs, fri } = req.body
    let cadet = new Cadet(cadetName, mon, tues, thurs, fri);
    let cadetsData = fs.readFileSync('./cadets.json', 'utf-8')
    cadetsData = JSON.parse(cadetsData)
    cadetsData.cadets.unshift(cadet)
    fs.writeFileSync('./cadets.json', JSON.stringify(cadetsData))
    res.redirect('/')
})
app.get('/addCadet', (req, res) => {
    let { cadetName, mon, tues, thurs, fri } = req.query;
    let cadetsData = fs.readFileSync('./cadets.json', 'utf-8')
    cadetsData = JSON.parse(cadetsData)
    let cadet = new Cadet(cadetName, mon, tues, thurs, fri)
    cadetsData.cadets.unshift(cadet)
    cadetsData = JSON.stringify(cadetsData)
    res.render('index', {
        cadetList: cadetList
    })
    
})
app.listen(port, () => {
    console.log(`Listening on port:${port}`)
})