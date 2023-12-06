const express = require("express");
const ProductManager = require("./ProductManager.js");

const productManager = new ProductManager("./products.json");
const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));

async function mainCall() {
  await productManager.addProduct(
    1,
    "Coca Cola",
    600,
    "Lata de Coca Cola",
    "./coca.png",
    12345,
    100
  );
  await productManager.addProduct(
    2,
    "7UP",
    500,
    "Lata de 7UP",
    "./7UP.png",
    165,
    2000
  );
  console.log(await productManager.getProduct());
}

mainCall();

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
  console.log(`servidor funcionando en puerto ${PORT}`);
});
