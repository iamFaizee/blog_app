const jwt = require("jsonwebtoken")
require('dotenv').config()


const authenticate = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.json({error: 'Please Login'})
    }

    jwt.verify(token, process.env.SECRET_CODE, (err, decoded) => {
        const {userID} = decoded;
        req.userID = userID

        if(decoded){
            next();
        }
        else{
            res.json({error: 'Please Login'})
        }
    })
}

module.exports = {authenticate}