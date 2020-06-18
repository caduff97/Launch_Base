const usuarios = [
    {
        nome: 'Salvio',
        receitas: [115.3, 48.7, 98.3, 14.5],
        despesas: [85.3, 13.5, 19.9]
    },
    {
        nome: 'Marcio',
        receitas: [24.6, 214.3, 45.3],
        despesas: [185.3, 12.1, 120.0]
    },
    {
        nome: 'Lucia',
        receitas: [9.8, 120.3, 340.2, 45.3],
        despesas: [450.2, 29.9]
    }
]

for (let usuario of usuarios) {
    const saldo = calculaSaldo(usuario.receitas, usuario.despesas)
    
    sinal = (saldo >=0) ? 'Positivo':'Negativo'

    texto = `${usuario.nome} possui saldo ${sinal} de ${saldo.toFixed(2)}`
    console.log(texto)
}

function calculaSaldo(receitas, despesas) {
    totalReceitas = somaNumeros(receitas)
    totalDespesas = somaNumeros(despesas)
    return totalReceitas - totalDespesas
}

function somaNumeros(numeros) {
    let valorSoma = 0
    for (numero of numeros) {
        valorSoma += numero
    }
    return valorSoma
}