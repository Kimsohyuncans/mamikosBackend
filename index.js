
// modules & Configuration
const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')
const app = express()

// Controllers
const Controllers = require('./controllers/index')

app.use(bodyParser.json())

//controllers
const port = process.env.PORT || 8080;

// router group
app.group("/api/v1", (router) => {

    router.get('/',Controllers.index)
    
    // register router
    router.post('/regis',Controllers.register)

    // login router 
    router.post('/login', Controllers.login)

    // update router
    router.patch('/:id',Controllers.update)

    // show all kokst
    
    router.get('/listkost',Controllers.showkost)

    // add advertisement

    router.post('/add_addvertisement',Controllers.kost)

    // add a booking kost
    router.post('/booking',Controllers.booking)

    // wanna see my booking list
    // router.post('/mybooking',Controllers.mybookinglist)
})


app.listen(port, () => console.log(`Listening on port ${port}!`))