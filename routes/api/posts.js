const express = require('express');
var app = express();
const mongoose = require('mongoose');
const passport = require('passport');

//Post Model and Profile Model

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//Validation

const validatePostInput = require('../../validation/post');

// @route GET   api/Posts/test
// @desc        Tests Posts Route
// @access      public

app.get('/test', (req,res)=> res.json({msg: "Posts Works"}));

// @route GET   api/Posts
// @desc        Get Posts
// @access      public

app.get('/', (req,res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({noPostsFound: "No Posts Found"}));
});

// @route GET   api/Posts/:id
// @desc        get posts by id
// @access      public

app.get('/:id', (req,res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({noPostFound: "No Post Found with that Id"}));
});

// @route POST  api/Posts
// @desc        Create Posts
// @access      private

app.post('/', passport.authenticate('jwt', {Session:false}), (req,res) => {
    const {errors, isEmpty} = validatePostInput(req.body);
    
    //Check Validation
    if(!isValid){
        //If any errors send 400 with error object
        res.status(400).json(errors);
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });
    
    newPost.save().then(post => res.json(post));
});

// @route DELETE   api/Posts/:id
// @desc        delete posts by id
// @access      private

app.delete('/:id', passport.authenticate('jwt', {Session:false}), (req,res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //Check for post owner
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({notAuthorised: 'User not Authorised'});
                    }
                    //Delete
                    Post.remove().then(()=> res.json({success: 'true'}))
                        .catch(err => res.status(404).json({postnotfound: 'Post not found'}));
                })
        });
});

// @route POST  api/Posts/like/:id
// @desc        Like posts by id
// @access      private

app.post('/like/:id', passport.authenticate('jwt', {Session:false}), (req,res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({alreadyliked: 'User already liked this post'});
                    }
                    //Add the user id to likes array
                    post.likes.unshift({user: req.user.id});
                    
                    post.save().then(post => res.json(post));
                })
        });
});

// @route POST  api/Posts/unlike/:id
// @desc        Unlike posts by id
// @access      private

app.post('/unlike/:id', passport.authenticate('jwt', {Session:false}), (req,res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                        return res.status(400).json({notliked: 'You have not yet liked this post'});
                    }
                    //Remove the user id from likes array
                    //Get Remove Index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);
                        
                    //Splice out of Array
                    post.likes.splice(removeIndex, 1);
                    
                    post.save().then(post => res.json(post));
                })
        });
});

// @route POST  api/Posts/comment/:id
// @desc        Comment posts by id
// @access      private

app.post('/comment/:id', passport.authenticate('jwt', {Session:false}), (req,res) => {
    const {errors, isEmpty} = validatePostInput(req.body);
    
    //Check Validation
    if(!isValid){
        //If any errors send 400 with error object
        res.status(400).json(errors);
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    const newComment = {
                        text: req.body.text,
                        name: req.body.name,
                        avatar: req.body.avatar,
                        user: req.user.id
                    }
                    //Add to comments array
                    post.comments.unshift(newComment);
                    
                    post.save().then(post => res.json(post))
                        .catch(err => res.status(404).json({postnotfound: 'No post Found'}));
                })
        });
});

// @route DELETE  api/Posts/comment/:id/:comment_id
// @desc        Delete Comment by id
// @access      private

app.delete('/comment/:id/:comment_id', (req,res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    //Check if comment exists
                    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                        return res.status(404).json({nocommentfound: 'Comment does not exist'});
                    }
                    const removeIndex = post.comments
                        .map(item => item._id.toString())
                        .indexOf(req.params.comment_id);
                    //Splice from comments array
                    post.comments.splice(removeIndex, 1);
                    
                    post.save().then(post => res.json(post))
                        .catch(err => res.status(404).json({postnotfound: 'No post Found'}));
                })
        });
});

module.exports = app;