const express = require('express');
const app = express();  
var cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./Routers/userRouter")
const authRouter = require('./Routers/authRouter')


app.use(cookieParser());
app.use(express.json())
const db =
  "mongodb+srv://ashish:ashish123@cluster0.xevzulq.mongodb.net/?retryWrites=true&w=majority";

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});

// connection to DB...
mongoose.connect(db)
    .then(function (db) {
        console.log('db connected');
    })
    .catch(function (err) {
        console.log(err);
    });



app.use('/user', userRouter);
app.use('/auth', authRouter);





 