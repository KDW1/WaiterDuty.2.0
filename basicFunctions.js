let fs = require("fs")
const Day = require('./classes/day')
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


function weekInteraction(week = null) {
    let data = JSON.parse(fs.readFileSync("./roster.json", "utf-8"))
    let weekToReturn = data
    if(week == null) {
        weekToReturn = data.rosters
        return weekToReturn
    } 
    let days = ["monday","tuesday","wednesday","thursday","friday"]
    console.log("Rosters:")
    console.log(weekToReturn.rosters[days[week.dayNum-1]])
    weekToReturn.rosters[days[week.dayNum-1]] = week;
    fs.writeFileSync("./roster.json", JSON.stringify(weekToReturn))
}
// async function bS(change = 0) {
//     let amt = JSON.parse(await fs.readFileSync("./baseShifts.json", 'utf-8'));
//     if(change == 0) {
//         return amt;
//     }
//     amt += change;
//     amt = JSON.stringify(amt);
//     await fs.writeFileSync("./baseShifts.json", amt);
//     return amt
// }

let canRepeat = true;

function toggleRecursive() {
    canRepeat = !canRepeat;
    console.log("Can Repeat: ", canRepeat);
}

function AssignBreakfastShifts(cadetList, week, baseShifts, dayNum) {
    // Return base shifts, cadet array and the week/roster
    // data = await weekInteraction(); ---- Week will be passed in
    let days = ["monday","tuesday","wednesday","thursday","friday"]
    let currentDay = week[days[dayNum]];
    // console.log(data[0])
    // Object.assign(chosenWeek, data[0][days[currentDay]])
    for (let i = 0; i < cadetList.length; i++) {
        let metTheMinimum = metMinimumNumOfShifts(cadetList, baseShifts)
        console.log(`Has everyone met the minimum number of shifts: ${metTheMinimum}`)
        if ( metTheMinimum && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            // baseShifts = await bS(1) 
            baseShifts++;
            console.log(cadetList);
            console.log(`\n\n${baseShifts} is the base number of shifts at breakfast\n\n`);
            // console.log(cadetList);
        }
        if (!fullShifts(currentDay.breakfast, 5)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                currentDay.assignShift(1, 1, cadetList[i]);
                // console.log(`${cadetList[i].cadetName} assigned shift, taking ${cadetList[i].shiftAmounts} shifts`);
            }
        }
    }
    // let obj = { cadets: cadetList }
    // chosenWeek.breakfast = breakfastShift;
    // await weekInteraction(chosenWeek);
    // fs.writeFileSync("./cadets.json", JSON.stringify(cadetList))
    week[days[dayNum]] = currentDay;
    if (Array.isArray(currentDay.breakfast)) {
        if (!fullShifts(currentDay.breakfast, 5) && canRepeat) {
            AssignBreakfastShifts(cadetList, week, baseShifts, dayNum);
        } else {
            return [cadetList, week, baseShifts];
        }
    }
}

function AssignWednesdayShifts(cadetList, week, baseShifts, dayNum) {
    let days = ["monday","tuesday","wednesday","thursday","friday"]
    let currentDay = week[days[dayNum]];
    for (let i = 0; i < cadetList.length; i++) {
        let metTheMinimum = metMinimumNumOfShifts(cadetList, baseShifts)
        if (metTheMinimum && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
            console.log(`${baseShifts} is the base number of shifts at breakfast`);
            // console.log(cadetList);
        }
        if (!fullShifts(currentDay.wednesday, 7)) {
            if (cadetList[i].shiftAmounts < baseShifts) {
                currentDay.assignShift(4, 1, cadetList[i]);
                // cadetList[i].shiftAmounts++;
                // console.log(`${cadetList[i].cadetName} assigned shift, taking ${cadetList[i].shiftAmounts} shifts`);
            }
        }
    }
    // let obj = { cadets: cadetList }
    // await weekInteraction(chosenWeek);
    // fs.writeFileSync("./cadets.json", JSON.stringify(obj))
    week[days[dayNum]] = currentDay;
    if (Array.isArray(currentDay.wednesday)) {
        if (!fullShifts(currentDay.wednesday, 7) && canRepeat) {
            AssignWednesdayShifts(cadetList, week, baseShifts, dayNum);
        } else {
            console.log([cadetList, week, baseShifts])
            return [cadetList, week, baseShifts];
        }
    }
}

