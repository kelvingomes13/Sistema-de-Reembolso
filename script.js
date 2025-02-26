//seleciona os elementos do formulario
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

//Seleciona os elementos da lista
const expenseList = document.querySelector('ul')

//adiciona um evento de input no campo de valor
amount.oninput = function () {
  //remove tudo que não for número
  let value = amount.value.replace(/\D/g, '')

  //transformar o valor em centavos (dividir por 100 exemplo:150/100 = 1.50)
  value = Number(value) / 100

  //converte o valor para número
  amount.value = formatCurrencyBRL(value)
}
//função para formatar o valor em moeda brasileira
function formatCurrencyBRL(value) {
  //formata o número para moeda brasileira
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
  //retorna o valor formatado
  return value
}
//adiciona um evento de submit no formulário
form.onsubmit = event => {
  //previne o envio do formulário
  event.preventDefault()
  //cria um objeto com os dados do formulário
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date('')
  }
  //chama a funcão para adicionar a despesa
  expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
  try {
    //criar elemento para adicionar na lista
    const expenseItem = document.createElement('li')
    expenseItem.classList.add('expense')

    //cria um icone da categoria
    const expenseIcon = document.createElement('img')
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute('alt', newExpense.category_name)

    //adiciona as informações no item 
    expenseItem.append(expenseIcon)
    expenseList.append(expenseItem)
  }
  catch (error) {
    alert('Erro ao adicionar despesa')
    console.log(error)
  }
}