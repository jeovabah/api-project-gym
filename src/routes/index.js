const { Router } = require('express');
const AppController = require("../controllers/AppController");
const ClientController = require("../controllers/ClientController");
const TrainerController = require("../controllers/TrainerController");
const router = Router();

router.use('/', AppController);
router.use('/client', ClientController);
router.use('/driver', TrainerController);
module.exports = router;    