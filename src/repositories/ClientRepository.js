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

  async quantityAll() {
    return await Clients.count();
  }

  async getDaysTrainnerClients() {
    try {
      const clientsAll = await Clients.findAll();
      
      // Verifica os dados recebidos
  
      const schedule = {
        "Segunda": {},
        "Terca": {},
        "Quarta-feira": {},
        "Quinta-feira": {},
        "Sexta-feira": {},
        "Sabado": {},
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
                dayToPay: client.dayToPay
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
