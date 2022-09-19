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

    constructor(dayNum) {
        this.dayNum = dayNum;
    }

    get firstLunchFull() {
        if (this.lunches.firstLunch.length == 3) {
            return true;
        } else {
            return false;
        }
    }

    get secondLunchFull() {
        if (this.lunches.secondLunch.length == 3) {
            return true;
        } else {
            return false;
        }
    }

    get thirdLunchFull() {
        if (this.lunches.thirdLunch.length == 3) {
            return true;
        } else {
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
        makeRowBasedOnShifts(this.dayNum, this.breakfast, "Breakfast");
        for (let i = 0; i < 5; i++) {
            console.log("Breakfast---------");
            this.logShift(this.breakfast[i]);
        }
        if (this.day == "Wednesday") {
            makeRowBasedOnShifts(this.dayNum, this.wednesday, "Wednesday Lunch");
        }
            for (let i = 0; i < 7; i++) {
                if (this.wednesday.length > 0) {
                    console.log("Wednesday Lunch---------");

                    this.logShift(this.wednesday[i]);
                }
            }
            if (this.day != "Wednesday") {
                makeRowBasedOnShifts(this.dayNum, this.lunches.firstLunch, "1st Lunch");
                for (let i = 0; i < 3; i++) {
                    console.log("First Lunch---------");
                    this.logShift(this.lunches.firstLunch[i]);
                }
                makeRowBasedOnShifts(this.dayNum, this.lunches.secondLunch, "2nd Lunch");
                for (let i = 0; i < 3; i++) {
                    console.log("Second Lunch---------");
                    this.logShift(this.lunches.secondLunch[i]);
                }
                makeRowBasedOnShifts(this.dayNum, this.lunches.thirdLunch, "3rd Lunch");
                for (let i = 0; i < 3; i++) {
                    console.log("Third Lunch---------");
                    this.logShift(this.lunches.thirdLunch[i]);
                }
            }
            makeRowBasedOnShifts(this.dayNum, this.dinners.firstDinner, "1st Dinner");
            for (let i = 0; i < 3; i++) {
                console.log("First Dinner---------");
                this.logShift(this.dinners.firstDinner[i]);
            }
            makeRowBasedOnShifts(this.dayNum, this.dinners.secondDinner, "2nd Dinner");
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