const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv').config()

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/JavaChessAPI', {useNewUrlParser: true});

const authRouter = require('./Auth/authRoute')

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);

app.listen(3000)

module.exports = app;
