const express = require('express');
const app = express();
const router = express.Router();

//Rotas
const index = require('./routes/index');
const personRoute = require('./routes/personRoute');
const discoveryRoute = require('./routes/discoveryRoute');
app.use(express.json())
// app.use('/', index);
app.use('/persons', personRoute);
app.use('/discovery', discoveryRoute);
module.exports = app;