const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forecast')
const location = require('./utils/utils')
const geoCode = require('./utils/utils')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Anubhav'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Anubhav'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'For any help read this !',
        title: 'Help',
        name: 'Anubhav'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Error enter the address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} ={}) =>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is sunny',
    //     location: 'India'
    // })
})

app.get('/products', (req, res)=>{
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: 'Help Article Not Found'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: '404 Page Not Found'
    })
})

app.listen(3000, ()=>{
    console.log("Starting up...")
})