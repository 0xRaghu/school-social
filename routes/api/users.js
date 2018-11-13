const express = require('express');
var app = express();

// @route GET   api/users/test
// @desc        Tests Users Route
// @access      public

app.get('/test', (req,res)=> res.json({msg: "Users Works"}));

module.exports = app;