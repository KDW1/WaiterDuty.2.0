

let cadetList = [];

// EJS response for warning text, after failure to create roster
let warningText = document.getElementById("warningText");
warningText.style.display = "none";

let deleteButtons = document.getElementsByClassName("delete-cell");

let dailyTables = ["mondayTable", "tuesdayTable", "wednesdayTable", "thursdayTable", "fridayTable"];

// Will remain in 'main.js'
function makeRowBasedOnShifts(dayNum, shifts, timePeriod) {
    let tableToAddTo = document.getElementById(dailyTables[dayNum-1]);
    let listOfCadetsOnShift = "";
    for (let i = 0; i < shifts.length; i++) {
        if (i != (shifts.length - 1)) {
            listOfCadetsOnShift += shifts[i].assignedPerson + ", ";
        } else {
            listOfCadetsOnShift += shifts[i].assignedPerson;
        }
    }
    let row = document.createElement("tr");
    let rowContent = `<th>${timePeriod}</th><th>${listOfCadetsOnShift}</th>`;
    row.append(rowContent);
    tableToAddTo.innerHTML += rowContent;
}

// Bring to 'index.js'
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

// Won't use yet
// function toggleDay(day) {
//     let cellsOfDay = document.getElementsByClassName(day);
//     console.log(`Day: ${day}`);
//     for (let i = 0; i < cellsOfDay.length; i++) {
//         if (cellsOfDay[i].classList.contains("text-white")) {
//             cellsOfDay[i].classList.remove("text-white");
//             cellsOfDay[i].classList.remove("bg-dark");
//         } else {
//             cellsOfDay[i].classList.add("text-white");
//             cellsOfDay[i].classList.add("bg-dark");

//         }
//     }
// }

// Won't be necessary if I use a cadetList variable thats passed in
function createRowBasedOnCadet(cadet) {
    let tableBody = document.getElementById("tableBody");
    let row = document.createElement("tr");
    row.id = cadet.cadetName;
    console.log(row.tagName);
    let rowContent = `<th class = "${cadet.cadetName}">${cadet.cadetName}</th><th>|</th>`;
    let monContent = `<th class = "monday ${getLunchTime(cadet.lunchTimes[0]).replace(/ /g, "")}">${getLunchTime(cadet.lunchTimes[0])}</th>`;
    let tuesContent = `<th class = "tuesday ${getLunchTime(cadet.lunchTimes[1]).replace(/ /g, "")}">${getLunchTime(cadet.lunchTimes[1])}</th>`;
    let thursContent = `<th class = "thursday ${getLunchTime(cadet.lunchTimes[3]).replace(/ /g, "")}">${getLunchTime(cadet.lunchTimes[3])}</th>`;
    let friContent = `<th class = "friday ${getLunchTime(cadet.lunchTimes[4]).replace(/ /g, "")}">${getLunchTime(cadet.lunchTimes[4])}</th>`;
    rowContent += monContent + tuesContent + thursContent + friContent;
    rowContent += "<th><button class='btn btn-sm rounded-circle px-2 btn-danger delete-cell'><span class='icon'><i class='fa-solid fa-lg fa-xmark'></i></span></button></th>";
    row.append(rowContent);
    tableBody.innerHTML += rowContent;
    updateDeleteButtons();
}

// Will stay in 'main.js'
function presetCadetList() { //To be called from the console | 0 -> "Free Lunch Period" | 5 -> "Not Available"
    console.log("\nLoading Preset Cadet List");
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
}

// Will become backend function
function clearCadetList() {
    console.log("\nClearing Cadet List");
    cadetList = [];
}

