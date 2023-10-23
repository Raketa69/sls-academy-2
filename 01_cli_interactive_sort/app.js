import TextManipulator from './TextManipulator.js';
import { dialog, options } from './data.js';
import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let textManipulator

function start() {

    rl.question(dialog.helloEnterText, (text) => {

        textManipulator = new TextManipulator(text)
        console.log(dialog.startText + '\n')
        options.forEach((element, index) => {
            console.log(++index + ".", element);
        });

        rl.question(dialog.chooseOptionsText, (choise) => {
            if (choise.toLowerCase().trim() == 'exit') {
                console.log(dialog.goodBye);
                rl.close()
            }
            else {
                switch (choise.trim()) {
                    case "1": {
                        console.log(textManipulator.sortByName())
                        break
                    }
                    case "2": {
                        console.log(textManipulator.sortDigitsFromTheSmallest())
                        break
                    }
                    case "3": {
                        console.log(textManipulator.sortDigitsFromTheBiggest())
                        break
                    }
                    case "4": {
                        console.log(textManipulator.sortByQuantityOfLetters())
                        break
                    }
                    case "5": {
                        console.log(textManipulator.sortByUniqueWords())
                        break
                    }
                    default: {
                        console.log(dialog.error)
                        break
                    }
                }
                start()
            }
        })
    })
}
start()
