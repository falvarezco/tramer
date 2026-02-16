const https = require('https');

class ExitoCarullaClient {
  constructor(storeName = 'exito') {
    this.storeName = storeName;
    this.baseURL = storeName === 'exito'
      ? 'https://www.exito.com/api/graphql'
      : 'https://www.carulla.com/api/graphql';
  }

  async searchProducts(searchTerm, options = {}) {
    const variables = {
      first: options.limit || 20,
      after: options.offset || "0",
      sort: options.sort || "score_desc",
      term: searchTerm,
      selectedFacets: [
        {
          key: "channel",
          value: JSON.stringify({
            salesChannel: "1",
            regionId: ""
          })
        },
        {
          key: "locale",
          value: "es-CO"
        }
      ]
    };

    const params = new URLSearchParams({
      operationName: 'SearchQuery',
      variables: JSON.stringify(variables)
    });

    const url = `${this.baseURL}?${params}`;

    return new Promise((resolve, reject) => {
      https.get(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Referer': this.storeName === 'exito' ? 'https://www.exito.com/' : 'https://www.carulla.com/',
          'Accept-Language': 'es-CO,es;q=0.9,en;q=0.8'
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const products = this.extractProducts(parsed);
            resolve(products);
          } catch (e) {
            console.error('Error parsing response:', e);
            reject(e);
          }
        });
      }).on('error', reject);
    });
  }

  extractProducts(response) {
    try {
      let products = [];

      if (response.data?.search?.products?.edges) {
        products = response.data.search.products.edges.map(edge => edge.node);
      } else if (response.data?.search?.products?.items) {
        products = response.data.search.products.items;
      }

      return products.map(product => ({
        store: this.storeName,
        sku: product.sku || product.id,
        name: product.name,
        brand: product.brand?.name || 'Sin marca',
        price: this.extractPrice(product),
        listPrice: this.extractListPrice(product),
        discount: this.calculateDiscount(product),
        image: this.extractImage(product),
        volume: this.extractVolume(product.name),
        pricePerUnit: this.calculatePricePerUnit(product),
        available: this.checkAvailability(product),
        url: this.buildProductUrl(product)
      }));
    } catch (error) {
      console.error('Error extracting products:', error);
      return [];
    }
  }

  extractPrice(product) {
    if (product.offers?.lowPrice) return product.offers.lowPrice;
    if (product.offers?.offers?.[0]?.price) return product.offers.offers[0].price;
    if (product.items?.[0]?.sellers?.[0]?.commertialOffer?.Price) {
      return product.items[0].sellers[0].commertialOffer.Price;
    }
    return null;
  }

  extractListPrice(product) {
    if (product.offers?.offers?.[0]?.listPrice) return product.offers.offers[0].listPrice;
    if (product.items?.[0]?.sellers?.[0]?.commertialOffer?.ListPrice) {
      return product.items[0].sellers[0].commertialOffer.ListPrice;
    }
    return null;
  }

  calculateDiscount(product) {
    const price = this.extractPrice(product);
    const listPrice = this.extractListPrice(product);
    if (price && listPrice && listPrice > price) {
      return Math.round(((listPrice - price) / listPrice) * 100);
    }
    return 0;
  }

  extractImage(product) {
    if (product.image?.[0]?.url) return product.image[0].url;
    if (product.items?.[0]?.images?.[0]?.imageUrl) {
      return product.items[0].images[0].imageUrl;
    }
    return null;
  }

  extractVolume(productName) {
    const match = productName.match(/\((\d+)\s*(ml|l|gr|g|kg)\)/i);
    if (match) {
      const value = parseInt(match[1]);
      const unit = match[2].toLowerCase();
      if (unit === 'l') return value * 1000;
      if (unit === 'kg') return value * 1000;
      return value;
    }
    return null;
  }

  calculatePricePerUnit(product) {
    const price = this.extractPrice(product);
    const volume = this.extractVolume(product.name);
    if (price && volume) {
      return (price / volume * 1000).toFixed(2);
    }
    return null;
  }

  checkAvailability(product) {
    if (product.offers?.offers?.[0]?.availability === "https://schema.org/InStock") return true;
    if (product.items?.[0]?.sellers?.[0]?.commertialOffer?.AvailableQuantity > 0) return true;
    return false;
  }

  buildProductUrl(product) {
    const baseUrl = this.storeName === 'exito'
      ? 'https://www.exito.com'
      : 'https://www.carulla.com';

    if (product.slug) {
      return `${baseUrl}/${product.slug}/p`;
    }
    return baseUrl;
  }
}

module.exports = ExitoCarullaClient;
