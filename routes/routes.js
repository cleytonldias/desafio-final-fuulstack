const express = require('express');
const service = require('../services/transactionService.js');
const transactionRouter = express.Router();

transactionRouter.post('/', service.create);
transactionRouter.get('/', service.findByPeriod);
transactionRouter.put('/', service.findAndUpdate);
transactionRouter.delete('/', service.findAndRemove);

module.exports = transactionRouter;
