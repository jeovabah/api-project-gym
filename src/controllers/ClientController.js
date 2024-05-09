const express = require('express');
const router = express.Router();
const clientsService = require('../services/ClientsService');
const { buildSuccessResponse, buildErrorResponse } = require('../utils/response');

router.get('/', async (req, res) => {
  try {
    const clients = await clientsService.getAllClients();
    return res.status(200).json(buildSuccessResponse(clients));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

router.get('/unic/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const client = await clientsService.getClientById(id);
    if (!client) {
      return res.status(404).json(buildErrorResponse('Cliente não encontrado'));
    }
    return res.status(200).json(buildSuccessResponse(client));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

router.post('/add', async (req, res) => {
  const clientData = req.body;
  try {
    const newClient = await clientsService.createClient(clientData);
    return res.status(201).json(buildSuccessResponse(newClient));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const clientData = req.body;
  try {
    const updatedClient = await clientsService.updateClient(id, clientData);
    return res.status(200).json(buildSuccessResponse(updatedClient));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await clientsService.deleteClient(id);
    return res.status(204).json(buildSuccessResponse(null, "Cliente deletado com sucesso"))
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

router.get('/quantityAll', async (req, res) => {
  try {
    const count = await clientsService.quantityAll();
    return res.status(200).json(buildSuccessResponse({activeClients: count}, "Quantidade de clientes ativos"))
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

module.exports = router;
