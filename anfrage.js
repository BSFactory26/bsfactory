"use strict";
function buildBusinessInquiry(data) {
  const value = name => String(data[name] || '').trim();
  const lines = ['Hallo BS Factory,', '', 'ich möchte folgendes Projekt unverbindlich anfragen:', '',
    'Firma / Organisation: ' + value('company'), 'Ansprechperson: ' + (value('person') || '–'),
    'Bereich: ' + value('product'), 'Stückzahl: ' + value('quantity'),
    'Wunschtermin: ' + (value('date') || 'noch offen'), 'Budgetrahmen: ' + (value('budget') || 'noch offen'),
    'Größen / Farben / Varianten: ' + (value('variants') || 'noch offen'), '',
    'Projektbeschreibung:', value('details') || 'Details stimmen wir gern gemeinsam ab.', '',
    'Logo / Beispieldateien: füge ich bei Bedarf als E-Mail-Anhang hinzu.', '', 'Vielen Dank und freundliche Grüße', value('person') || value('company')];
  const body = lines.join('\n');
  const subject = 'B2B-Anfrage: ' + value('product') + ' | ' + value('company');
  return { body, subject, href: 'mailto:bastian.schulze@bsfactory.de?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body) };
}
if (typeof module !== 'undefined' && module.exports) module.exports = { buildBusinessInquiry };
if (typeof document !== 'undefined') {
  const form = document.querySelector('#business-inquiry');
  if (form) {
    const button = form.querySelector('button[type="submit"]');
    button.disabled = false;
    document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
      form.elements.product.value = link.dataset.interest;
    }));
    form.addEventListener('submit', event => {
      event.preventDefault();
      const result = buildBusinessInquiry(Object.fromEntries(new FormData(form).entries()));
      document.querySelector('#inquiry-copy').value = result.body;
      document.querySelector('#open-inquiry-mail').href = result.href;
      document.querySelector('#mail-fallback').hidden = false;
      document.querySelector('#inquiry-status').textContent = 'Deine Anfrage ist vorbereitet, aber noch nicht gesendet. Öffne sie jetzt in deinem E-Mail-Programm oder kopiere den Text.';
      document.querySelector('#open-inquiry-mail').focus();
    });
    document.querySelector('#copy-inquiry').addEventListener('click', async () => {
      const text = document.querySelector('#inquiry-copy');
      try {
        await navigator.clipboard.writeText(text.value);
        document.querySelector('#inquiry-status').textContent = 'Anfragetext kopiert. Füge ihn in deine E-Mail ein und sende sie an bastian.schulze@bsfactory.de.';
      } catch (_) {
        text.focus(); text.select();
        document.querySelector('#inquiry-status').textContent = 'Bitte kopiere den markierten Anfragetext und füge ihn in deine E-Mail ein.';
      }
    });
  }
}
