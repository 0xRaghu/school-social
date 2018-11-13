const express = require('express');
var app = express();

// @route GET   api/profile/test
// @desc        Tests Profile Route
// @access      public

app.get('/test', (req,res)=> res.json({msg: "Profile Works"}));

module.exports = app;