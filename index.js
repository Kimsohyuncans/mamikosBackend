
// modules & Configuration
const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')
const app = express()

// Controllers
const Controllers = require('./controllers/index')

//middleware authentication
const Authentication = require('./middleware.js').authentication

app.use(bodyParser.json())

//controllers
const port = process.env.PORT || 8080;

// router group

app.get('/' ,(req,res) => {
    res.send('hello world')
})
app.group("/api/v1", (router) => {

    // router.get('/',Controllers.index)
    
    // register router
    router.post('/regis',Controllers.register)

    // login router 
    router.post('/login', Controllers.login)

    router.post('/',Authentication,Controllers.update)

    // show all kokst
    
    router.get('/listkost',Controllers.showkost)

    // add advertisement

    router.post('/add_addvertisement',Controllers.kost)

    // // // add a booking kost
    router.post('/booking',Authentication,Controllers.booking)

    // wanna see my booking list
    router.get('/mybooking',Authentication,Controllers.mybookinglist)
})


app.listen(port, () => console.log(`Listening on port ${port}!`))