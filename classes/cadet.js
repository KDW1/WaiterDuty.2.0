class Cadet {
    cadetName = "";
    lunchTimes = [];
    parsedLunchTimes = [];
    shiftAmounts = 0;
    shifts = [];


    constructor(cadetName, mon, tues, thurs, fri) {
        this.cadetName = cadetName;
        this.lunchTimes.unshift(mon, tues, 0, thurs, fri);
        this.shiftAmounts = 0;
        this.shifts = [];
        for(let i = 0; i < this.lunchTimes.length; i++) {
            this.parsedLunchTimes.push(this.getLunchTime(this.lunchTimes[i]))
        }
        console.log(this.cadetName)
        console.log(this.parsedLunchTimes)
    }

    
    fromJson(json) {
        Object.assign(this, json);
    }

    
    getLunchTime(num) {
        console.log(num)
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
                return "Can't Make It"
        }
    }
 
    get parsedLunchTimes() {
        let parsedLunchTimes = [];
        for(let i = 0; i < parsedLunchTimes.length; i++) {
            parsedLunchTimes.push(getLunchTime(this.lunchTimes[i]))
        }
        return parsedLunchTimes;
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