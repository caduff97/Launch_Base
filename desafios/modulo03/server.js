const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const courses = require("./data/courses")
const about = require("./data/about")

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
<<<<<<< HEAD
    autoescape: false
=======
    autoescape: false,
    noCache: true
>>>>>>> 032e35f2bc19b7f2b70d01790bd4cdf11b78ef73
})

server.get("/", (req, res) => {
    
    return res.render("courses", { courses })
})

server.get("/about", (req, res) => {
    return res.render("about", { about })
})

<<<<<<< HEAD
=======
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

>>>>>>> 032e35f2bc19b7f2b70d01790bd4cdf11b78ef73
server.use((req,res) => {
    res.status(404).render("not-found")
})

server.listen(3333)