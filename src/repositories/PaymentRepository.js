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

}

module.exports = new PaymentRepository();