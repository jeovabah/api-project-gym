const {Router} = require('express');
const { buildSuccessResponse, buildErrorResponse } = require('../utils/response');

const router = Router();

router.get('/', (req, res) => {
    try {
        return res.status(200).json(buildSuccessResponse('Bem vindo a API!'));
    } catch (err) {
        return res.status(400).json(buildErrorResponse(err));
    }
});

module.exports = router;