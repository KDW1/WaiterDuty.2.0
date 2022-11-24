const Day = require("./day")

class Roster {

    monday = new Day() 
    tuesday = new Day()
    wednesday = new Day()
    thursday = new Day()
    friday = new Day()

    constructor(monday = new Day(1), tuesday = new Day(2), wednesday = new Day(3), thursday = new Day(4), friday = new Day(5)) {
        this.monday = monday
        this.tuesday = tuesday
        this.wednesday = wednesday
        this.thursday = thursday
        this.friday = friday
    }

    fromJson(json) {
        this.monday.fromJson(json.monday);
        this.tuesday.fromJson(json.tuesday);
        this.wednesday.fromJson(json.wednesday);
        this.thursday.fromJson(json.thursday);
        this.friday.fromJson(json.friday); 
    }
}

module.exports = Roster