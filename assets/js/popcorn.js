/*
Atule Tecnology
#RusiaIsATerroristState
*/
// Seleciona o botão e o menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Alterna a exibição do menu ao clicar no botão
menuToggle.addEventListener('click', (event) => {
  menu.classList.toggle('show');
  // Impede que este clique propague para o 'document', o que fecharia o menu imediatamente
  event.stopPropagation(); 
});

// 1. Fecha o menu ao clicar em qualquer link/item dentro dele
menu.addEventListener('click', (event) => {
  // Verifica se o clique foi em um link (tag <a>) ou item de lista (tag <li>)
  if (event.target.tagName === 'A' || event.target.tagName === 'LI') {
    menu.classList.remove('show');
  }
});

// 2. Fecha o menu ao clicar fora dele (perder o foco)
document.addEventListener('click', (event) => {
  // Se o menu estiver aberto E o clique NÃO foi dentro do menu e NEM no botão de toggle
  if (menu.classList.contains('show') && !menu.contains(event.target) && event.target !== menuToggle) {
    menu.classList.remove('show');
  }
});

