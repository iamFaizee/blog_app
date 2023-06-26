const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const {connection} = require('./config/db')
const {Usermodel} = require('./models/User.model')
const {blogRouter} = require("./routes/Blog.routes")
const {authenticate} = require('./middlewares/authenticate')

const app = express()

app.use(express.json());

app.use(cors())


app.get('/', (req,res) => {
    res.json({success: 'Welcome to home page'})
})


app.post('/signup', async (req,res) => {
    const {email,password,name,age} = req.body;
    const hashed_password = bcrypt.hashSync(password, 8);
    const new_user = new Usermodel({
        email,
        password: hashed_password,
        name,
        age,
    })

    await new_user.save()
    res.json({succes: 'signup successful'})
})


app.post('/login', async (req,res) => {
    const {email,password} = req.body
    const user = await Usermodel.findOne({email});

    if(!user){
        res.json({error: 'Please Sign up'})
    }

    const hash = user.password
    const correct_password = bcrypt.compareSync(password, hash);

    if(correct_password){
        const token = jwt.sign({userID: user._id}, process.env.SECRET_CODE);
        res.json({success: "login successful","token": token})
    }
    else{
        res.json({error: 'Login Failed'})
    }
})


app.use('/blogs', authenticate, blogRouter)


app.listen(9000, () => {
    console.log("listening on 9000")
})