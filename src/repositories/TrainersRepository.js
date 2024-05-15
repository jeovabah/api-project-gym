const { Trainers } = require('../models');

class TrainersRepository {
  async getAllTrainers() {
    return await Trainers.findAll();
  }

  async getTrainerById(id) {
    return await Trainers.findByPk(id);
  }

  async createTrainer(trainerData) {
    return await Trainers.create(trainerData);
  }

  async updateTrainer(id, trainerData) {
    const trainer = await Trainers.findByPk(id);
    if (!trainer) {
      throw new Error('Treinador não encontrado');
    }
    return await trainer.update(trainerData);
  }

  async deleteTrainer(id) {
    const trainer = await Trainers.findByPk(id);
    if (!trainer) {
      throw new Error('Treinador não encontrado');
    }
    await trainer.destroy();
  }
}

module.exports = new TrainersRepository();
