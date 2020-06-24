// requisita o express
const express = require('express')
// requisita o nunjucks para rodar no servidor
const nunjucks = require('nunjucks')

// roda o servidor com o express
const server = express()

// observar a pasta public para servir os arquivos estáticos
server.use(express.static('public'))

// define a estrutura de visualização (motor de view) como html
server.set("view engine", "njk")

// define o views como a pasta que servirá as visualizações
nunjucks.configure("views", {
    express: server
})

// retorna a renderização do index para o caminho '/'
server.get("/", (req, res) => {
    return res.render("about")
})

// retorna a renderização da página portfolio para o caminho '/portfolio'
server.get("/portfolio", (req, res) => {
    return res.render("portfolio")
})

// ouve a porta 5000
server.listen(5000, function (){
    console.log('server is running')
})