// Will become backend function to remove cadet from cadetlist
// function updateDeleteButtons() {
//     deleteButtons = document.getElementsByClassName("delete-cell");
//     console.log(`${deleteButtons.length} Delete Buttons`);
//     for (let j = 0; j < deleteButtons.length; j++) {
//         console.log(j);
//         console.log(deleteButtons[j].classList);
//         deleteButtons[j].addEventListener("click", () => {
//             let targetElement = event.target || event.srcElement;
//             let rowParent = targetElement.parentNode;
//             while (rowParent.tagName != "TR") {
//                 rowParent = rowParent.parentNode;
//             }
//             let lookingFor = rowParent.firstChild.innerText;
//             console.log(lookingFor);
//             cadetList.splice(cadetList.findIndex(data => data.name == lookingFor), 1);
//             rowParent.remove();
//         });
//     }
// }

// Roster creation will be handled in the backend, hence functions like this
function returnLunchTime(inputedVal) {
    switch (inputedVal) {
        case "1st Lunch":
            return 1;
            break;
        case "2nd Lunch":
            return 2;
            break;
        case "3rd Lunch":
            return 3;
            break;
        case "Free":
            return 0;
            break;
        case "None Available":
            return 5;
            break;
    }
}

// Left here
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

// Will just clear cadet list in backend
// function clearTable() {
//     let tableBody = document.getElementById("tableBody");
//     tableBody.innerHTML = "";
//     cadetList = "";
// }

// Will leave local storage functions for now

function updateStudents() {
    let tableBody = document.getElementById("tableBody");
    localStorage.setItem("tableBodyContent", tableBody.innerHTML);
    localStorage.setItem("Cadet List", JSON.stringify(cadetList));
}

function clearEntries() {
    localStorage.setItem("tableBodyContent", "");
    localStorage.setItem("Cadet List", "");
}

function viewPastEntries() {
    let tableBodyContent = localStorage.getItem("tableBodyContent");
    let tableBody = document.getElementById("pastEntries");
    tableBody.innerHTML = tableBodyContent;
}

function loadStudents() {
    let tableBodyContent = localStorage.getItem("tableBodyContent");
    let tableBody = document.getElementById("tableBody");
    cadetList = JSON.parse(localStorage.getItem("Cadet List"));
    cadetList.forEach(() => {

    });
    tableBody.innerHTML = tableBodyContent;
    console.log("Updating");
    updateDeleteButtons();

}

// Will no longer be necessary with backend functionality
// function getCadetInfo() {
//     //console.log("Testing...Testing...1.2.3...");

//     let mondaySelect = document.getElementById("monLunch");
//     let tuesdaySelect = document.getElementById("tuesLunch");
//     let thursdaySelect = document.getElementById("thursLunch");
//     let fridaySelect = document.getElementById("friLunch");

//     let cadetName = document.getElementById("cadetName").value;
//     let monLunch = (mondaySelect.value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("monLunch").value;
//     let tuesLunch = (tuesdaySelect.value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("tuesLunch").value;
    // let thursLunch = (thursdaySelect.value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("thursLunch").value;
    // let friLunch = (fridaySelect.value == "Daily Lunches") ? "No Reported Lunch" : document.getElementById("friLunch").value;

    // let proceedFurther = true;

    // if (monLunch == "No Reported Lunch") {
    //     proceedFurther = false;
    // } else if (tuesLunch == "No Reported Lunch") {
    //     proceedFurther = false;
    // } else if (thursLunch == "No Reported Lunch") {
    //     proceedFurther = false;
    // } else if (friLunch == "No Reported Lunch") {
    //     proceedFurther = false;
    // } else if (cadetName == "") {
    //     proceedFurther = false;
    // }

    // let canProceedFurther = proceedFurther;

    // document.getElementById("cadetName").value = "";
    // document.getElementById("monLunch").value = "Daily Lunches";
//     document.getElementById("tuesLunch").value = "Daily Lunches";
//     document.getElementById("thursLunch").value = "Daily Lunches";
//     document.getElementById("friLunch").value = "Daily Lunches";

//     if (canProceedFurther) {
//         let monNumber = returnLunchTime(monLunch);
//         let tuesNumber = returnLunchTime(tuesLunch);
//         let thursNumber = returnLunchTime(thursLunch);
//         let friNumber = returnLunchTime(friLunch);

