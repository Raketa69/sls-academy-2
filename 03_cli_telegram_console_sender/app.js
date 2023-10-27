import { program } from 'commander'
import TelegramBot from 'node-telegram-bot-api'
import fs from 'fs';

const configFile = 'config.json';
let chatId = fs.readFileSync(configFile, 'utf8');
const token = '6430337739:AAGEU7Qxi-3kXb_0yKTjxqSQpJulYxfRlU0';
const bot = new TelegramBot(token);

program
    .version("0.0.1")
    .command('message <message>')
    .description('Send message to Telegram Bot')
    .alias('m')
    .action((message) => {
        bot.sendMessage(chatId, message)
    })
program
    .command('photo <path>')
    .description('Send photo to Telegram Bot. Just drag and drop it console after p-flag')
    .alias('p')
    .action((path) => {
        bot.sendPhoto(chatId, path)
    })

program.parse(process.argv)
