import fs from 'fs/promises';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];

    // Load products initially
    this.loadProducts();
  }

  async addProduct(id, title, price, description, thumbnail, code, stock) {
    const producto = {
      id: id,
      title: title,
      price: price,
      description: description,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    this.products.push(producto);

    await this.saveProducts();
  }

  async getProduct() {
    return this.products;
  }

  async getProductById(id) {
    const productById = this.products.find((producto) => producto.id === id);

    if (productById) {
      return productById;
    } else {
      console.error("Id del producto no encontrado.");
      return null;
    }
  }

  async updateProduct(id, updatedProduct) {
    let productToUpdate = this.products.find((prod) => prod.id === id);

    if (productToUpdate) {
      Object.assign(productToUpdate, updatedProduct);
      await this.saveProducts();
      return productToUpdate;
    } else {
      console.log("Id del producto no encontrado. No se realizó el reemplazo del producto deseado.");
      return null;
    }
  }

  async saveProducts() {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products),
      "utf-8"
    );
  }

  async loadProducts() {
    try {
      const prodJson = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(prodJson);
    } catch (err) {
      console.error("Error al cargar productos: " + err);
    }
  }
}

export default ProductManager;
