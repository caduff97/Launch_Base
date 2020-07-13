// Cálculo de aposentadoria

const nome = 'Carlos'
const sexo = 'M'
const idade = 22
const contribuicao = 4
const regra8595 = idade + contribuicao

const aposentadoriaHomem = sexo == 'M' && contribuicao >= 35 && regra8595 >= 95
const aposentadoriaMulher = sexo == 'F' && contribuicao >= 30 && regra8595 >= 85

if (aposentadoriaHomem || aposentadoriaMulher) {        
    console.log(`${nome} você pode se aposentar!`)
} else {
    console.log(`${nome} você ainda não pode se aposentar!`)
}