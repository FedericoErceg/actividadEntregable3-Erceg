import express from 'express';
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager('./products.json');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productManager.getProductById(id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error del servidor, vuelve a cargar la página o espera a que lo solucionemos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en puerto ${PORT}`);
});

