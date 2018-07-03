const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('your-db');

const User = require('../models/userInfo');
const Bookmark = require('../models/bookmarks');
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

router.post('/bookmark', function (req, res) {
    Bookmark.create({
        eMail: req.body.eMail,
        bookmark: req.body.bookmark,
    }, (err, data) => {
        if (err) {
            res.status(500).json(err);
        }
        res.json('success');
    })
})

router.get('/bookmark/:id', function (req, res) {
    Bookmark.find({
        eMail: req.params.id
    }, 'bookmark', (err, data) => {
        if (err)
            res.status(500).json(err);
        res.json(data)
    })
})


module.exports = router;