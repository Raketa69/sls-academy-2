import fs from 'fs'

let data = []
data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))//.map(Object.values);

let newData = []
let tmp = []

for (let user of data) {

    tmp = data.filter(word => user.user._id == word.user._id)
    let tmpData = { userId: tmp[0].user._id, userName: tmp[0].user.name }
    if (tmp.length > 1 && newData.findIndex(test => test.userId == tmpData.userId) == -1) {

        let vacations = []
        for (let vacation of tmp) {
            let tmpVacation = {
                startDate: vacation.startDate,
                endDate: vacation.endDate
            }

            if (vacations.findIndex(test => test.startDate == tmpVacation.startDate) == -1)
                vacations.push(tmpVacation)
        }
        newData.push({
            userId: user.user._id,
            userName: user.user.name,
            vacations: JSON.stringify(vacations)
        })

    }
    if (newData.findIndex(test => test.userId == tmpData.userId) == -1) {
        newData.push({
            userId: user.user._id,
            userName: user.user.name,
            vacations: JSON.stringify([{ startDate: user.startDate, endDate: user.endDate }])
        })
    }
}

console.log(newData);