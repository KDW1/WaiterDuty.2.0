const { json } = require('express')
const express = require('express')
const fs = require('fs')
const { parse } = require('path')
const internal = require('stream')
const bodyParser = require('body-parser')
const http = require('http')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

const Cadet = require('./classes/cadet')
const Day = require('./classes/day')
const Roster = require('./classes/roster')
const basicFuncs = require('./basicFunctions')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

let week = [];
let mon = new Day(1);
let tues = new Day(2);
let wed = new Day(3);
let thur = new Day(4);
let fri = new Day(5);
let baseShifts = 1; //base number of shifts

week.unshift(mon, tues, wed, thur, fri);


app.get('/', (req, res) => {
    let cadetsData = fs.readFileSync('./cadets.json', 'utf-8')
    cadetsData = JSON.parse(cadetsData).cadets ?? JSON.parse(cadetsData);
    for(let i = 0; i < cadetsData.length; i++) {
        cadetsData[i].parsedLunchTimes = []
        let cadet = cadetsData[i]

        console.log(cadet)
        for(let j = 0; j < cadet.lunchTimes.length; j++) {
            if(j != 2) {
                let parsedLunchTime =  basicFuncs.getLunchTime(parseInt(cadet.lunchTimes[j]))
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

app.get('/returnWeek', async (req, res) => {
    let obj = {
        message: "bruh",
        addressing: "oooooff...."
    }
    await basicFuncs.weekInteraction(obj)
    let week = await basicFuncs.weekInteraction()
    res.send(week)
})

app.get('/createRoster', async (req, res) => {
    let cadetsData = fs.readFileSync('./cadets.json', 'utf-8')
    cadetsData = JSON.parse(cadetsData).cadets
    let roster = new Roster()
    let cadetList = presetCadetList()
    let baseShifts = 1
    let obj = {
        cadets: cadetList
    }
    await fs.writeFileSync("./baseShifts.json", JSON.stringify(baseShifts))
    await fs.writeFileSync("./cadets.json", JSON.stringify(obj))
    basicFuncs.generateWaiterRoster(cadetList, week)
    // let response = basicFuncs.generateWaiterRoster(cadetsData, week)
})

app.get('/baseShifts', async (req, res) => {
    res.send(JSON.stringify(baseShifts))
})

app.listen(port, () => {
    console.log(`Listening on port:${port}`)
})

function presetCadetList() { //To be called from the console | 0 -> "Free Lunch Period" | 5 -> "Not Available"
    console.log("\nLoading Preset Cadet List");
    let cadetList = []
    let gageS = new Cadet("Gage Smith", 1, 1, 2, 2);
    let haoboS = new Cadet("Haobo Sun", 1, 3, 3, 3);
    let kingdiorrW = new Cadet("King-Diorr Willsun", 1, 3, 3, 3);
    let ericZ = new Cadet("Eric Zhao", 2, 1, 1, 5);
    let justinC = new Cadet("Justin Cheung", 2, 2, 2, 5);
    let ernestoU = new Cadet("Ernesto Urtusuatsegui", 2, 2, 5, 3);
    let nathanielC = new Cadet("Nathaniel Caminero", 3, 3, 3, 5);
    let beckettP = new Cadet("Beckett Payne",3 , 1, 5, 5);
    let andrewD = new Cadet("Andrew Divine", 3, 2, 1, 2);
    let lorenzoA = new Cadet("Lorenzo Alonzo", 5, 5, 1, 1);
    let hermanH = new Cadet("Herman Habermann", 5, 5, 2, 5);
    let jorgeX = new Cadet("Jorge Xacur", 5, 5, 5, 1);
    let jeronimoC = new Cadet("Jeronimo Canales", 5, 5, 5, 1);
    let alonsoP = new Cadet("Alonso Perochena", 5, 5, 5, 2);
    let jakeD = new Cadet("Jake Dolan", 5, 5, 5, 5);
    let diegoU = new Cadet("Diego Urtusuatsegui", 5, 5, 5, 5);
    let boscoF = new Cadet("Bosco Fox", 5, 5, 5, 5);
    cadetList.unshift(gageS, haoboS, kingdiorrW, ericZ, justinC, ernestoU, nathanielC, beckettP, andrewD, lorenzoA, hermanH);
    cadetList.unshift(jorgeX, jeronimoC, alonsoP, jakeD, diegoU, boscoF);
    return cadetList
}