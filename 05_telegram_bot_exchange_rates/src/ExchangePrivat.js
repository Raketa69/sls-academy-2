import axios from 'axios';
import Exchange from './Exchange.js'


class ExchangePrivat extends Exchange {

    data = []
    request
    currencyCode_USD
    currencyCode_EUR
    currencyCode_UAH

    constructor() {
        super()
        this.currencyCode_USD = "USD"
        this.currencyCode_EUR = "EUR"
        this.currencyCode_UAH = "UAH"
        this.request = `https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5`
    }

    async getData() {
        try {
            const response = await axios.get(this.request)
            return response.data
        } catch (error) {
            console.error(error);
        }
    }

    getDateTime() {
        return new Date()
    }

    getUSD(data) {
        let result = data.filter((element) => {
            if (element.ccy == this.currencyCode_USD && element.base_ccy == this.currencyCode_UAH)
                return true
        })
        return Object(result[0])
    }

    getEUR(data) {
        let result = data.filter((element) => {
            if (element.ccy == this.currencyCode_EUR && element.base_ccy == this.currencyCode_UAH)
                return true
        })
        return Object(result[0])
    }
}
export default ExchangePrivat;