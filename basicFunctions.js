let fs = require("fs")

function getLunchTime(num) {
    switch (num) {
        case 0:
            return "Free Period";
        case 1:
            return "1st Lunch";
        case 2:
            return "2nd Lunch";
        case 3:
            return "3rd Lunch";
        case 5:
            return "No Available Lunch"
    }
}

async function bS(change = 0) {
    let amt = JSON.parse(await fs.readFileSync("./baseShifts.json", 'utf-8'));
    if(change == 0) {
        return amt;
    }
    amt += change;
    amt = JSON.stringify(amt);
    await fs.writeFileSync("./baseShifts.json", amt);
    return amt
}

let canRepeat = true;

function toggleRecursive() {
    canRepeat = !canRepeat;
    console.log("Can Repeat: ", canRepeat);
}

async function AssignBreakfastShifts(cadetList, chosenWeek) {
    cadetList = JSON.parse(fs.readFileSync("./cadets.json", 'utf-8')).cadets ?? JSON.parse(fs.readFileSync("./cadets.json", 'utf-8'))
    breakfastShift = chosenWeek.breakfast;
    let baseShifts = await bS();
    for (let i = 0; i < cadetList.length; i++) {
        if (metMinimumNumOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts = await bS(1);
            console.log(`${baseShifts} is the base number of shifts at breakfast`);
            // console.log(cadetList);
        }
        if (!fullShifts(breakfastShift, 5)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                chosenWeek.assignShift(1, 1, cadetList[i]);
                // cadetList[i].shiftAmounts++;
                // console.log(`${cadetList[i].cadetName} assigned shift, taking ${cadetList[i].shiftAmounts} shifts`);
            }
        }
    }
    let obj = { cadets: cadetList }
    fs.writeFileSync("./cadets.json", JSON.stringify(cadetList))
    if (Array.isArray(breakfastShift)) {
        if (!fullShifts(breakfastShift, 5) && canRepeat) {
            AssignBreakfastShifts(cadetList, chosenWeek);
        }
    }
}

async function AssignWednesdayShifts(cadetList, chosenWeek) {
    cadetList = JSON.parse(fs.readFileSync("./cadets.json", 'utf-8')).cadets ?? JSON.parse(fs.readFileSync("./cadets.json", 'utf-8'))
    wednesdayShift = chosenWeek.wednesday;
    let baseShifts = await bS();
    for (let i = 0; i < cadetList.length; i++) {
        if (metMinimumNumOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts = await bS(1);
            console.log(`${baseShifts} is the base number of shifts at breakfast`);
            // console.log(cadetList);
        }
        if (!fullShifts(wednesdayShift, 7)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                chosenWeek.assignShift(4, 1, cadetList[i]);
                // cadetList[i].shiftAmounts++;
                // console.log(`${cadetList[i].cadetName} assigned shift, taking ${cadetList[i].shiftAmounts} shifts`);
            }
        }
    }
    let obj = { cadets: cadetList }
    fs.writeFileSync("./cadets.json", JSON.stringify(obj))
    if (Array.isArray(wednesdayShift)) {
        if (!fullShifts(wednesdayShift, 7) && canRepeat) {
            AssignWednesdayShifts(cadetList, chosenWeek);
        }
    }
}

async function AssignDinnerShifts(cadetList, chosenWeek) {
    cadetList = JSON.parse(fs.readFileSync("./cadets.json", 'utf-8')).cadets ?? JSON.parse(fs.readFileSync("./cadets.json", 'utf-8'))
    dinnerShift = chosenWeek.dinners;
    let baseShifts = await bS();
    for (let i = 0; i < cadetList.length; i++) {
        if (metMinimumNumOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts = await bS(1);
            console.log(`${baseShifts} is the base number of shifts at dinner`);
            // console.log(cadetList);
        }
        if (!fullShifts(dinnerShift.firstDinner, 3)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                chosenWeek.assignShift(3, 1, cadetList[i]);
                // cadetList[i].shiftAmounts++;
            }
        }
        if (!fullShifts(dinnerShift.secondDinner, 2)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                chosenWeek.assignShift(3, 2, cadetList[i]);
                // cadetList[i].shiftAmounts++;
            }
        }
    }
    let checkFirstDinner = !fullShifts(dinnerShift.firstDinner, 3);
    let checkSecondDinner = !fullShifts(dinnerShift.secondDinner, 2);
    let obj = { cadets: cadetList }
    fs.writeFileSync("./cadets.json", JSON.stringify(cadetList))
    if (Array.isArray(dinnerShift.firstDinner)) {
        if (checkFirstDinner && canRepeat) {
            AssignDinnerShifts(cadetList, chosenWeek);
            return;
        }
    }
    if (Array.isArray(dinnerShift.secondDinner)) {
        if (checkSecondDinner && canRepeat) {
            AssignDinnerShifts(cadetList, chosenWeek);
            return;
        }
    }
    if (!checkSecondDinner && !checkFirstDinner) {
        return;
    }
}


