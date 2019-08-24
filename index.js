
// modules & Configuration
const express = require('express')
const bodyParser = require('body-parser')
require('express-group-routes')
const multer = require('multer')
const app = express()

// Controllers
const Controllers = require('./controllers/index')

//middleware authentication
const Authentication = require('./middleware.js').authentication

app.use(bodyParser.json())

//controllers
const port = process.env.PORT || 8080;


// multer configuration
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});





// router group


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

    // upload gambar
    router.post('/uploadimg',upload.single('myimg'),(req,res) => {
        if(!req.file){
            res.status(500).send({
                "msg" : "please upload a file"
            })
        }else{
            res.send(req.file)
        }
    })
})


app.listen(port, () => console.log(`Listening on port ${port}!`))