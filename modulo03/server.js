// requisita o express
const express = require('express')
// requisita o nunjucks para rodar no servidor
const nunjucks = require('nunjucks')

// roda o servidor com o express
const server = express()
const projects = require("./data");

// observar a pasta public para servir os arquivos estáticos
server.use(express.static('public'))

// define a estrutura de visualização (motor de view) como html
server.set("view engine", "njk")

// define o views como a pasta que servirá as visualizações
nunjucks.configure("views", {
    express: server,
    autoescape: false, // permite que o nunjucks faça impressão de html
    noCache: true // desabilita o Cache
})

// retorna a renderização do index para o caminho '/'
server.get("/", (req, res) => {
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/66188563?s=460&u=40888ad9cad893fc422d56067dfeca054b6d64b3&v=4",
        name: "Carlos Eduardo",
        role: "Web Developer Jr.",
        description: "Programador front-end, focado em aprender sobre CSS e JavaScript. Aluno da <a href='https://rocketseat.com.br' target='_blank'>Rocketseat</a>",
        links: [
            { name: "Github", url: "https://github.com/caduff97"},
            { name: "Linkedin", url: "https://www.linkedin.com/in/cefilho/ "}
        ]
    }
    
    return res.render("about", { about })
})

// retorna a renderização da página portfolio para o caminho '/portfolio'
server.get("/portfolio", (req, res) => {
    return res.render("portfolio", { items: projects })
})

server.get("/project", (req,res) => {
    const id = req.query.id

    const project = projects.find((project) => {
        if (project.id == id) {
            return true
        }
    })

    if (!project) {
        return res.send("Project not found!")
    }
    return res.render("project", { item: project })
})

// ouve a porta 5000
server.listen(5000, function (){
    console.log('server is running')
})
