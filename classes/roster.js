const Day = require("./day")

class Roster {

    monday = new Day() 
    tuesday = new Day()
    wednesday = new Day()
    thursday = new Day()
    friday = new Day()

    constructor(monday = new Day(), tuesday = new Day(), wednesday = new Day(), thursday = new Day(), friday = new Day()) {
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