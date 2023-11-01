import TelegramBot from 'node-telegram-bot-api'
import { mainMenuOptions, exchangeMenuOptions, weatherMenuOptions } from './menuOptions.js'
import ExchangePrivat from './ExchangePrivat.js';
import ExchangeMono from './ExchangeMono.js';
import NodeCache from 'node-cache'
import WeatherController from './WeatherController.js';

const TOKEN = '6889950090:AAGg8ZF7zjUvpD3I8ibwTZE_nACuPtDSCRw';
let bot = new TelegramBot(TOKEN, { polling: true });
let exm = new ExchangeMono()
let exp = new ExchangePrivat()
let cache = new NodeCache()
let wc = new WeatherController()

bot.on('message', async (msg) => {
    try {
        let chatId = msg.chat.id
        let text = msg.text

        if (text === "/start") {
            return bot.sendMessage(chatId, "Hello, Master")
        }

        if (text == '/menu') {
            return bot.sendMessage(chatId, `Menu`, mainMenuOptions)
        }

        if (text == 'Weather') {
            return bot.sendMessage(chatId, `Weather`, weatherMenuOptions)
        }

        if (text == 'Exchange') {
            return bot.sendMessage(chatId, `Exchange`, exchangeMenuOptions)
        }
        if (text == 'Come back') {
            return bot.sendMessage(chatId, `Exchange`, mainMenuOptions)
        }
        if (text == 'EUR') {
            let currentEx
            let currentEUR

            if (cache.has("cachePrivat")) {
                currentEUR = cache.get("cachePrivat")
            }
            if (!cache.has("cachePrivat")) {

                currentEx = await exp.getData()
                currentEUR = exp.getUSD(currentEx)
                cache.set("cachePrivat", currentEUR, 60)
            }
            return bot.sendMessage(chatId, `Exchange EUR:

    Rate Buy: ${+currentEUR.buy} UAH
    Rate Sell: ${+currentEUR.sale} UAH`)
        }
        if (text == 'USD') {
            let currentEx
            let currentUSD

            if (cache.has("cacheMono")) {
                currentUSD = cache.get("cacheMono")
            }
            if (!cache.has("cacheMono")) {
                currentEx = await exm.getData()
                currentUSD = exm.getUSD(currentEx)
                cache.set("cacheMono", currentUSD, 60)
            }

            return bot.sendMessage(chatId, `Exchange USD:

    Rate Buy: ${+currentUSD.rateBuy} UAH
    Rate Sell: ${+currentUSD.rateSell} UAH`)
        }

        if (text === 'Every 3 hours') {
            const currentForecast = await wc.getForecast(1).catch(err => console.error(err))
            await bot.sendMessage(chatId, `Forecast in 3 hours: ${currentForecast.weather} \n 
            Temp: ${currentForecast.temp} C°\n 
            Feels like: ${currentForecast.feels_like} C°\n
            Humidity: ${currentForecast.humidity}% \n 
            Wind: ${currentForecast.wind} m/s \n`)
            return
        }
        if (text === 'Every 6 hours') {
            const currentForecast = await wc.getForecast(2).catch(err => console.error(err))
            await bot.sendMessage(chatId, `Forecast in 6 hours: ${currentForecast.weather} \n 
            Temp: ${currentForecast.temp} C°\n 
            Feels like: ${currentForecast.feels_like} C°\n
            Humidity: ${currentForecast.humidity}% \n 
            Wind: ${currentForecast.wind} m/s \n`)
            return
        }

        if (text === 'Wind') {
            const currentWeather = await wc.getWeather().catch(err => console.error(err))
            return bot.sendMessage(chatId, `Current Wind: ${currentWeather.wind} m/s`)
        }

        return bot.sendMessage(chatId, `Dont understand, try again`)

    } catch (error) {
        console.error(error);
    }
})