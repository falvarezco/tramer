function generateMockHistory(product, days) {
  const history = [];
  const basePrice = 3500 + Math.random() * 2000;
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    history.push({
      date: date.toISOString().split('T')[0],
      exito: Math.round(basePrice + (Math.random() - 0.5) * 200),
      carulla: Math.round(basePrice + 200 + (Math.random() - 0.5) * 200),
      euro: Math.round(basePrice - 100 + (Math.random() - 0.5) * 200)
    });
  }

  return history;
}

module.exports = { generateMockHistory };
