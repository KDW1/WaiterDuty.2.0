const fs = require('fs');
const Cadet = require('./classes/cadet');
const Roster = require('./classes/roster')

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

let rosterData = new Roster();
let rosters = JSON.parse(fs.readFileSync("./roster.json", 'utf-8')).rosters;
console.log(rosters)
rosterData.fromJson(rosters)
console.log(rosterData.monday.lunches);