function AssignDinnerShifts(cadetList, chosenWeek) {
    dinnerShift = new Day();
    Object.assign(chosenWeek, data)
    cadetList = JSON.parse(fs.readFileSync("./cadets.json", 'utf-8')).cadets ?? JSON.parse(fs.readFileSync("./cadets.json", 'utf-8'))
    dinnerShift = chosenWeek.dinners;
    for (let i = 0; i < cadetList.length; i++) {
        if (metMinimumNumOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
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


function othersAvailableForLunch(chosenWeek, currentDay, lunch, baseShifts, cadetList) {
    let overworked = 0;
    let peopleAvailable;
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


function AssignLunchShifts(cadetList, week, baseShifts, dayNum) {
    let days = ["monday","tuesday","wednesday","thursday","friday"]
    let currentDay = week[days[dayNum]];
    for (let i = 0; i < cadetList.length; i++) {
        if (metMinimumNumOfShifts(cadetList, baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
            console.log(`${baseShifts} is the base number of shifts at lunch`);
        }
        let overWorked = cadetList[i].shiftAmounts >= baseShifts;
        //For each 'availableForLunch' need to add a baseShifts parameter
        let noOneLeftForFirst = !othersAvailableForLunch(week, currentDay, 1, baseShifts, cadetList);
        let noOneLeftForSecond = !othersAvailableForLunch(week, currentDay, 2, baseShifts, cadetList);
        let noOneLeftForThird = !othersAvailableForLunch(week, currentDay, 3, baseShifts, cadetList);
        /* In the future, refine this function as people with free blocks or lunchTime 0,
         aren't necessarily used most efficiently, in spots that others can't fill, currently
         there's a failsafe where if no one else is available for a shift
         (under the condition that they've all met the base amount), someone will bare a heavier load */

        switch (cadetList[i].lunchTimes[dayNum]) {
            case 0:
                if (!currentDay.firstLunchFull) {
                    if ((overWorked == false) || noOneLeftForFirst) {
                        currentDay.assignShift(2, 1, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                if (!currentDay.secondLunchFull) {
                    if ((overWorked == false) || noOneLeftForSecond) {
                        currentDay.assignShift(2, 2, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                if (!currentDay.thirdLunchFull) {
                    if ((overWorked == false) || noOneLeftForThird) {
                        currentDay.assignShift(2, 3, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            case 1:
                if (!currentDay.firstLunchFull) {
                    if ((overWorked == false) || noOneLeftForFirst) {
                        currentDay.assignShift(2, 1, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            case 2:
                if (!currentDay.secondLunchFull) {
                    if ((overWorked == false) || noOneLeftForSecond) {
                        currentDay.assignShift(2, 2, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            case 3:
                if (!currentDay.thirdLunchFull) {
                    if ((overWorked == false) || noOneLeftForThird) {
                        currentDay.assignShift(2, 3, cadetList[i]);
                        // cadetList[i].shiftAmounts++;
                    }
                }
                break;
            default:
                break;
        }
    }

    let firstFull = currentDay.firstLunchFull;
    let secondFull = currentDay.secondLunchFull;
    let thirdFull = currentDay.thirdLunchFull;
    // console.log(`First Lunch has enough? Ans: ${enoughForFirst}. Full Shifts: ${firstLunchFull},\nSecond Lunch is ok? Ans: ${enoughForSecond}. Full Shifts: ${secondLunchFull},\nThird Lunch is ok? Ans: ${enoughForThird}. Full Shifts: ${thirdLunchFull}\n`);
    let runFirstLunchAgain = !firstFull;
    let runSecondLunchAgain = !secondFull;
    let runThirdLunchAgain = !thirdFull;
    let allOk = firstFull && secondFull && thirdFull;
    week[days[dayNum]] = currentDay;
    // console.log(`Should Run Again: 1st) ${runFirstLunchAgain}, 2nd) ${runSecondLunchAgain}, 3rd) ${runThirdLunchAgain}`);
    if (!allOk && canRepeat) {
        if (runFirstLunchAgain) {
            console.log("First Lunch Not Full on Day:" + dayNum);
        } else if (runSecondLunchAgain) {
            console.log("Second Lunch Not Full on Day:" + dayNum);
        } else if (runThirdLunchAgain) {
            console.log("Third Lunch Not Full on Day:" + dayNum);
        }
        AssignLunchShifts(cadetList, week, baseShifts, dayNum);
        return;
    }
    if (allOk) {
        return [cadetList, week, baseShifts];
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

function metMinimumNumOfShifts(cadetList, baseShifts) {
    let variations = 0;
    if (Array.isArray(cadetList)) {
        for (let i = 0; i < cadetList.length; i++) {
            if (i != 0) {
                if (cadetList[i].shiftAmounts < baseShifts) {
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
    let baseShifts = 1;
    for (let l = 0; l < week.length; l++) {
        week[l].clearShifts();
    }
    // for (let i = 0; i < 5; i++) {
    //     if (i != 2) { //2 means that it is 
    //         console.log("Cadet List:")
    //         console.log(cadetList)
    //         cadetList = shuffle(cadetList);
    //         // await AssignLunchShifts(cadetList, week[i], i);
    //         [cadetList, week, baseShifts] = AssignBreakfastShifts(cadetList, week, baseShifts, i);
    //         [cadetList, week, baseShifts] = AssignLunchShifts(cadetList, week, baseShifts, i);
    //         // console.log(results)
    //     } else if (i == 2) { //On Wednesday, a different set of shifts are made 
    //         cadetList = shuffle(cadetList);
    //         [cadetList, week, baseShifts] = AssignBreakfastShifts(cadetList, week, baseShifts, 2);
    //         console.log("Breakfast is done and data present:" + (cadetList != undefined));
    //         [cadetList, week, baseShifts] = AssignWednesdayShifts(cadetList, week, baseShifts, 2);
    //     }
    // }
    // console.log("Cadets:")
    // console.log(cadetList)
    console.log("Rosters:")
    console.log(week)
    // for(day in week) {
    //     console.log(`\n\n${day}`)
    //     console.log(week[day])
    // }
    console.log("Done")


    // for (let j = 0; j < 5; j++) { 
    //     console.log("\n\n\n\n\n\------------\n");
    //     console.log(`${week[j].day} has: \n`);
    //     week[j].displayAllShifts();
    // }
}

function generateWaiterRoster(cadetList, week) {
    console.log("This would generate the roster");
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
    console.log(array)
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
     minimumNumberOfShifts }