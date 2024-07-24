const express = require('express');
const dbConnect = require("./config/db");
const cookieParser = require('cookie-parser');


var app = express();
app.use(express.json());
app.use(cookieParser());
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});

app.get('/', (req, res) => {
    res.send('Welcome to the home page');
});
const userRouter = require('./routes/auths');
app.use('/api/v1', userRouter);
dbConnect();
