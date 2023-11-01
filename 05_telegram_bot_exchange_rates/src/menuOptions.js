const mainMenuOptions = {
    reply_markup: {
        keyboard: [
            ['Weather'],
            ['Exchange']
        ],
        resize_keyboard: true
    }
}

const exchangeMenuOptions = {
    reply_markup: {
        keyboard: [
            ['USD', 'EUR'],
            ['Come back']
        ],
        resize_keyboard: true
    }
}

const weatherMenuOptions = {
    reply_markup: {
        keyboard: [
            ['Every 3 hours', 'Every 6 hours'],
            ['Wind'],
            ['Come back']
        ],
        resize_keyboard: true
    }
}

export {mainMenuOptions, exchangeMenuOptions, weatherMenuOptions}