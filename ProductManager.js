import { promises as fsPromises } from 'fs';


class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
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
    await fsPromises.writeFile(
      this.path,
      JSON.stringify(this.products),
      "utf-8"
    );
  }

  async getProduct() {
    try {
      const prodJson = await fsPromises.readFile(this.path, "utf-8");
      const productos = JSON.parse(prodJson);
      return productos;
    } catch (err) {
      console.error("Error al obtener productos: " + err);
      return null;
    }
  }

  async getProductById(id) {
    try {
      const prodJson = await fsPromises.readFile(this.path, "utf-8");
      const productos = JSON.parse(prodJson);

      const productById = productos.find((producto) => producto.id == id);

      if (productById) {
        return productById;
      } else {
        console.error("Id del producto no encontrado.");
        return null;
      }
    } catch (err) {
      console.error("Error: " + err);
      return null;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const productos = await this.getProduct();
      let productToUpdate = productos.find((prod) => prod.id == id);

      if (productToUpdate) {
        Object.assign(productToUpdate, updatedProduct);
        await fsPromises.writeFile(this.path, JSON.stringify(productos), 'utf-8');
        return productToUpdate;
      } else {
        console.log("Id del producto no encontrado. No se realizó el reemplazo del producto deseado.");
        return null;
      }
    } catch (err) {
      console.error('Error al actualizar el producto: ' + err);
      return null;
    }
  }
}

const productManager = new ProductManager('./products.json');

async function mainCall() {
  const existeProductos = await productManager.getProduct();

  if (!existeProductos || existeProductos.lenght === 0) {
    await productManager.addProduct(
      1,
      'Coca Cola',
      600,
      'Lata de Coca Cola',
      './coca.png',
      12345,
      100
    );
    await productManager.addProduct(
      2,
      '7UP',
      500,
      'Lata de 7UP',
      './7UP.png',
      165,
      2000
    );
    console.log(await productManager.getProduct());
  } else{
    console.log('Los productos ya existen. No se añadieron nuevamente.')
  }
}

mainCall();

export default ProductManager;

