//seleciona os elementos do formulario
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

//Seleciona os elementos da lista
const expenseList = document.querySelector('ul')
const expensesTotal = document.querySelector('aside header h2')
const expensesQuantity = document.querySelector('aside header p span')

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

//adiciona o novo item na lista
function expenseAdd(newExpense) {
  try {
    //criar elemento para adicionar na lista
    const expenseItem = document.createElement('li')
    expenseItem.classList.add('expense')

    //cria um icone da categoria
    const expenseIcon = document.createElement('img')
    expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute('alt', newExpense.category_name)

    //cria um elemento para adicionar as informações
    const expenseInfo = document.createElement('div')
    expenseInfo.classList.add('expense-info')

    //cria o nome da despesa
    const expenseName = document.createElement('strong')
    expenseName.textContent = newExpense.expense

    //cria a categoria da despesa
    const expenseCategory = document.createElement('span')
    expenseCategory.textContent = newExpense.category_name

    //adicionar name e category no expenseInfo
    expenseInfo.append(expenseName, expenseCategory)

    //criar valor da despesa
    const expenseAmount = document.createElement('span')
    expenseAmount.classList.add('expense-amount')
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace('R$', '')}`

    //criar icone de remover
    const removeIcon = document.createElement('img')
    removeIcon.classList.add('remove-icon')
    removeIcon.setAttribute('src', 'img/remove.svg')
    removeIcon.setAttribute('alt', 'Remover despesa')

    //adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    //adiciona o item na lista
    expenseList.append(expenseItem)

    //limpa o formulario
    clearForm()

    //atualiza os totais
    updateTotals()
  } catch (error) {
    alert('Nao foi possivel atualizar a lista de despesas')
    console.log(error)
  }
}

//atualizar os totais
function updateTotals() {
  try {
    //recuperar todos os itens da lista
    const items = expenseList.children
    //criar variavel para armazenar o total
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? 'despesas' : 'despesa'
    }`

    //variavel para incrementar o total
    let total = 0
    //percorrer todos os itens da lista
    for (let item = 0; item < items.length; item++) {
      //recuperar o valor do item
      const itemAmount = items[item].querySelector('.expense-amount')
      //identifica tudo que for caracterer que não seja número e substituir virgula ponto
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, '')
        .replace(',', '.')

      //convert o valor para float
      value = parseFloat(value)
      //verifica numero valido
      if (isNaN(value)) {
        return alert(
          'Não foi possivel calcular o total. O valor não parece ser um número válido'
        )
      }

      //incrementar o valor total
      total += Number(value)
    }

    //atualiza o total valor
    //expensesTotal.textContent = formatCurrencyBRL(total)
    //criar  a span para adicionar o r$ formatado
    const symbolBRL = document.createElement('small')
    symbolBRL.textContent = 'R$'
    total = formatCurrencyBRL(total).toUpperCase().replace('R$', '')

    //formata o valor e remove o R$ que será exibido pela small com um estilo customizado
    //limpa o conteudo do elemento
    expensesTotal.innerHTML = ''

    //adiciona o simbolo e o valor formatado
    expensesTotal.append(symbolBRL, total)
  } catch (error) {
    alert('Nao foi possivel atualizar os totais')
    console.log(error)
  }
}

//evento que captura click no icone de remover
expenseList.addEventListener('click', event => {
  //verifica se o elemento clicado é o icone de remover
  if (event.target.classList.contains('remove-icon')) {
    //Obtem a li pai do elemento clicado
    const item = event.target.closest('.expense')
    //remove o item da lista
    item.remove()

    //atualiza os totais
    updateTotals()
  }
})

//função para limpar o formulario
function clearForm() {
  //limpa os campos do formulario
  expense.value = ''
  amount.value = ''
  category.value = ''
} 