const trainersRepository = require('../repositories/TrainersRepository');

class TrainersService {
  async getAllTrainers() {
    return await trainersRepository.getAllTrainers();
  }

  async getTrainerById(id) {
    return await trainersRepository.getTrainerById(id);
  }

  async createTrainer(trainerData) {
    return await trainersRepository.createTrainer(trainerData);
  }

  async updateTrainer(id, trainerData) {
    return await trainersRepository.updateTrainer(id, trainerData);
  }

  async deleteTrainer(id) {
    return await trainersRepository.deleteTrainer(id);
  }
}

module.exports = new TrainersService();
