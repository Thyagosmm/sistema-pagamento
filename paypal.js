const paypal = require('@paypal/checkout-server-sdk');
const express = require('express');

const clientId = 'AYTzSpClzM2gdkiyNr2KUyWOSjuP5O4wxAlS3u3ksJ_nhW_R2LRlSvLvzDq0VcoHSUrQs3BaaHx9TNPa';
const clientSecret = 'EBU32LkIb7xHPvcIO77EZRU5AdMXV91nbYHTYt6IpTnWRbSOKPMWLJwoQUvow3RgeAlO7jIGC6LYnJwf';

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const router = express.Router();

router.post('/create-order', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'BRL',
        value: req.body.total
      }
    }]
  });

  try {
    const order = await client.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/capture-order', async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);

  try {
    const capture = await client.execute(request);
    // Salvar no banco de dados
    const db = require('./database');
    db.run('INSERT INTO orders (product_id, amount, status, paypal_id) VALUES (?, ?, ?, ?)', 
      [1, capture.result.purchase_units[0].amount.value, 'completed', capture.result.id]);
    
    res.json({ status: 'success' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = { checkoutRouter: router };