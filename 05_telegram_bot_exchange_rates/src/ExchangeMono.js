import axios from 'axios';
import Exchange from './Exchange.js'

class ExchangeMono extends Exchange {

    currencyCode_USD
    currencyCode_EUR
    currencyCode_UAH
    request


    constructor() {
        super()
        this.currencyCode_USD = 840
        this.currencyCode_EUR = 978
        this.currencyCode_UAH = 980
        this.request = `https://api.monobank.ua/bank/currency`
    }

    async getData() {
        try {
            const response = await axios.get(this.request)
            //console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    getSimpleDateTime(unixDateTime) {
        let date = new Date(unixDateTime * 1000)
        return date
    }

    getUSD(data) {
        let result = data.filter((element) => {
            if (element.currencyCodeA == this.currencyCode_USD && element.currencyCodeB == this.currencyCode_UAH)
                return true
        })
        return Object(result[0])
    }

    getEUR(data) {
        let result = data.filter((element) => {
            if (element.currencyCodeA == this.currencyCode_EUR && element.currencyCodeB == this.currencyCode_UAH)
                return true
        })
        return Object(result[0])
    }
}
export default ExchangeMono;