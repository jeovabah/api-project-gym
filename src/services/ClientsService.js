const clientsRepository = require('../repositories/ClientRepository');

class ClientsService {
  async getAllClients() {
    return await clientsRepository.getAllClients() || []; 
  }

  async getClientById(id) {
    return await clientsRepository.getClientById(id) || {};
  }

  async createClient(clientData) {
    return await clientsRepository.createClient(clientData); 
  }

  async updateClient(id, clientData) {
    return await clientsRepository.updateClient(id, clientData);
  }

  async deleteClient(id) {
    return await clientsRepository.deleteClient(id);
  }

  async quantityAll() {
    return await clientsRepository.quantityAll();
  }
}

module.exports = new ClientsService();
