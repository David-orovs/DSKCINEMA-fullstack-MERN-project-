const express = require("express");
const router = express.Router();


router.post('/charge', (req, res) => {
    const amount = 2500;
    
    stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
      amount,
      description: 'checkout',
      currency: 'usd',
      customer: customer.id
    }))
    .then(charge => res.send('success'));
  });

  module.exports = router;