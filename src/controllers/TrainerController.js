const express = require('express');
const router = express.Router();
const trainersService = require('../services/TrainersService');
const { buildSuccessResponse, buildErrorResponse } = require('../utils/response');

router.get('/', async (req, res) => {
  try {
    const trainers = await trainersService.getAllTrainers();
    return res.status(200).json(buildSuccessResponse(trainers));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const trainer = await trainersService.getTrainerById(id);
    if (!trainer) {
      return res.status(404).json(buildErrorResponse('Treinador não encontrado'));
    }
    return res.status(200).json(buildSuccessResponse(trainer));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

router.post('/', async (req, res) => {
  const trainerData = req.body;
  try {
    const newTrainer = await trainersService.createTrainer(trainerData);
    return res.status(201).json(buildSuccessResponse(newTrainer));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const trainerData = req.body;
  try {
    const updatedTrainer = await trainersService.updateTrainer(id, trainerData);
    return res.status(200).json(buildSuccessResponse(updatedTrainer));
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await trainersService.deleteTrainer(id);
    return res.status(204).json(buildSuccessResponse(null, "Treinador deletado com sucesso"))
  } catch (err) {
    return res.status(400).json(buildErrorResponse(err, err?.message));
  }
});

module.exports = router;
