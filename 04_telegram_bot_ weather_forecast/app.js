import TelegramBot from 'node-telegram-bot-api'
import WeatherController from './WeatherController.js'

const token = '6971709574:AAEhqCPOmDvGIafONusLOTiyMCUxwoQmZpo';
const bot = new TelegramBot(token, { polling: true });

let wc = new WeatherController()

const weatherOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Current weather', callback_data: '1' }],
            [{ text: 'Forecast every 3 hours', callback_data: '2' }],
            [{ text: 'Forecast every 6 hours', callback_data: '3' }]
        ]
    })
}

bot.setMyCommands(
    [
        { command: 'start', description: 'Hello' },
        { command: 'weather', description: 'Weather' }
    ]
)

bot.on('message', async (msg) => {
    try {
        let chatId = msg.chat.id
        let text = msg.text

        if (text === "/start") {
            //bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/4a4/5eb/4a45ebcb-39f0-391d-bb2b-60fcf0e8100a/1.webp')
            return bot.sendMessage(chatId, "Hello, Master")
        }

        if (text === "/weather") {
            return bot.sendMessage(chatId, "Make you choise, Master", weatherOptions)
        }
        return bot.sendMessage(chatId, "I dont understand you, Master")
    } catch (error) {
        console.log(error);
    }
})
bot.on('callback_query', async (msg) => {
    try {
        const chatId = msg.message.chat.id
        const data = msg.data
        await bot.sendMessage(chatId, `I am working on the request...`)
        if (data === '1') {
            const currentWeather = await wc.getWeather().catch(err => console.error(err))
            return bot.sendMessage(chatId, `Current weather: ${currentWeather.main} \n 
            Temp: ${currentWeather.temp} C°\n 
            Feels like: ${currentWeather.feels_like} C°\n
            Humidity: ${currentWeather.humidity}% \n 
            Wind: ${currentWeather.wind} m/s \n`)
        }
        if (data === '2') {
            const currentForecast = await wc.getForecast(1).catch(err => console.error(err))
            await bot.sendMessage(chatId, `Forecast in 3 hours: ${currentForecast.weather} \n 
            Temp: ${currentForecast.temp} C°\n 
            Feels like: ${currentForecast.feels_like} C°\n
            Humidity: ${currentForecast.humidity}% \n 
            Wind: ${currentForecast.wind} m/s \n`)
        }
        if (data === '3') {
            const currentForecast = await wc.getForecast(2).catch(err => console.error(err))
            await bot.sendMessage(chatId, `Forecast in 6 hours: ${currentForecast.weather} \n 
            Temp: ${currentForecast.temp} C°\n 
            Feels like: ${currentForecast.feels_like} C°\n
            Humidity: ${currentForecast.humidity}% \n 
            Wind: ${currentForecast.wind} m/s \n`)
        }
    } catch (error) {
        console.log(error);
    }
})
