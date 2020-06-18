// Construção e impressão de objetos

const empresa = {
    nome: 'Rocketseat',
    cor: 'roxo',
    foco: 'programacao',
    endereco: {
        rua: 'Rua Guilherme Gembala',
        numero: 260
    }
}

const escreverTexto = `A empresa ${empresa.nome} está localizada em ${empresa.endereco.rua}, ${empresa.endereco.numero}`

console.log(escreverTexto)