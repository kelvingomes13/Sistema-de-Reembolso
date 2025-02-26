//seleciona os elementos do formulario
const amount = document.getElementById('amount');

//adiciona um evento de input no campo de valor
amount.oninput = function() {

  //remove tudo que não for número
  let value = amount.value.replace(/\D/g, '');

  //transformar o valor em centavos (dividir por 100 exemplo:150/100 = 1.50)
  value = Number(value) / 100;

  //converte o valor para número
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  //formata o número para moeda brasileira
  value = value.toLocaleString('pt-BR', { 
    style: 'currency',
    currency: 'BRL' });
//retorna o valor formatado
    return value;
}