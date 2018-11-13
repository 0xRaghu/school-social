const express = require('express');
var app = express();

// @route GET   api/Posts/test
// @desc        Tests Posts Route
// @access      public

app.get('/test', (req,res)=> res.json({msg: "Posts Works"}));

module.exports = app;