import axios from 'axios';

const urls = [
    "https://jsonbase.com/sls-team/json-793",
    "https://jsonbase.com/sls-team/json-955",
    "https://jsonbase.com/sls-team/json-231",
    "https://jsonbase.com/sls-team/json-931",
    "https://jsonbase.com/sls-team/json-93",
    "https://jsonbase.com/sls-team/json-342",
    "https://jsonbase.com/sls-team/json-770",
    "https://jsonbase.com/sls-team/json-491",
    "https://jsonbase.com/sls-team/json-281",
    "https://jsonbase.com/sls-team/json-718",
    "https://jsonbase.com/sls-team/json-310",
    "https://jsonbase.com/sls-team/json-806",
    "https://jsonbase.com/sls-team/json-469",
    "https://jsonbase.com/sls-team/json-258",
    "https://jsonbase.com/sls-team/json-516",
    "https://jsonbase.com/sls-team/json-79",
    "https://jsonbase.com/sls-team/json-706",
    "https://jsonbase.com/sls-team/json-521",
    "https://jsonbase.com/sls-team/json-350",
    "https://jsonbase.com/sls-team/json-64"
]

function checkStatus(data) {
    if (data.status == 200)
        return true
    return false
}

let ok = 'https://developer.mozilla.org/ru/docs/Web/API/Fetch_API/Using_Fetch'

async function getData(url) {
    let res = await axios(url)
        .catch((error) => {
            //console.log(error);
        })
    return res
}

function foo() {
    for (let request of urls) {

        let data = getData(request + '?isDone')
        if (checkStatus(data))
            console.log(`[Success] ${request}: `);
        else {
            console.log(`[Fail] ${request}: `);
        }

    }
}

foo()
