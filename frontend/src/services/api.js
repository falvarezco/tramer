const API_BASE = '';

export async function comparePrices(product, stores = 'exito,carulla') {
  const res = await fetch(
    `${API_BASE}/api/compare?product=${encodeURIComponent(product)}&stores=${stores}`
  );
  const data = await res.json();
  return data.results;
}

export async function fetchHistory(product, days = 7) {
  const res = await fetch(
    `${API_BASE}/api/history/${encodeURIComponent(product)}?days=${days}`
  );
  const data = await res.json();
  return data.history;
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/api/stats`);
  const data = await res.json();
  return data.stats;
}

export async function fetchDeals(minDiscount = 20) {
  const res = await fetch(`${API_BASE}/api/deals?minDiscount=${minDiscount}`);
  const data = await res.json();
  return data.deals;
}

export async function trackProduct(product) {
  const res = await fetch(`${API_BASE}/api/track`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product }),
  });
  return res.json();
}

export async function createAlert(product, targetPrice) {
  const res = await fetch(`${API_BASE}/api/alerts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product, targetPrice }),
  });
  return res.json();
}

export async function getTrackedProducts() {
  const res = await fetch(`${API_BASE}/api/tracked`);
  const data = await res.json();
  return data.products;
}
