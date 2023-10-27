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


    let text = msg.text

    if (text === "/start") {
        bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/4a4/5eb/4a45ebcb-39f0-391d-bb2b-60fcf0e8100a/1.webp')
        return bot.sendMessage(chatId, "Hello, Master")
    }

    if (text === "/weather") {
        return bot.sendMessage(chatId, "Make you choise, Master", weatherOptions)
    }
    return bot.sendMessage(chatId, "I dont understand you, Master")
})

bot.on('callback_query', async (msg) => {

    let chatId = msg.message.chat.id
    let data = msg.data

    if (data === '1') {
        return bot.sendMessage(chatId, `You choose ${data}`)
    }
    if (data === '2') {
        return bot.sendMessage(chatId, `You choose ${data}`)
    }
    if (data === '3') {
        return bot.sendMessage(chatId, `You choose ${data}`)
    }


})
