const Day = require("./day")

class Roster {

    monday = new Day() 
    tuesday = new Day()
    wednesday = new Day()
    thursday = new Day()
    friday = new Day()
    attendancePercent = 0;
    days = [];

    constructor(monday = new Day(1), tuesday = new Day(2), wednesday = new Day(3), thursday = new Day(4), friday = new Day(5)) {
        this.monday = monday
        this.tuesday = tuesday
        this.wednesday = wednesday
        this.thursday = thursday
        this.friday = friday
        this.days.push(this.monday, this.tuesday, this.wednesday, this.thursday, this.friday)
        this.attendancePercent = 0
    }

    checkAttendance() {
        let percent = 0;
        // console.log("Checking attendance");
        this.days.forEach((day) => {
            // console.log("Day: " + day.dayNum);
            day.checkAttendance();
            percent += day.attendancePercent;
        })
        // console.log("Percent %: " + percent);
        this.attendancePercent = percent/5;
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