const mongoose = require('mongoose')

const connection = mongoose.connect("mongodb://127.0.0.1:27017/todo_app")
.then((res) => {
    console.log('connection established')
})
.catch((err) => {
    console.log('error connecting to DB')
})


module.exports = {connection}