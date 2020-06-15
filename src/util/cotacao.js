const request = require('request')

const cotacao = (symbol, callback) => {
    const apiToken = 's5GBjAYix5pmdtiQjk2FOm14ACqOG6YEiVKLxeEouCbaxL22oZR0MlJZVk8r'
    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${apiToken}`
    request({url: url, json: true}, (err, response) => {
        if(err) {
            callback({
                message : `Something went wrong: ${err}`
            }, undefined)
        }
        // const parsedJSON = response.body
        if (response.body === undefined){
            const error = 
            callback({
                message : `'There is no data found'`
            }, undefined)
        }
        // const data = {
        //     price: parsedJSON.data[0].price,
        //     price_open: parsedJSON.data[0].price_open,
        //     close_yesterday: parsedJSON.data[0].close_yesterday,
        //     day_high: parsedJSON.data[0].day_high,
        //     day_low: parsedJSON.data[0].day_low
        // }
        const parsedJSON = response.body.data[0]
        const {symbol, price_open, price, day_high, day_low} = parsedJSON

        callback(undefined, {symbol, price_open, price, day_high, day_low})
})
}

module.exports = cotacao