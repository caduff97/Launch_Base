const usuarios = [
    {
        nome: 'Carlos',
        tecnologias: ['HTML', 'CSS']
    },
    {
        nome: 'Jasmine',
        tecnologias: ['JavaScript', 'CSS']
    },
    {
        nome: 'Tuane', 
        tecnologias: ['HTML', 'Node.js']
    }
]

// Imprime o nome dos usuários e suas respectivas tecnologias com que trabalham
function imprimir () {
    for(usuario of usuarios) {
        texto = `${usuario.nome} trabalha com ${usuario.tecnologias.join(', ')}`
        console.log(texto)
    }
}


// Verifica se um usuário trabalha com determinada tecnologia
function checaTecnologia (usuario, tecnologia) {
    for (let i = 0; i < usuario.tecnologias.length; i++) {
        if (usuario.tecnologias[i] == tecnologia) return true
        }

        return false
    }

// Verifica e informa quais usuários trabalham com determinada tecnologia
function checaUsuarios (listaUsuarios, tecnologia) {
for (let i = 0; i < listaUsuarios.length; i++) {
    const usuarioUsaCSS = checaTecnologia(listaUsuarios[i], tecnologia)

    if (usuarioUsaCSS) {
        console.log(`O usuário ${listaUsuarios[i].nome} trabalha com ${tecnologia}`)
    }
}
}

//imprimir()
checaUsuarios(usuarios, 'CSS')