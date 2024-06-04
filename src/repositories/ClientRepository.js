const { Clients } = require('../models'); 
const { Trainers } = require('../models');
const { Payments } = require('../models')

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
    
    try {
      const updatedClient = await client.update(clientData);
  
      if (clientData?.statusPaid === true) {
        const paymentData = {
          clientId: id,
          month: new Date().getMonth() + 1,  
          year: new Date().getFullYear(),
          amountPaid: clientData?.amountPaid || 0,
          statusPaid: true,
          paymentDate: new Date()
        };
  
        await Payments.create(paymentData);
      }
  
      return updatedClient;
    } catch (error) {
      throw error;
    }
  }

  async deleteClient(id) {
    const client = await Clients.findByPk(id);
    if (!client) {
      throw new Error('Cliente não encontrado');
    }
    await client.destroy();
  }

  async quantityAll() {
    return await Clients.count();
  }

  async getDaysTrainnerClients() {
    try {
      const clientsAll = await Clients.findAll({
        include: [{
          model: Trainers,
          as: 'trainer', // certifique-se que esse alias corresponde ao definido no modelo Clients
          attributes: ['id', 'name', 'specialty'] // Especifique os atributos que você quer incluir do treinador
        }]
      });
      
      // Verifica os dados recebidos
  
      const schedule = {
        "Segunda": {},
        "Terca": {},
        "Quarta-feira": {},
        "Quinta-feira": {},
        "Sexta-feira": {},
        "Sábado": {},
        "Domingo": {}
      };
  
      clientsAll.forEach(client => {
        const daysAndTimes = client.daysOfWeek || {};
  
        for (const day in daysAndTimes) {
          if (Object.prototype.hasOwnProperty.call(daysAndTimes, day)) {
            const times = daysAndTimes[day];
  
            if (!schedule[day]) {
              schedule[day] = {};
            }
  
            times.forEach(time => {
              if (!schedule[day][time]) {
                schedule[day][time] = [];
              }
              schedule[day][time].push({
                id: client.id,
                name: client.name,
                statusPaid: client.statusPaid,
                dayToPay: client.dayToPay,
                trainer: client.trainer ? {
                  id: client.trainer.id,
                  name: client.trainer.name,
                  specialty: client.trainer.specialty
                } : null
              });
            });
          }
        }
      });
  
      // Ordenar os horários em cada dia
      for (const day in schedule) {
        if (Object.prototype.hasOwnProperty.call(schedule, day)) {
          const times = Object.keys(schedule[day]);
          const sortedTimes = times.sort((a, b) => {
            const [aHours, aMinutes] = a.split(':').map(Number);
            const [bHours, bMinutes] = b.split(':').map(Number);
            return aHours - bHours || aMinutes - bMinutes;
          });
  
          const orderedSchedule = {};
          sortedTimes.forEach(time => {
            orderedSchedule[time] = schedule[day][time];
          });
  
          schedule[day] = orderedSchedule;
        }
      }
  
  
      return {
        message: "Dias da semana de treino dos clientes",
        status: true,
        response: schedule,
        error: null
      };
    } catch (error) {
      console.error("Erro ao buscar os clientes:", error);
      return {
        message: "Erro ao buscar os clientes",
        status: false,
        response: null,
        error: error.message
      };
    }
  }
}

module.exports = new ClientsRepository();
