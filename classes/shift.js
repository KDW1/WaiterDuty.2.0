class Shift {
    dayNum = 0;
    timePeriod = 0;
    shift = 0;
    assignedPerson = "";
    attended = true;

    constructor(dayNum, timePeriod, shift, cadetName, attended = true) {
        this.dayNum = dayNum;
        this.timePeriod = timePeriod;
        this.shift = shift;
        this.assignedPerson = cadetName;
        this.attended = attended;
    }
    
    fromJson(json) {
        this.dayNum = json.dayNum;
        this.timePeriod = json.timePeriod;
        this.shift = json.shift;
        this.assignedPerson = json.assignedPerson;
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

    get period() {
        switch (this.timePeriod) {
            case 1:
                return "Breakfast";
                break;
            case 2:
                switch (this.shift) {
                    case 1:
                        return "1st Lunch";
                        break;
                    case 2:
                        return "2nd Lunch";
                        break;
                    case 3:
                        return "3rd Lunch";
                        break;
                    default:
                        return "a time unspecified.";
                        break;
                }
                break;
            case 3:
                switch (this.shift) {
                    case 1:
                        return "the 1st Dinner Shift";
                        break;
                    case 2:
                        return "the 2nd Dinner Shift";
                        break;
                    default:
                        return "a time unspecified.";
                        break;
                }
                break;
            case 4:
                return "Wednesday Lunch";
                break;
            default:
                return "a time unspecified.";
                break;
        }
    }

    get description() {
        console.log(`On ${this.day} | ${this.assignedPerson} has waiter duty during ${this.period}\n`);
    }
}

module.exports = Shift