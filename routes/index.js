const express = require('express');
const app = express(); 

//ROUTING FILES 
const noteRouter = require('./notes');
app.use('/notes',noteRouter);

module.exports = app;

