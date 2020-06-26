const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const courses = require("./data/courses")
const about = require("./data/about")

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false
})

server.get("/", (req, res) => {
    
    return res.render("courses", { courses })
})

server.get("/about", (req, res) => {
    return res.render("about", { about })
})

server.use((req,res) => {
    res.status(404).render("not-found")
})

server.listen(3333)