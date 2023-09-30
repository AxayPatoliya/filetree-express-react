const express = require("express")
const path = require("path")

const blogs = require("../data/blogs")

const router = express.Router()

router.get('/', (req, res)=>{
    // res.sendFile(path.join(__dirname ,'../templates/index.html'))
    res.render('home')
})

router.get('/blog_list', (req, res)=>{
    blogs.forEach(blog => {
        console.log(blog.title);
    });
    res.sendFile(path.join(__dirname ,'../views/blogHome.html'))
})

router.get('/blog/:title', (req, res)=>{
        const blog_found = blogs.find(blog => blog.title==req.params.title)
        console.log(blog_found);
    res.sendFile(path.join(__dirname ,'../views/blogHome.html'))
})


module.exports = router //need to export this as we are supposed to use this in different places