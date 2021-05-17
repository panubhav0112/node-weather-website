const request = require('request')
const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=b31b056c69b11e5e73c3def049418eef&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Unable to connect', undefined)
        }
        else if(body.error){
            callback('wrong co-ordinates', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ', It is currently ' + body.current.temperature + ' Degree Celcius. The humidity is ' + body.current.humidity + '%')
        }

    })
}
module.exports = forecast