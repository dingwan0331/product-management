const express = require('express')
const cors    = require('cors')
const logger  = require('morgan')
const dotenv  = require("dotenv")
const app     = express()

dotenv.config()

const PORT  = process.env.PORT

app.use(cors())
app.use(logger('combined'));
app.use(express.json());

const indexRouter = require('./routes')
app.use('', indexRouter);

app.listen(PORT,()=>{console.log(`Running on port : ${PORT}`)})