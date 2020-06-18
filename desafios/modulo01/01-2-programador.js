// Vetores e objetos

const listaTecnologias = [
    {
        nome: 'C++',
        especialidade: 'Desktop'
    },
    {
        nome: 'Python',
        especialidade: 'Data Science'
    },
    {
        nome: 'JavaScript',
        especialidade: 'Web/Mobile',
    }
]

const programador = {
    nome: 'Carlos',
    idade: 22,
    tecnologias: [
        listaTecnologias[2],
        listaTecnologias[1],
        listaTecnologias[0]
    ]
}

const escreverTexto = `O usuário ${programador.nome} tem ${programador.idade} anos e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[0].especialidade}`

console.log(escreverTexto)