//         console.log("Added a Cadet");
//         let newCadet = new Cadet(cadetName, monNumber, tuesNumber, thursNumber, friNumber);
//         newCadet.printInfo();
//         updateDeleteButtons();
//         cadetList.unshift(newCadet);

//         createRowBasedOnCadet(newCadet);
//     } else if (canProceedFurther == false) {
//         console.log("Error");
//         alert("Modal Form failed. Have to complete all fields");
//     }
// }

// General Waiter Duty Program -------------------------------





// Brought to backend
let week = [];
let mon = new Day(1);
let tues = new Day(2);
let wed = new Day(3);
let thur = new Day(4);
let fri = new Day(5);
let baseShifts = 1; //base number of shifts

week.unshift(mon, tues, wed, thur, fri);
//Iterate throug lunch


// Toggle Recursive, assigning functions all to backend
// ---------
let canRepeat = true;

function toggleRecursive() {
    canRepeat = !canRepeat;
    console.log("Can Repeat: ", canRepeat);
}
function AssignBreakfastShifts(cadetList, chosenWeek) {
    breakfastShift = chosenWeek.breakfast;
    for (let i = 0; i < cadetList.length; i++) {
        if (metMinimumNumOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
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
    if (Array.isArray(breakfastShift)) {
        if (!fullShifts(breakfastShift, 5) && canRepeat) {
            AssignBreakfastShifts(cadetList, chosenWeek);
        }
    }
}

function AssignWednesdayShifts(cadetList, chosenWeek) {
    wednesdayShift = chosenWeek.wednesday;
    for (let i = 0; i < cadetList.length; i++) {
        if (metMinimumNumOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
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
    if (Array.isArray(wednesdayShift)) {
        if (!fullShifts(wednesdayShift, 7) && canRepeat) {
            AssignWednesdayShifts(cadetList, chosenWeek);
        }
    }
}

function AssignDinnerShifts(cadetList, chosenWeek) {
    dinnerShift = chosenWeek.dinners;
    for (let i = 0; i < cadetList.length; i++) {
        if (metMinimumNumOfShifts(cadetList) && (cadetList[i].shiftAmounts == baseShifts) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
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


function othersAvailableForLunch(chosenWeek, currentDay, lunch) {
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


function AssignLunchShifts(cadetList, chosenWeek, currentDay) {
    lunchSections = chosenWeek.lunches;
    for (let i = 0; i < cadetList.length; i++) {
        console.log("Assigning Lunch");
        if (metMinimumNumOfShifts(cadetList) && (cadetList[i].shiftAmounts != 0)) {
            baseShifts++;
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

function metMinimumNumOfShifts(cadetList) {
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

function createRoster() {
    for (let l = 0; l < week.length; l++) {
        week[l].clearShifts();
    }
    for (let i = 0; i < 5; i++) {
        if (i != 2) { //2 means that it is a Wednesday
            shuffle(cadetList);
            AssignLunchShifts(cadetList, week[i], i);
            AssignBreakfastShifts(cadetList, week[i]);
            AssignDinnerShifts(cadetList, week[i]);

        } else if (i == 2) { //On Wednesday, a different set of shifts are made 
            shuffle(cadetList);
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
// --------

// Need to examine this function before I move to backend, may not be necessary
function generateWaiterRoster() {
    console.log("This would generate the roster");
    for (let j = 0; j < cadetList.length; j++) {
        console.log(`${cadetList[j].cadetName}`);
    }
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
        warningText.style.display = "none";
        createRoster();
    } else {
        warningText.style.display = "block";
        setTimeout(() => {
            warningText.style.display = "none";
        }, 2000);
    }
}

// Backend func
function lunchesCovered(condition, dayNum) {
    if (condition) {
        console.log("Lunches all Covered on Day ", dayNum)
    } else {
        console.log("Not Enough Covered on Day ", dayNum)
    }
}