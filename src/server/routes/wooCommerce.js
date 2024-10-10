const express = require('express');
const router = express.Router();
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3"
});

router.get('/products', async (req, res) => {
  try {
    const response = await api.get("products");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products from WooCommerce' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const response = await api.post("products", req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product in WooCommerce' });
  }
});

router.put('/products/:id', async (req, res) => {
  try {
    const response = await api.put(`products/${req.params.id}`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product in WooCommerce' });
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const response = await api.delete(`products/${req.params.id}`, {
      force: true
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product from WooCommerce' });
  }
});

module.exports = router;