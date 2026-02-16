class EuroSupermercadosClient {
  constructor() {
    this.baseURL = 'https://www.eurosupermercados.com.co';
  }

  async searchProducts(searchTerm) {
    console.log(`Euro search not implemented yet. Inspect their API at ${this.baseURL}`);
    return [];
  }
}

module.exports = EuroSupermercadosClient;
