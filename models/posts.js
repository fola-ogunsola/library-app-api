const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    author: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    image:{type:String, required:true}
});

module.exports = mongoose.model('Post', postSchema);