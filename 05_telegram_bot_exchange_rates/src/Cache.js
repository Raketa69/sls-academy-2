import NodeCache from 'node-cache'
import ExchangeMono from './ExchangeMono.js'

const cache = new NodeCache()


let data = await exm.getData()

console.log(data)
if (data === undefined) {
    console.log("EMPTY RESPONSE")
}
else {
    console.log("NOT EMPTY RESPONSE")
    cache.set("cacheMono", data, 60000);
}

console.log(cache.has("cacheMono"))

let value = cache.take("cacheMono")
console.log(value)


