class Cadet {
    cadetName = "";
    lunchTimes = [];
    shiftAmounts = 0;
    shifts = [];


    constructor(cadetName, mon, tues, thurs, fri) {
        this.cadetName = cadetName;
        this.lunchTimes.unshift(mon, tues, 0, thurs, fri);
        this.shiftAmounts = 0;
        this.shifts = [];
    }

    printInfo() {
        for (let i = 0; i < this.lunchTimes.length; i++) {
            switch (this.lunchTimes[i]) {
                case 0:
                    console.log(`${this.cadetName} has a Free 3rd Period on Day: ${i}`);
                    break;
                case 1:
                    console.log(`${this.cadetName} has 1st Lunch on Day: ${i}`);
                    break;
                case 2:
                    console.log(`${this.cadetName} has 2nd Lunch on Day: ${i}`);
                    break;
                case 3:
                    console.log(`${this.cadetName} has 3rd Lunch on Day: ${i}`);
                    break;
                case 5:
                    console.log(`${this.cadetName} has No Available Lunch on Day: ${i}`);
                    break;
            }
        }
    }
}

module.exports = Cadet