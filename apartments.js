(function () {
  const PRICE_PER_M2 = 9500; // сомонӣ / м²

  const TYPES = [
    { key: '1', label: '1-хонагӣ', min: 40, max: 48, count: 18 },
    { key: '2', label: '2-хонагӣ', min: 55, max: 68, count: 26 },
    { key: '3', label: '3-хонагӣ', min: 75, max: 92, count: 24 },
    { key: '4', label: '4-хонагӣ', min: 98, max: 110, count: 12 },
  ];

  function buildApartments() {
    const list = [];
    let globalIndex = 1;

    TYPES.forEach((type) => {
      for (let i = 0; i < type.count; i++) {
        const sqm = Math.round(type.min + ((type.max - type.min) * i) / (type.count - 1));
        const floor = 2 + (globalIndex % 17); // қабати 2 то 18
        const sold = (globalIndex % 6 === 0); // тахминан ҳар хонаи 6-ум фурӯхта шудааст
        list.push({
          id: 'A-' + String(100 + globalIndex),
          typeKey: type.key,
          typeLabel: type.label,
          sqm: sqm,
          floor: floor,
          price: sqm * PRICE_PER_M2,
          sold: sold,
        });
        globalIndex++;
      }
    });

    return list;
  }

  function formatPrice(n) {
    return n.toLocaleString('ru-RU') + ' сомонӣ';
  }

  function render(apartments, filter) {
    const grid = document.getElementById('aptGrid');
    const countEl = document.getElementById('aptCount');
    const filtered = filter === 'all' ? apartments : apartments.filter((a) => a.typeKey === filter);

    countEl.textContent = filtered.length + ' хона намоён';

    grid.innerHTML = filtered.map((a) => `
      <div class="apt-card">
        <div class="apt-card-top">
          <div class="apt-id">${a.id}</div>
          <div class="apt-status ${a.sold ? 'sold' : 'free'}">${a.sold ? 'Фурӯхта шуд' : 'Дастрас'}</div>
        </div>
        <div class="apt-title">${a.typeLabel}</div>
        <div class="apt-meta">
          <div>Метраж<span class="v">${a.sqm} м²</span></div>
          <div>Қабат<span class="v">${a.floor}</span></div>
        </div>
        <div class="apt-price">
          <div class="amount">${formatPrice(a.price)}</div>
          <a href="index.html#contact">Дархост →</a>
        </div>
      </div>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const apartments = buildApartments();
    render(apartments, 'all');

    const buttons = document.querySelectorAll('#filterBar .filter-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        render(apartments, btn.dataset.filter);
      });
    });
  });
})();
