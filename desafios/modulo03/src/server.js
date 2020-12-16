const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const courses = require("./data/courses")
const about = require("./data/about")

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req, res) => {
    
    return res.render("courses", { courses })
})

server.get("/about", (req, res) => {
    return res.render("about", { about })
})

server.get("/course/:id", (req, res) =>{
    const id = req.params.id;

    const course = courses.find((course) => {
        return course.name == id
    })

    if (!course) {
        return res.render("not-found")
    }

    return res.render("course", {course})
})

server.use((req,res) => {
    res.status(404).render("not-found")
})

server.listen(5000)