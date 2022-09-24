class Roster {

    monday = []
    tuesday = []
    wednesday = []
    thursday = []
    friday = []

    constructor(monday = [], tuesday = [], wednesday = [], thursday = [], friday = []) {
        this.monday = monday
        this.tuesday = tuesday
        this.wednesday = wednesday
        this.thursday = thursday
        this.friday = friday
    }
}

module.exports = Roster