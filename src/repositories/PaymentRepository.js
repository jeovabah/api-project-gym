const { Op } = require('sequelize');
const { Clients } = require('../models'); 
const { Payments } = require('../models')

class PaymentRepository {
  async getAllPayments() {
    return await Payments.findAll({
      include: [{
        model: Clients,
        as: 'client', 
        attributes: ['id', 'name', 'statusPaid', 'dayToPay']
      }]
    });
  }

  async totalPaid() {

    const totalClientsPaidThisMonth = await Payments.sum('amountPaid', {
      where: {
        statusPaid: true,
        month: new Date().getMonth() + 1
      },
    }) 
    const {rows: totalClientsNotPaid, count} = await Clients.findAndCountAll({
      where: {
        statusPaid: false,
      }
    });
    
    
    return {
      totalPaid: await Payments.sum('amountPaid', {
        where: {
          statusPaid: true
        },
      }),
      totalClientsPaidThisMonth: totalClientsPaidThisMonth || 0 ,
      totalClientsNotPaid: {quantity: count , clients : totalClientsNotPaid}
    }
  }

  async verifyPaymentsClientsOnThisMonth() {
    const currentMonth = new Date().getMonth() + 1; 
    const currentYear = new Date().getFullYear();
  
    const payments = await Payments.findAll({
      include: [{
        model: Clients,
        as: 'client'
      }],
      where: {
        statusPaid: true,
        [Op.or]: [
          { month: { [Op.lt]: currentMonth } },  
          { year: { [Op.lt]: currentYear } }    
        ]
      }
    });
  
    for (const payment of payments) {
      await Payments.update({ statusPaid: false }, {
        where: {
          id: payment.id
        }
      });
  
      if (payment.client && payment.client.statusPaid) {
        await Clients.update({ statusPaid: false }, {
          where: {
            id: payment.clientId
          }
        });
      }
    }
  }
  
  
  


}

module.exports = new PaymentRepository();