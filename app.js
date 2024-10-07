const express = require('express');
const app = express();

const apiRouter = require('./routes')

app.use(express.json())

app.use('/api/', apiRouter);

app.listen(3002, () => {
    console.log('server is running');
})

