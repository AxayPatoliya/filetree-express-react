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
    // res.sendFile(path.join(__dirname ,'../views/blogHome.html'))
    res.render('blogHome', {
        blogs:blogs
    })
})

router.get('/blog/:slug', (req, res)=>{
    const blog_found = blogs.filter((e) => {
        return e.slug == req.params.slug;
    })
    console.log(blog_found);
    // res.send(blog_found)
    // res.sendFile(path.join(__dirname ,'../views/blogPage.html'), {blog:blog_found})
    res.render('blogPage', {
        blog:blog_found
    })
})


module.exports = router //need to export this as we are supposed to use this in different places