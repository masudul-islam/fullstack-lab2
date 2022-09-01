const express = require("express");
var cors = require('cors')
const app = express();
const  logger = require('morgan');
const signal  = require("signale");
const dotenv = require("dotenv").config();
const signale = require("signale");
const connection = require("./DB/connection");
const router = require("./api-router/router");
const PORT = process.env.PORT;
connection();


app.use(cors());
app.use(logger('dev'))
app.use(express.json())
app.use("/home" ,express.static("dist"));
app.use("/api",router)

app.listen(PORT, () => {signal.info("The server is the lisning on port:",PORT)})