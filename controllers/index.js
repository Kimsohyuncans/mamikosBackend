const jwt = require('jsonwebtoken')
const md5 = require('md5')
const jwtdecode = require('jwt-decode')

// table users model
const users = require('../models').users
const kost = require('../models').kost
const bookinglist = require('../models').bookinglist


exports.index = (req, res) => {
    users.findAll().then(result=>res.send(result))
}

// register user 
exports.register = (req,res) => {
    const {name,username,password} = req.body
    users.create({
        username,
        password : md5(password)
    }).then(result => {
        res.send({
            status : "success",
            result
        })
    }).catch((err) => {
        res.send(err)
    })
}


// Login user 
exports.login = (req,res) => {
    const data = req.body

    users.findOne({
        where : {
            username : data.username,
            password : md5(data.password)
        }
    }).then(result => {
        
        if(result){
            const token = jwt.sign({ userid : result.id }, 'kimsohyun')
            res.send({
                status : 'success',
                token
            })
        }else{
            res.send({
                status : 'failed',
                msg : "Username Atau Password anda salah"
            })
        }
    })
}

// update user 

// exports.update = (req,res) => {

//     users.update(req.body,{
//         where : {
//             id : req.params.id
//         }
//     }).then(result => {
//         res.send({
//             status : "success",
//             result
//         })
//     })
// }

// add advertisement

exports.kost = (req,res) => {
    
    const data = req.body
    kost.create(data).then(response => {
        res.send({
            status : 'success',
        })
    })
}

// show all kost
exports.showkost = (req,res) => {
    
    kost.findAll().then( response => {
        res.send(response)
    })
}

// add a booked kost
exports.booking = (req,res) => {
    bookinglist.create(req.body)
    .then( (result) => {
        res.send({
            status : 'success',
            msg : 'bookingan mu telah di tambahkan '
        })
    }).catch ( (err) => {
        res.send(err)
    })
}

// show list booking user
exports.mybookinglist = (req,res) => {
    bookinglist.findAll({
        where : {
            create_by : jwtdecode(req.body.id).userid
        }
    }).then( (result ) => {
        res.send(result)
    })
 
}