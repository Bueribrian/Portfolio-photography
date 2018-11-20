const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImagesSchema = new Schema({
    title : { type: String, require : true },
    desc : { type: String, require : true },
    tags : { type: [String], require : true },
    img : { type: String, require : true },
    url : { type: String, require : true },
    date : {type: Date, default:Date.now }
})

module.exports = mongoose.model('Images',ImagesSchema)