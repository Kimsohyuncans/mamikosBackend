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
            res.header('Authorization', 'Bearer '+ token)
            res.send({
                status : 'success',
            })
            
        }else{
            res.send({
                status : 'failed',
                msg : "Username Atau Password anda salah"
            })
        }
    })
}



exports.update = (req,res) => {

    jwt.verify(token,'kimsohyun',(err,authdata) => {
        if(err){
            res.status(403).send('token not valid')
        }else{
            res.send({
                token,
                msg : "sukses",
                authdata
             })
        }
    })
    
    
}

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

    jwt.verify(token,'kimsohyun',(err,authdata) => {
        if(!err){

            
            bookinglist.create({
                create_by : authdata.userid,
                kost_id : req.body.kost_id,
                datebook : req.body.datebook,
                status : req.body.status,
            }).then( (result) => {
                res.status(200).send({
                    status : 'success',
                })
            }).catch(err => {
                res.status(500).send({
                    status : err
                })
            })
        }else{
            res.send({
                status:err
            })
        }
    })
    
}

// show list booking user
exports.mybookinglist = (req,res) => {
    jwt.verify(token,'kimsohyun',(err,authdata) => {
        if(err){
            res.status(403).send({
                status: "failed",
                msg : "token not valid"
            })
        }else{
            bookinglist.findAll({
                where : {
                    create_by : authdata.userid
                },
                include : [{
                    model : kost,
                    as : 'kostID'
                }]
            }).then( (result) => {
                
                res.send(result)

            })
        }
        
    })
    
 
}

