const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookmarkapp');

const User = require('../models/userInfo');

router.post('/', function (req, res) {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        eMail: req.body.eMail,
        password: req.body.password
    }, (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        res.json('success');
    })
})

router.get('/user/:id', function (req, res) {
    User.find({
        eMail: req.params.id
    }, (err, data) => {
        if (err)
            res.status(500).json(err);
        res.json(data)
    })
})

module.exports = router;