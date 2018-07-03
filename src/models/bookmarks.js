const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    eMail: String,
    bookmark: {
        videoId: String,
        title: String,
        description: String,
        starttime: {
            hrs: String,
            mins: String,
            secs: String
        }
    }
})

module.exports = mongoose.model('bookmarkdetails', bookmarkSchema);