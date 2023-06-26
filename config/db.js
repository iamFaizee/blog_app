const mongoose = require('mongoose')
require('dotenv').config()

// const connection = mongoose.connect(`${process.env.MONGO_CONNECTION}/blog_app`)
// const connection = mongoose.connect("mongodb://127.0.0.1:27017/blog_app")
const connection = mongoose.connect("mongodb+srv://blogapp:blogapp123@cluster0.7cfquwe.mongodb.net/?retryWrites=true&w=majority" )
// {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// })
.then((res) => {
    console.log('connections established')
})
.catch((err) => {
    console.log('error connecting to database')
})

module.exports = {connection}