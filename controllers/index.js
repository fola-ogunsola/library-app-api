const post = require("../models/posts");
const mongoose = require("mongoose");


const create = (req, res, next) => {
    const { title, author, content } = req.body;
    const newPost = new post({
        title,
        author,
        content,
    });

    newPost.save((err) => {
        if (err) {
            return next(err)
        } else {
            return res.status(201).json({
                message: "Post created"
            })
        }
    });
}

const story = (req, res, next) => {
    post.find({}, (err, data) => {
        if (err) next(err)
        if (!data) {
            return res.status(404).json({
                message: "No post found"
            });
        }else {
            return res.status(200).json({data})
        }
    });
}

const storyOne = (req, res, next) => {
    const id = req.params.id
    post.findOne({_id: id}, (err, data) => {
        if (err) next(err);
        if (!data) {
            return res.status(404).json({
                message: "Post not found"
            })
        }else{
            res.status(200).json({
                Title: data.title,
                WrittenBy: data.author,
                Content: data.content,
                PublishedAt: data.createdAt
            })  
        }
    })
}

const edit = (req, res, next) => {
    const id = req.params.id
    const{title, author, content} = req.body
    post.findOne({_id: id}, (err, data) => {
        if (err) next(err);
        if (!data) {
            return res.status(404).json({
                message: "Post not found"
            })
        }else{
            if(title) {
                data.title = title;
            }

            if (author) {
                data.author = author;
            }

            if (content) {
                data.content = content;
            }

            data.save((err, editedPost) => {
                if (err) {
                    next(err)
                }else {
                    res.send(editedPost);
                }
            })
        }
    })
}

const removed = (req, res, next) => {
    const id = req.params.id;
    post.deleteOne({_id: id}, (err) => {
        if (err) {
            next(err)
        } else {
            res.status(204).send()
        }
    })
}

module.exports = {create, story, storyOne, edit, removed}