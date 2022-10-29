const fs = require('fs');
const Cadet = require('./classes/cadet');
const Roster = require('./classes/roster')
const basicFuncs = require('./basicFunctions')

function getCadets() {
    let jsonData = JSON.parse(fs.readFileSync("./cadets.json", 'utf-8'));
    let cadetsList = [];
    for(let i = 0; i < jsonData.length; i++) {
        cadetsList[i] = new Cadet();
        cadetsList[i].fromJson(jsonData[i]);
    }

    return cadetsList;
}

function updateCadets(cadets) {
    fs.writeFileSync("./cadets.json", JSON.stringify(cadetsList))
}

let cadetList = presetCadetList();
let rosterData = new Roster();
let rosters = JSON.parse(fs.readFileSync("./roster.json", 'utf-8')).rosters;
// console.log(rosters)
rosterData.fromJson(rosters)
// console.log(rosterData.monday.lunches);
console.log(cadetList)
basicFuncs.createRoster(cadetList, rosterData)

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