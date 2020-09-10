import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

async function findByPeriod(periodo) {
  const res = await axios.get(`${API_URL}?period=${periodo}`);
  const lancamentos = res.data
    .map((lancamento) => {
      return {
        ...lancamento,
        descriptionLowerCase: lancamento.description.toLowerCase(),
      };
    })
    .sort((a, b) => {
      return a.day - b.day, a.type - b.type;
    });
  return lancamentos;
}

async function create(lancamento) {
  const response = await axios.post(API_URL, lancamento);
  return response.data();
}

async function update(lancamento) {
  const response = await axios.put(API_URL, lancamento);
  return response.data();
}

async function remove(lancamento) {
  const response = await axios.delete(API_URL, lancamento);
  return response.data();
}

export { findByPeriod, create, update, remove };
