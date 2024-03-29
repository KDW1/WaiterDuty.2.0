const { all } = require("..");
let Shift = require("./shift")

class Day {
    breakfast = [];
    wednesday = [];

    lunches = {
        firstLunch: [],
        secondLunch: [],
        thirdLunch: []
    };

    dinners = {
        firstDinner: [],
        secondDinner: []
    };

    dayNum = 0;

    attendancePercent = 0;

    allShifts = [];

    timePeriods = [];

    constructor(dayNum) {
        this.dayNum = dayNum;
    }

    checkAttendance() {
        let numOfShifts = 0;
        let numAttended = 0;

        this.allShifts.push(...this.breakfast, ...this.wednesday, ...this.dinners.firstDinner, ...this.dinners.secondDinner);
        this.allShifts.push(...this.lunches.firstLunch, ...this.lunches.secondLunch, ...this.lunches.thirdLunch);


        for(let i = 0; i < this.allShifts.length; i++) {
            numOfShifts++;
            let shift = this.allShifts[i];
            if(shift.attended) {
                numAttended++;
            }
        }

        this.attendancePercent = numAttended/numOfShifts;
    }
    returnArrOfShifts(arr) {
        if(!arr || arr.length == 0) {
            return [];
        }
        let returnArr = []
        arr.forEach((shift) => {
            let data = new Shift();
            data.fromJson(shift);
            returnArr.unshift(data);
        })

        return returnArr;
    }

    returnArrOfShiftsLunch(arr) {
        if(!arr || arr.length == 0) {
            return [];
        }
        let firstLunch = []
        let secondLunch = []
        let thirdLunch = []

        arr.firstLunch.forEach((shift) => {
            let data = new Shift();
            data.fromJson(shift);
            firstLunch.unshift(data);
        })

        arr.secondLunch.forEach((shift) => {
            let data = new Shift();
            data.fromJson(shift);
            secondLunch.unshift(data);
        })

        arr.thirdLunch.forEach((shift) => {
            let data = new Shift();
            data.fromJson(shift);
            thirdLunch.unshift(data);
        })

        return { firstLunch, secondLunch, thirdLunch };
    }

    returnArrOfShiftsDinner(arr) {
        if(!arr || arr.length == 0) {
            return [];
        }
        let firstDinner = []
        let secondDinner = []
        arr.firstDinner.forEach((shift) => {
            let data = new Shift();
            data.fromJson(shift);
            firstDinner.unshift(data);
        })

        arr.secondDinner.forEach((shift) => {
            let data = new Shift();
            data.fromJson(shift);
            secondDinner.unshift(data);
        })
        return { firstDinner, secondDinner };
    }

    fromJson(json) {
        this.breakfast = this.returnArrOfShifts(json.breakfast);
        this.wednesday = this.returnArrOfShifts(json.wednesday);
        this.lunches = this.returnArrOfShiftsLunch(json.lunches);
        this.dinners = this.returnArrOfShiftsDinner(json.dinners);
        this.dayNum = json.dayNum;
        this.timePeriods.push(this.breakfast, this.wednesday, this.lunches.firstLunch, this.lunches.secondLunch, this.lunches.thirdLunch);
        this.timePeriods.push(this.dinners.firstDinner, this.dinners.secondDinner);
    }

    get firstLunchFull() {
        if (this.lunches.firstLunch.length == 3) {
            // console.log("First is Full");
            return true;
        } else {
            // console.log("First isn't Full");
            return false;
        }
    }

    get secondLunchFull() {
        if (this.lunches.secondLunch.length == 3) {
            // console.log("Second is Full");
            return true;
        } else {
            // console.log("Second isn't Full");
            return false;
        }
    }

    get thirdLunchFull() {
        if (this.lunches.thirdLunch.length == 3) {
            // console.log("Third is Full");
            return true;
        } else {
            // console.log("Third isn't Full");
            return false;
        }
    }

