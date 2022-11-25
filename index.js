const { json } = require('express')
const express = require('express')
const fs = require('fs')
const { parse } = require('path')
const internal = require('stream')
const bodyParser = require('body-parser')
const http = require('http')
const app = express()
const port = 3000
const path = require('path')

require('dotenv').config()

app.set('view engine', 'ejs')

const Cadet = require('./classes/cadet')
const Day = require('./classes/day')
const Roster = require('./classes/roster')
const basicFuncs = require('./utils/basicFunctions')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    let { errorMsg, rosterError } = req.query;
    let cadetsData = JSON.parse(fs.readFileSync('./jsonFiles/cadets.json', 'utf-8'));
    let rosterData = JSON.parse(fs.readFileSync('./jsonFiles/roster.json', 'utf-8'));
    if(errorMsg == "CadetFailure") {
        errorMsg = "Couldn't add the cadet";
    } else if(errorMsg == "DuplicateCadet") {
        errorMsg = "There's already a cadet with that name";
    }
    res.render('index', {
        debrief: null ?? errorMsg,
        rosterError: null ?? rosterError,
        cadetList: cadetsData,
        roster: rosterData
    })
})

app.get('/deleteCadet', (req, res) => {
    console.log("Trying to delete a cadet")
    let _cadetName = req.query.cadetName
    let cadetsData = fs.readFileSync('./jsonFiles/cadets.json', 'utf-8')
    cadetsData = JSON.parse(cadetsData)
    console.log("Name: " + _cadetName)
    console.log("Cadets:")
    console.log(cadetsData)
    let index = cadetsData.findIndex((data) => data.cadetName == _cadetName)
    cadetsData.splice(index, 1)
    fs.writeFileSync('./jsonFiles/cadets.json', JSON.stringify(cadetsData))
    res.redirect('/')
})

app.post('/addCadet', (req, res) => {
    let { cadetName, mon, tues, thurs, fri } = req.body
    console.log("Request Body:")
    console.log(req.body)
    if(cadetName && mon.length != 0 && tues.length != 0 && thurs.length != 0 && fri.length != 0) { 
        let cadet = new Cadet(cadetName, parseInt(mon), parseInt(tues), parseInt(thurs), parseInt(fri))
        let cadetsData = fs.readFileSync('./jsonFiles/cadets.json', 'utf-8')
        
        cadetsData = JSON.parse(cadetsData)

        //Checking we haven't already made the cadet
        let checkIndex = cadetsData.findIndex((data) => {
            if(data.cadetName == cadetName) {
                return true;
            } 
            return false
        });

        console.log("Check Index: " + checkIndex)

        if(checkIndex != -1) {
            res.redirect('/?errorMsg=DuplicateCadet')
        } else {
            cadetsData.unshift(cadet)
    
            fs.writeFileSync('./jsonFiles/cadets.json', JSON.stringify(cadetsData))
            res.redirect('/')
        }
    } else {
        res.redirect('/?errorMsg=CadetFailure')
    }
})

app.get('/addCadet', (req, res) => {
    let { cadetName, mon, tues, thurs, fri } = req.query;
    let cadetsData = JSON.parse(fs.readFileSync('./jsonFiles/cadets.json', 'utf-8'))
    let cadet = new Cadet(cadetName, parseInt(mon), parseInt(tues), parseInt(thurs), parseInt(fri))
    cadetsData.cadets.unshift(cadet)
    fs.writeFileSync('./jsonFiles/cadets.json', JSON.stringify(cadetsData))
    res.send(cadetsData)
})

app.get('/configCadets', (req, res) => {
    let cadetList = presetCadetList();
    fs.writeFileSync('./jsonFiles/cadets.json', JSON.stringify(cadetList))
    fs.writeFileSync('./jsonFiles/roster.json', JSON.stringify(new Roster()))
    res.redirect('/')
})

app.get('/deleteAllCadets', (req, res) => {
    let cadetList = {
        cadets: []
    }
    fs.writeFileSync('./jsonFiles/cadets.json', JSON.stringify(cadetList))
    res.send(cadetList)
})

app.get('/save', (req, res) => {
    res.redirect('/')
})

app.get('/roster', (req, res) => {
    console.log("Creating roster")
    // //Getting Cadet Info

    let cadetList = [];
    let cadetsData = JSON.parse(fs.readFileSync('./jsonFiles/cadets.json', 'utf-8'));

    //Getting Roster/Week info 

    let roster = new Roster();
    let rosterData = JSON.parse(fs.readFileSync('./jsonFiles/roster.json', 'utf-8'))
    if(rosterData) {
        roster.fromJson(rosterData)
    }

    // //Making CadetList
    if(cadetsData) {
        for(let i = 0; i < cadetsData.length; i++) {
            let cadet = new Cadet();
            cadet.fromJson(cadetsData[i]);
            cadetList.unshift(cadet);
        }
    }
    console.log("Cadets:");
    console.log(cadetList)
    let relevantInfo = (cadetList) ? basicFuncs.generateWaiterRoster(cadetList, roster) : false;
    if(relevantInfo.roster && relevantInfo.cadetList) {
        console.log(relevantInfo.roster);
        fs.writeFileSync('./jsonFiles/roster.json', JSON.stringify(relevantInfo.roster));
        fs.writeFileSync('./jsonFiles/cadets.json', JSON.stringify(cadetList));
        res.redirect('/')
    } else {
        console.log("Error:")
        console.log(relevantInfo)
        cadetList.forEach((data, i) => {
            console.log(data)
            cadetList[i].shifts = [];
            cadetList[i].shiftAmounts = 0;
        })
        fs.writeFileSync('./jsonFiles/roster.json', JSON.stringify(new Roster()))
        fs.writeFileSync('./jsonFiles/cadets.json', JSON.stringify(cadetList));
        res.render('index', {
            debrief: "Roster Error, can't fill every lunch period",
            rosterError: relevantInfo,
            rosterMade: false,
            roster: null,
            cadetList: JSON.parse(fs.readFileSync('./jsonFiles/cadets.json', 'utf-8'))
        })
    }
})

app.get('/deleteRoster', (req, res) => {
    let cadetList = JSON.parse(fs.readFileSync('./jsonFiles/cadets.json', 'utf-8'))
    cadetList.forEach((i) => {
        cadetList[i].shifts = [];
        cadetList[i].shiftAmounts = 0;
    })
    fs.writeFileSync('./jsonFiles/roster.json', JSON.stringify(new Roster()))
    fs.writeFileSync('./jsonFiles/cadets.json', JSON.stringify(cadetList));
    res.render('index', {
        debrief: "Roster Error, can't fill every lunch period",
        rosterError: relevantInfo,
        roster: null,
        cadetList: JSON.parse(fs.readFileSync('./jsonFiles/cadets.json', 'utf-8'))
    })
})

app.get('/clearAll', (req, res) => {
    fs.writeFileSync('./jsonFiles/roster.json', JSON.stringify(new Roster()))
    fs.writeFileSync('./jsonFiles/cadets.json', JSON.stringify([]))
    res.redirect('/')
})
app.get('/cadets.json', (req, res) => {
    res.sendFile('./jsonFiles/cadets.json', { root: path.join(__dirname)})
})

app.get('/roster.json', (req, res) => {
    res.sendFile('.jsonFiles/roster.json', { root: path.join(__dirname)})
})

app.listen(process.env.PORT || port, () => {
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

module.exports = app