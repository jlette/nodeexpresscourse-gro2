require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const apiRouter = require('./routes')

app.use(express.json())

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        console.log(`Database connection error ${error}`);
    })


app.use('/api/', apiRouter);

app.listen(3002, () => {
    console.log('server is running');
})

