const paymentRepository = require('../repositories/PaymentRepository');
class PaymentService {
  async getAllPayments() {
    return await paymentRepository.getAllPayments() || [];
  }

  async totalPaid() {
    return await paymentRepository.totalPaid() || [];
  }

  async verifyPaymentsClients() {
    return await paymentRepository.verifyPaymentsClientsOnThisMonth() || [];
  }

}

module.exports = new PaymentService();