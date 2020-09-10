const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {
  try {
    const {
      description,
      value,
      category,
      year,
      month,
      day,
      yearMonth,
      yearMonthDay,
      type,
    } = req.body;

    const transaction = new TransactionModel({
      description: description,
      value: value,
      category: category,
      year: year,
      month: month,
      day: day,
      yearMonth: yearMonth,
      yearMonthDay: yearMonthDay,
      type: type,
    });

    const data = transaction.save();

    if (data) {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  let condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const data = await TransactionModel.find(condition);

    if (!data) {
      res.status(404).send('Nao foi encontrada nenhuma transaction');
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }
};

const findAndUpdate = async (req, res) => {
  try {
    const id = req.body._id;
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    if (!data) {
      res.status(404).send('Nao foi encontrado o registro para atualizar');
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao atualizar o registro' });
  }
};

const findByPeriod = async (req, res) => {
  try {
    const period = req.query.period;
    const data = await TransactionModel.find({ yearMonth: period });
    if (!data) {
      res
        .status(404)
        .send('Nao foi encontrada nenhuma transação para o período informado');
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }
};

const findAndRemove = async (req, res) => {
  try {
    const id = req.body._id;
    const data = await TransactionModel.findByIdAndRemove({ _id: id });
    if (!data) {
      res.status(404).send('Nao foi encontrado o registro para excluir');
    } else {
      res.send(data);
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao excluir o registro' });
  }
};

module.exports = {
  create,
  findAll,
  findAndUpdate,
  findByPeriod,
  findAndRemove,
};
