const express = require('express')

const {Blogmodel} = require('../models/Blog.model')

const blogRouter = express.Router();


blogRouter.get('/', async (req,res) => {
    const blogs = await Blogmodel.find()
    res.send(blogs);
})

blogRouter.post('/create', async (req,res) => {
    const {title, description, category} = req.body
    const author_id = req.userID
    const blog = new Blogmodel({
        title,
        description,
        category,
        author_id
    })
    await blog.save()
    res.status(200).json({success: "blog created successfully"});
})


blogRouter.delete('/delete/:blogID', async (req,res) => {
    const {blogID} = req.params;
    const userID = req.userID
    const blog = await Blogmodel.findOne({_id: blogID});
    const author_id = blog.author_id;
    // console.log(author_id)
    // console.log(userID)
    if(author_id === userID){
        await Blogmodel.findOneAndDelete({_id: blogID})
        res.json({success: "Blog deleted successfully"})
    }
    else{
        res.json({error: "You are not Authorised to do this"})
    }
})


module.exports = {blogRouter}