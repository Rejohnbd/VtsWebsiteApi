const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user_model')


router.post('/', (req, res) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if(user){
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(err) {
                        res.status(401).json({
                            message: "Authtication Failed"
                        })
                    }
                    if(result) {
                        const token = jwt.sign(
                            {email: user.email, userId: user._id},
                            process.env.APP_SECRET,
                            { expiresIn: "1h" }
                        )

                        return res.status(201).json({
                            message: "Login Successfully",
                            token: token,
                            user: {
                                id: user._id,
                                email: user.email
                            }
                        })
                    }
                })
            } else {
                res.status(401).json({
                    message: "Authtication Failed"
                })
            }
            
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
})

router.post('/signup', (req, res) => {
    User.findOne({ email: (req.body.email).toLowerCase() })
        .exec()
        .then(user => {
            if(user){
                return res.status(501).json({
                    message: 'This Email Already Exist'
                })
            } else {
                if(req.body.password.length < 6){
                    return res.status(501).json({
                        message: 'Password Atlest 6 Charecter Long'
                    })
                } else {
                    bcrypt.hash(req.body.password, 8, (err, hash) => {
                        if(err) {
                            console.log(err)
                            return res.status(500).json({
                                err: err
                            })
                        } else {
                            const newUser = new User ({
                                email: (req.body.email).toLowerCase(),
                                password: hash
                            })
                            newUser.save()
                            return res.status(200).json({
                                message: 'User Create Successfully'
                            })
                        }
                    }) 

                }
                
            }
        })
        .catch(err => {
            return res.status(500).json({
                error: err
            })
        })
})

module.exports = router