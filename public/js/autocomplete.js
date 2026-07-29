// public/js/autocomplete.js
// Simple client‑side autocomplete for product search
// Fetches product names from the new API endpoint and displays matching suggestions.

(() => {
  const input = document.getElementById('search-input');
  const list = document.getElementById('autocomplete-list');
  if (!input || !list) return;

  let productNames = [];
  // Load names once on page load
  fetch('/api/v1/products/names')
    .then((res) => res.json())
    .then((data) => {
      if (data.success && Array.isArray(data.names)) {
        productNames = data.names;
      }
    })
    .catch((err) => console.error('Autocomplete fetch error:', err));

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  const render = (matches) => {
    list.innerHTML = '';
    if (!matches.length) {
      list.style.display = 'none';
      return;
    }
    matches.forEach((name) => {
      const div = document.createElement('div');
      div.className = 'autocomplete-item';
      div.textContent = name;
      div.addEventListener('click', () => {
        input.value = name;
        list.style.display = 'none';
      });
      list.appendChild(div);
    });
    list.style.display = 'block';
  };

  const onInput = debounce(() => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      list.style.display = 'none';
      return;
    }
    const matches = productNames
      .filter((n) => n.toLowerCase().includes(q))
      .slice(0, 10);
    render(matches);
  }, 200);

  input.addEventListener('input', onInput);
  // Hide list when focus leaves (after a short delay to allow click)
  input.addEventListener('blur', () => setTimeout(() => (list.style.display = 'none'), 150));
})();
