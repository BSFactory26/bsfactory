"use strict";
const filters = document.querySelector('.filters');
if (filters) {
  const buttons = [...filters.querySelectorAll('button')];
  const cards = [...document.querySelectorAll('.product[data-kind]')];
  const status = document.querySelector('#filter-status');
  filters.hidden = false;
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button || !filters.contains(button)) return;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'alle' && card.dataset.kind !== button.dataset.filter; });
    const count = cards.filter(card => !card.hidden).length;
    status.textContent = `${count} ${count === 1 ? 'Idee wird' : 'Ideen werden'} angezeigt.`;
  });
}