    get day() {
        switch (this.dayNum) {
            case 1:
                return "Monday";
                break;
            case 2:
                return "Tuesday";
                break;
            case 3:
                return "Wednesday";
                break;
            case 4:
                return "Thursday";
                break;
            case 5:
                return "Friday";
                break;
        }
    }

    assignShift(timePeriod, shift, cadet) {
        // console.log("Assigning Shift")
        switch (timePeriod) {
            case 1:
                this.breakfast.unshift(new Shift(this.dayNum, timePeriod, shift, cadet.cadetName));
                cadet.shifts.unshift(new Shift(this.dayNum, timePeriod, shift, cadet.cadetName));
                cadet.shiftAmounts++;
                break;
            case 2:
                switch (shift) {
                    case 1:
                        let shiftData = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.lunches.firstLunch.unshift(shiftData);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftData);
                        }
                        cadet.shiftAmounts++;
                        break;
                    case 2:
                        let shiftDataSec = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.lunches.secondLunch.unshift(shiftDataSec);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftDataSec);
                        }
                        cadet.shiftAmounts++;
                        break;
                    case 3:
                        let shiftDataThir = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.lunches.thirdLunch.unshift(shiftDataThir);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftDataThir);
                        }
                        cadet.shiftAmounts++;
                        break;
                }
                break;
            case 3:
                switch (shift) {
                    case 1:
                        let shiftData = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.dinners.firstDinner.unshift(shiftData);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftData);
                        }
                        cadet.shiftAmounts++;
                        break;
                    case 2:
                        let shiftDataSec = new Shift(this.dayNum, timePeriod, shift, cadet.cadetName);
                        this.dinners.secondDinner.unshift(shiftDataSec);
                        if (Array.isArray(cadet.shifts)) {
                            cadet.shifts.unshift(shiftDataSec);
                        }
                        cadet.shiftAmounts++;
                        break;
                }
                break;
            case 4:
                this.wednesday.unshift(new Shift(this.dayNum, timePeriod, shift, cadet.cadetName));
                cadet.shifts.unshift(new Shift(this.dayNum, timePeriod, shift, cadet.cadetName));
                cadet.shiftAmounts++;
                break;
        }
    }

    logShift(shift) {
        if (shift != null) {
            let message = shift.description;
            console.log(message);
        } else {
            console.log("No one was available for this shift. :(");
        }
    }

    displayAllShifts() {
        for (let i = 0; i < 5; i++) {
            console.log("Breakfast---------");
            this.logShift(this.breakfast[i]);
        }
        if (this.day == "Wednesday") {
        }
            for (let i = 0; i < 7; i++) {
                if (this.wednesday.length > 0) {
                    console.log("Wednesday Lunch---------");

                    this.logShift(this.wednesday[i]);
                }
            }
            if (this.day != "Wednesday") {
                for (let i = 0; i < 3; i++) {
                    console.log("First Lunch---------");
                    this.logShift(this.lunches.firstLunch[i]);
                }
                for (let i = 0; i < 3; i++) {
                    console.log("Second Lunch---------");
                    this.logShift(this.lunches.secondLunch[i]);
                }
                for (let i = 0; i < 3; i++) {
                    console.log("Third Lunch---------");
                    this.logShift(this.lunches.thirdLunch[i]);
                }
            }
            for (let i = 0; i < 3; i++) {
                console.log("First Dinner---------");
                this.logShift(this.dinners.firstDinner[i]);
            }
            for (let i = 0; i < 2; i++) {
                console.log("Second Dinner---------");
                this.logShift(this.dinners.secondDinner[i]);
            }
        }

        clearShifts() {
            this.breakfast = [];
            this.dinners.firstDinner = [];
            this.dinners.secondDinner = [];
            if (this.day == "Wednesday") {
                this.wednesday = []
            } else {
                this.lunches.firstLunch = [];
                this.lunches.secondLunch = [];
                this.lunches.thirdLunch = [];
            }
    }
}

module.exports = Day