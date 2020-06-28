let mongoose = require('mongoose');
let Scehma = mongoose.Schema;

let Facebook = new Scehma({
    facebookid: {
        type: String,
        required: true,
        unique: true
    },
    fbPhoto: {
        type: String,
    },
    fbUserName: {
        type: String,
        index: true
    },
    follower: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

let faceAuth = mongoose.model("facebook", Facebook);

module.exports = { faceAuth };