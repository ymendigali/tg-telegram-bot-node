const TelegramApi = require('node-telegram-bot-api')
const sequelize = require('./db');

const token = '5945187617:AAG83WkR4OIxAAI--YnEnR9eYWvRN7sXU0Y';

const webAppUrl = '/Users/yersultanmendigali/tg-message /index.html';

const bot = new TelegramApi(token, {polling: true})

const menuOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Подать заявление на апелляцию', url: "https://iitu.edu.kz/en/"}]
        ]
    })

}

const menumOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Самая лучшая девушка', url: "https://iitu.edu.kz/en/"}]
        ]
    })

}

const start = async () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Подключение к бд сломалось', e)
    }

    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/appeal', description: 'Отправка заяку на апелляцию'},
        {command: '/main', description: 'Главная страница МУИТ'},
    ])
    
    bot.on('message',  async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
    
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/archived/stickers/p/pr/ProgerRobots_byAlexzhdanov.webp')
            return bot.sendMessage(chatId, `Добро пожаловать в Телеграм бот для Апелляции. Если хотите подать на апелляцию, напишите команду /appeal а если хотите перейти на главную страницу напишите /main`);
        }
    
        if (text === '/appeal') {
            await bot.sendMessage(chatId, `Здравствуйте ${msg.from.first_name} ${msg.from.last_name} зайдите по ссылке Спасибо!`);
            return bot.sendMessage(chatId, `Для того что отправить заявление на подачу апеляции наймите на кнопку ниже`, menuOptions);

        }
    
        if (text === '/main') {
            return bot.sendMessage(chatId, `Добро пожаловать в Телеграм бовы хотите перейти на сайт`, menumOptions);
        }

        return bot.sendMessage(chatId, `Я тебя не понимаю попробуй еще раз!`);

    
    })


}

start()


            // await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
            //     reply_markup: {
            //         keyboard: [
            //             [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
            //         ]
            //     }
            // })