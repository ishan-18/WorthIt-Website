require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

//Models
require('./models/user')
require('./models/category')

//Routes
app.use('/user', require('./routes/user'))
app.use('/api', require('./routes/category'))
app.use('/api', require('./routes/upload'))

//Mongodb connection
const URI = process.env.MONGO_URI
mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', ()=>{
    console.log(`Database connected @27017`)
})

mongoose.connection.on('error', (e)=>{
    console.log("Error", e)
})

//Server Listening at 3000
const PORT = process.env.PORT || 2000
app.listen(PORT, ()=>{
    console.log(`Server respondng @${PORT}`)
})