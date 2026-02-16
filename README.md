# 🛒 Tramer: Colombian Supermarket Price Tracker MVP

A price tracking system for Colombian supermarkets (Éxito, Carulla, Euro) that helps you find the best deals and track price history.

## 🚀 Features

- **Real-time price comparison** across major Colombian supermarkets
- **Price history tracking** with trend analysis
- **Deal alerts** when products drop below target prices
- **Beautiful React dashboard** for data visualization
- **REST API** for integration with other services
- **Daily automated monitoring** of selected products
- **CSV export** for data analysis

## 📋 Prerequisites

- Node.js 14+ installed
- Basic knowledge of JavaScript/React
- No AI/ML experience needed!

## 🔧 Installation

### 1. Clone or create project directory
```bash
mkdir colombian-price-tracker
cd colombian-price-tracker
```

### 2. Copy the provided files
- `colombian-price-tracker.js` - Main scraping logic
- `server.js` - Express API server
- `test-tracker.js` - Test script
- `price-dashboard.jsx` - React frontend
- `package.json` - Dependencies

### 3. Install dependencies
```bash
npm install
```

## 🏃‍♂️ Quick Start

### Test the Éxito API connection
```bash
npm test
```

This will search for "leche" and show sample results.

### Start the API server
```bash
npm run server
```

Server runs on http://localhost:3000

### Test API endpoints
```bash
# Compare prices
curl "http://localhost:3000/api/compare?product=leche"

# Get best deals
curl "http://localhost:3000/api/deals"

# Check tracked products
curl "http://localhost:3000/api/tracked"
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/compare?product={name}` | Compare prices for a product |
| GET | `/api/history/{product}` | Get price history |
| GET | `/api/tracked` | List tracked products |
| POST | `/api/track` | Add product to tracking |
| POST | `/api/alerts` | Set price alert |
| GET | `/api/deals` | Get current best deals |
| GET | `/api/stats` | System statistics |
| GET | `/api/health` | Health check |

## 💻 Frontend Setup

### Option 1: Use with existing React app
Copy `price-dashboard.jsx` to your components folder.

### Option 2: Create new React app
```bash
npx create-react-app price-frontend
cd price-frontend
npm install recharts lucide-react
# Copy price-dashboard.jsx to src/
```

## 🔍 How It Works

### 1. Data Collection
The system uses Éxito/Carulla's public GraphQL API endpoints:
- No authentication required
- GET requests with search parameters
- Returns JSON with product details

### 2. Price Comparison
```javascript
// Example usage
const aggregator = new ColombianPriceAggregator();
const results = await aggregator.compareProductPrices('leche');
aggregator.formatComparison(results);
```

### 3. Data Storage
Currently uses:
- In-memory storage for quick MVP
- CSV files for history export
- JSON files for persistence

## 📈 Extending the System

### Add Euro Supermercados
1. Open Chrome DevTools on eurosupermercados.com.co
2. Search for a product
3. Find their API endpoint in Network tab
4. Update `EuroSupermercadosClient` class

### Add Database (Recommended)
```bash
npm install sqlite3
# or
npm install pg  # for PostgreSQL
```

### Add Email Alerts
```bash
npm install nodemailer
```

## 🎯 Use Cases

1. **Personal Shopping**
   - Track your regular grocery items
   - Get alerts when prices drop

2. **Price Analysis**
   - Export data to CSV
   - Analyze trends over time
   - Find best shopping days

3. **Business Intelligence**
   - Monitor competitor pricing
   - Track inflation on specific products
   - Identify pricing patterns

## ⚙️ Configuration

### Tracked Products
Edit in `server.js`:
```javascript
const trackedProducts = new Set([
  'leche', 'arroz', 'aceite', 'huevos', 'pan',
  // Add your products here
]);
```

### Monitoring Schedule
Edit cron schedule in `server.js`:
```javascript
// Runs at 8 AM daily
cron.schedule('0 8 * * *', async () => {
  // Daily price check
});
```

## 🐛 Troubleshooting

### "No products found"
- Check internet connection
- Verify store website is accessible
- Try different search terms

### API errors
- Check if store website structure changed
- Verify selectors in DevTools
- Update API endpoints if needed

## 📊 Sample Output

```
🔍 Searching for: "leche" across exito, carulla...

📊 PRICE COMPARISON RESULTS
================================================================================

📦 ALQUERIA (1000ml)
----------------------------------------
  EXITO      | $3,590 (-10%) ✅ MEJOR PRECIO
             | $3.59/L
  CARULLA    | $3,850 (+$260 vs mejor precio)
             | $3.85/L

📦 COLANTA (1000ml)  
----------------------------------------
  EXITO      | $3,450 (-5%)
             | $3.45/L
  CARULLA    | $3,650
             | $3.65/L

================================================================================
💾 Results saved to price_comparison.csv
```

## 🚀 Production Deployment

### Deploy to Heroku
```bash
heroku create colombian-price-tracker
git push heroku main
```

### Deploy to Render
1. Connect GitHub repo
2. Set build command: `npm install`
3. Set start command: `npm start`

### Environment Variables
```bash
PORT=3000
NODE_ENV=production
```

## 📝 License

MIT - Use freely for personal or commercial projects

## 🤝 Contributing

Feel free to:
- Add more supermarkets
- Improve price matching algorithm
- Add new features
- Fix bugs

## 📧 Support

For questions or issues:
- Check the troubleshooting section
- Review the test script output
- Inspect browser DevTools for API changes

---

**Built with ❤️ for smart grocery shopping in Colombia 🇨🇴**
