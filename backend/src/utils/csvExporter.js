const fs = require('fs').promises;

async function saveToCSV(groupedProducts, filename = 'price_comparison.csv') {
  const rows = [
    ['Store', 'Brand', 'Product', 'Volume', 'Price (COP)', 'List Price', 'Discount %', 'Price/Unit', 'Available']
  ];

  Object.values(groupedProducts).forEach(group => {
    group.products.forEach(product => {
      rows.push([
        product.store,
        product.brand,
        product.name,
        product.volume || '',
        product.price || '',
        product.listPrice || '',
        product.discount || 0,
        product.pricePerUnit || '',
        product.available ? 'Yes' : 'No'
      ]);
    });
  });

  const csv = rows.map(row => row.join(',')).join('\n');
  await fs.writeFile(filename, csv);
  console.log(`\n💾 Results saved to ${filename}`);
}

module.exports = { saveToCSV };
