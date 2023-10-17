const express = require('express');
const app = express(); 

//ROUTING FILES 
const noteRouter = require('./notes');
app.use('/api/notes',noteRouter);

module.exports = app;

