const express = require('express');
const router = express.Router();
const paymentService = require('../services/PaymentService');
const { buildSuccessResponse, buildErrorResponse } = require('../utils/response');

router.get('/', async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    return res.status(200).json(buildSuccessResponse(payments));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
})

router.get('/totalPaid', async (req, res) => {
  try {
    const payments = await paymentService.totalPaid();
    return res.status(200).json(buildSuccessResponse(payments));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
})

router.post('/verifyPaymentsClients', async (req, res) => {
  try {
    const payments = await paymentService.verifyPaymentsClients();
    return res.status(200).json(buildSuccessResponse(payments));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
})


module.exports = router;