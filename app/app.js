const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/TeamPasswordFSE', {useNewUrlParser: true});

const indexRouter = require('./routes')
const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.listen(3000)

module.exports = app;
