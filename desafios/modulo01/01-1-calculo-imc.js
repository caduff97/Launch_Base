// Cálculo de IMC

const nome = 'Carlos'
const peso = 65
const altura = 1.70
const sexo = 'M'

const imc = (peso / (altura * altura))

if (!(imc <=30)) {
    console.log(`${nome} você está acima do peso.`)
} else {
    console.log(`${nome} você não está acima do peso.`)
}