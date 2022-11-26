const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/user")


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Mongodb connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('connected to Database')
}).catch((error) => {
    console.log("UNABLE to connect Database", err)
})

// use parsing middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// import routes
app.use('/api', userRoutes) ;

const port = process.env.PORT;;

app.listen(port, ()=>{
    console.log(`App is running at ${port}`)
});