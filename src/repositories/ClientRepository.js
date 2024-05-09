const { Clients } = require('../models'); 

class ClientsRepository {
  async getAllClients() {
    return await Clients.findAll();
  }

  async getClientById(id) {
    return await Clients.findByPk(id);
  }

  async createClient(clientData) {
    return await Clients.create(clientData);
  }

  async updateClient(id, clientData) {
    const client = await Clients.findByPk(id);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }
    return await client.update(clientData);
  }

  async deleteClient(id) {
    const client = await Clients.findByPk(id);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }
    await client.destroy();
  }
}

module.exports = new ClientsRepository();
