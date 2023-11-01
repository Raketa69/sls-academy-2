import fs from 'fs'


let startTime
let endTime
let executionTimeTask = 0
let executionAllTime = 0
let data = []
let array20 = []
let bigArray = []

//  Get Data from files
for (let i = 0; i < 20; ++i) {
    data.push(fs.readFileSync(`./files/out${i}.txt`, 'utf8'))
}
for (let i = 0; i < 20; ++i) {
    array20.push(data[i].split(/\s+/))
}
bigArray = bigArray.concat(...array20)


//1
let uniqueBigArray
function uniqueValues() {
    uniqueBigArray = [...new Set(bigArray)]
    return uniqueBigArray.length
}

//2
let uniqueArray20 = []
function existInAllFiles() {


    let uniqueBigSet = new Set(uniqueBigArray)

    for (let i = 0; i < 20; ++i) {
        uniqueArray20.push([...new Set(array20[i])])
    }

    for (let i = 0; i < 20; i++) {

        let uniqueBigSet20 = new Set(uniqueArray20[i])

        uniqueBigSet.forEach(username => {
            if (!uniqueBigSet20.has(username)) {
                uniqueBigSet.delete(username)
            }
        });
    }

    return uniqueBigSet.size
}

//3
function existInAtleastTen() {

    let countMap = new Map()
    let counter = 0

    for (let i = 0; i < 20; i++) {
        let uniqueArray20Set = new Set(uniqueArray20[i])

        uniqueArray20Set.forEach(word => {
            if (!countMap.has(word)) {
                countMap.set(word, 1)
            } else {
                countMap.set(word, countMap.get(word) + 1);
            }
        });
    }
    for (let count of countMap.values()) {
        if (count >= 10) {
            counter++
        }
    }
    return counter
}


startTime = performance.now()
console.log("Unique usernames: ", uniqueValues())
endTime = performance.now()
executionTimeTask = endTime-startTime
console.log("Time: ", +executionTimeTask)
executionAllTime+=executionTimeTask

startTime = performance.now()
console.log("\nUnique usernames in all 20 files: ", existInAllFiles())
endTime = performance.now()
executionTimeTask = endTime-startTime
console.log("Time: ", +executionTimeTask)
executionAllTime+=executionTimeTask

startTime = performance.now()
console.log("\nUnique usernames occur in at least 10 files: ", existInAtleastTen())
endTime = performance.now()
executionTimeTask = endTime-startTime
console.log("Time: ", +executionTimeTask)
executionAllTime+=executionTimeTask

console.log("\nAll execution time: ", executionAllTime);