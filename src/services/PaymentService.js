const paymentRepository = require('../repositories/PaymentRepository');
class PaymentService {
  async getAllPayments() {
    return await paymentRepository.getAllPayments() || [];
  }

  async totalPaid() {
    return await paymentRepository.totalPaid() || [];
  }

}

module.exports = new PaymentService();