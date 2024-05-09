const { Router } = require('express');
const AppController = require("../controllers/AppController");
const ClientController = require("../controllers/ClientController");
const router = Router();

router.use('/', AppController);
router.use('/client', ClientController);
module.exports = router;    