async function othersAvailableForLunch(chosenWeek, currentDay, lunch) {
    let overworked = 0;
    let peopleAvailable;
    let baseShifts = await bS();
    let cadetList = JSON.parse(await fs.readFileSync("./cadets.json", 'utf-8')).cadets;
    if (Array.isArray(cadetList)) {
        for (let i = 0; i < cadetList.length; i++) {
            if (i != 0) {
                if ((cadetList[i].lunchTimes[currentDay] == lunch)) {
                    peopleAvailable++;
                }
                if ((cadetList[i].shiftAmounts >= baseShifts) && (cadetList[i].lunchTimes[currentDay] == lunch)) {
                    overworked++;
                }
            }
        }
    }
    if (overworked >= peopleAvailable) {
        return false;
    }
    if (overworked < peopleAvailable) {
        return true;
    }
    if ((overworked == 0) && (peopleAvailable == 0)) {
        return false;
    }
    else {
        return;
    }
}


async function AssignLunchShifts(cadetList, chosenWeek, currentDay) {
    cadetList = JSON.parse(fs.readFileSync("./cadets.json", 'utf-8')).cadets ?? JSON.parse(fs.readFileSync("./cadets.json", 'utf-8'))
    lunchSections = chosenWeek.lunches;
    let baseShifts = await bS();
    for (let i = 0; i < cadetList.length; i++) {
        console.log("Assigning Lunch");
        if (metMinimumNumOfShifts(cadetList) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts = await bS(1);
            console.log(`${baseShifts} is the base number of shifts at lunch`);
        }
        let overWorked = cadetList[i].shiftAmounts >= baseShifts;
        let noOneLeftForFirst = !othersAvailableForLunch(chosenWeek, currentDay, 1);
        let noOneLeftForSecond = !othersAvailableForLunch(chosenWeek, currentDay, 2);
        let noOneLeftForThird = !othersAvailableForLunch(chosenWeek, currentDay, 3);
        // let lunchTime = cadetList[i].lunchTimes[bruh];
        switch (cadetList[i].lunchTimes[currentDay]) {
            case 0:
                if (!chosenWeek.firstLunchFull) {
                    if ((overWorked == false) || noOneLeftForFirst) {
                        chosenWeek.assignShift(2, 1, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                if (!chosenWeek.secondLunchFull) {
                    if ((overWorked == false) || noOneLeftForSecond) {
                        chosenWeek.assignShift(2, 2, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                if (!chosenWeek.thirdLunchFull) {
                    if ((overWorked == false) || noOneLeftForThird) {
                        chosenWeek.assignShift(2, 3, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            case 1:
                if (!chosenWeek.firstLunchFull) {
                    if ((overWorked == false) || noOneLeftForFirst) {
                        chosenWeek.assignShift(2, 1, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            case 2:
                if (!chosenWeek.secondLunchFull) {
                    if ((overWorked == false) || noOneLeftForSecond) {
                        chosenWeek.assignShift(2, 2, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            case 3:
                if (!chosenWeek.thirdLunchFull) {
                    if ((overWorked == false) || noOneLeftForThird) {
                        chosenWeek.assignShift(2, 3, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            default:
                break;
        }
    }

    let firstFull = chosenWeek.firstLunchFull;
    let secondFull = chosenWeek.secondLunchFull;
    let thirdFull = chosenWeek.thirdLunchFull;
    // console.log(`First Lunch has enough? Ans: ${enoughForFirst}. Full Shifts: ${firstLunchFull},\nSecond Lunch is ok? Ans: ${enoughForSecond}. Full Shifts: ${secondLunchFull},\nThird Lunch is ok? Ans: ${enoughForThird}. Full Shifts: ${thirdLunchFull}\n`);
    let runFirstLunchAgain = !firstFull;
    let runSecondLunchAgain = !secondFull;
    let runThirdLunchAgain = !thirdFull;
    let allOk = firstFull && secondFull && thirdFull;
    let obj = { cadets: cadetList }
    fs.writeFileSync("./cadets.json", JSON.stringify(cadetList))
    // console.log(`Should Run Again: 1st) ${runFirstLunchAgain}, 2nd) ${runSecondLunchAgain}, 3rd) ${runThirdLunchAgain}`);
    if (!allOk && canRepeat) {
        if (runFirstLunchAgain) {
            console.log("First Lunch Not Full");
        } else if (runSecondLunchAgain) {
            console.log("Second Lunch Not Full");
        } else if (runThirdLunchAgain) {
            console.log("Third Lunch Not Full");
        }
        AssignLunchShifts(cadetList, chosenWeek, currentDay);
        return;
    }
    if (allOk) {
        return;
    }
}



function fullShifts(shiftSection, totalShifts) {
    if (Array.isArray(shiftSection)) {
        if (shiftSection.length >= totalShifts) {
            return true;
        } else {
            return false;
        }
    }
}


function minimumNumberOfShifts(cadetList) {
    let min = 0;
    for (let i = 0; i < cadetList.length; i++) {
        if ((cadetList[i].shiftAmounts < min) && (cadetList[i].shiftAmounts > 0)) {
            min = cadetList[i].shiftAmounts;
        }
    }
    return min;
}

async function metMinimumNumOfShifts(cadetList) {
    let variations = 0;
    if (Array.isArray(cadetList)) {
        for (let i = 0; i < cadetList.length; i++) {
            if (i != 0) {
                if (cadetList[i].shiftAmounts < await bS()) {
                    variations++;
                }
            }
        }
    }
    if (variations != 0) {
        return false;
    }
    if (variations == 0) {
        console.log("\n\nEveryone has met the minimum number of shifts\n\n");
        return true;
    }
    if (!(variations != 0) && !(variations == 0)) {
        return;
    }
    else {
        return;
    }
}

function createRoster(cadetList, week) {
    for (let l = 0; l < week.length; l++) {
        week[l].clearShifts();
    }
    for (let i = 0; i < 5; i++) {
        if (i != 2) { //2 means that it is a Wednesday
            cadetList = shuffle(cadetList);
            AssignLunchShifts(cadetList, week[i], i);
            AssignBreakfastShifts(cadetList, week[i]);
            AssignDinnerShifts(cadetList, week[i]);

        } else if (i == 2) { //On Wednesday, a different set of shifts are made 
            cadetList = shuffle(cadetList);
            AssignWednesdayShifts(cadetList, week[2]);
            AssignBreakfastShifts(cadetList, week[i]);
            AssignDinnerShifts(cadetList, week[i]);
        }
    }


    for (let j = 0; j < 5; j++) { 
        console.log("\n\n\n\n\n\------------\n");
        console.log(`${week[j].day} has: \n`);
        week[j].displayAllShifts();
    }
}

async function generateWaiterRoster(cadetList, week) {
    console.log("This would generate the roster");
    let baseShifts = await bS();
    console.log(baseShifts);
    for (let j = 0; j < cadetList.length; j++) {
        console.log(`${cadetList[j].cadetName}`);
    }
    let errorMsg;
    let mondayFullLunches;
    let tuesdayFullLunches;
    let thursdayFullLunches;
    let fridayFullLunches;
    for (let i = 0; i < 5; i++) {
        firstLunchPossible = hasEnoughToFillLunch(cadetList, 1, i);
        secondLunchPossible = hasEnoughToFillLunch(cadetList, 2, i);
        thirdLunchPossible = hasEnoughToFillLunch(cadetList, 3, i);
        switch (i) {
            case 0:
                mondayFullLunches = firstLunchPossible && secondLunchPossible && thirdLunchPossible;
                lunchesCovered(mondayFullLunches, i);
                break;
            case 1:
                tuesdayFullLunches = firstLunchPossible && secondLunchPossible && thirdLunchPossible;
                lunchesCovered(tuesdayFullLunches, i);
                break;
            case 2:
                break;
            case 3:
                thursdayFullLunches = firstLunchPossible && secondLunchPossible && thirdLunchPossible;
                lunchesCovered(thursdayFullLunches, i);
                break;
            case 4:
                fridayFullLunches = firstLunchPossible && secondLunchPossible && thirdLunchPossible;
                lunchesCovered(fridayFullLunches, i);
                break;
        }
    }
    let rosterPossible = mondayFullLunches && tuesdayFullLunches && thursdayFullLunches && fridayFullLunches;
    if (rosterPossible) {
        console.log("Creating a roster")
        createRoster(cadetList, week);
    } else {
        console.log("Can't make a roster \n ;(")
    }
}


function hasEnoughToFillLunch(cadetList, shift, day) {
    let possibleCandidates = 0;
    for (let i = 0; i < cadetList.length; i++) {
        if (cadetList[i].lunchTimes[day] == shift) {
            possibleCandidates++;
        }
    }
    if (possibleCandidates >= 3) {
        return true;
    } else {
        return false;
    }
}

function shuffle(array) { //From Stack Overflow ---------------------
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function lunchesCovered(condition, dayNum) {
    if (condition) {
        console.log("Lunches all Covered on Day ", dayNum);
    } else {
        console.log("Not Enough Covered on Day ", dayNum);

    }
}

module.exports = { getLunchTime, toggleRecursive, AssignBreakfastShifts, AssignLunchShifts,
     AssignDinnerShifts, AssignWednesdayShifts, othersAvailableForLunch, fullShifts, lunchesCovered,
    shuffle, hasEnoughToFillLunch, generateWaiterRoster, createRoster, metMinimumNumOfShifts,
     minimumNumberOfShifts, bS }