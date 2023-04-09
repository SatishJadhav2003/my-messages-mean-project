// import express from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();


//Mongo connection
mongoose.connect("mongodb+srv://satish_mean:rxP3yiDIRE4S0xmP@cluster0.7iv8tz6.mongodb.net/mean-project?retryWrites=true&w=majority").then(() => {
  console.log("Database Connection Successfull ");
}).catch(() => {
  console.log("Failed !! .... Connection Unsuccessfull ");
})

// rxP3yiDIRE4S0xmP


app.use(bodyParser.json());
//No need of this line
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// API for post data
app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // post.save();
  post.save().then(
    (createdPost)=>{
      console.log(createdPost);
      res.status(201).json({
        message: "post added successfully",
        postId: createdPost._id
      });
    }
  );
})


//API for get request
app.get('/api/posts', (req, res, next) => {
  // const posts = [
  //   {
  //     id: 'cd43dsds32',
  //     title: 'This is first message',
  //     content: "I am from server"
  //   },
  //   {
  //     id: 'dkfhdkf34',
  //     title: 'This is Second message',
  //     content: "I am from server !!!"
  //   }
  // ]
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json(
      {
        message: "post fetch success",
        posts: documents
      }
    );
  });
});

// API for delete post

app.delete('/api/posts/:id', (req, res, next) => {

  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post Deleted !!"
    });
  });

});


module.exports = app;
