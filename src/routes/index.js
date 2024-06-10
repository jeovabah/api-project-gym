const { Router } = require('express');
const AppController = require("../controllers/AppController");
const ClientController = require("../controllers/ClientController");
const TrainerController = require("../controllers/TrainerController");
const PaymentController = require("../controllers/PaymentController");
const router = Router();

router.use('/', AppController);
router.use('/client', ClientController);
router.use('/trainer', TrainerController);
router.use('/payment', PaymentController);
module.exports = router;    