import React, { useEffect, useState } from 'react';
import * as api from './api/apiService.js';
import LancamentosControl from './components/LancamentosControl.js';
import { Header } from './components/Header.js';
import { ModalLancamento } from './components/ModalLancamento.js';

export default function App() {
  const [selectedYearMonth, setSelectedYearMonth] = useState('');
  const [lancamentos, setlancamentos] = useState([]);
  const [selectedLancamento, setSelectedLancamento] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  /*useEffect(() => {
    api.findByPeriod('2020-09').then((lancamentos) => {
      setTimeout(() => {
        setlancamentos(lancamentos);
      }, 2000);
    });
  }, []);*/

  useEffect(() => {
    const getLancamentos = async () => {
      const lanc = await api.findByPeriod('2020-07');
      setTimeout(() => {
        setlancamentos(lanc);
      }, 2000);
    };
    getLancamentos();
  }, []);

  const handleDelete = async (id) => {
    const isDeleted = await api.remove(id);
    if (isDeleted) {
      const filteredLancamentos = lancamentos.filter((lancamento) => {
        return lancamento._id !== id;
      });
      setlancamentos(filteredLancamentos);
    }
  };
  const handlePersit = async (lancamento) => {
    setSelectedLancamento(lancamento);
    setIsModalOpen(true);
  };

  const handlePersitData = (formData) => {
    console.log(formData);
    setIsModalOpen(false);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {lancamentos.length > 0 && (
        <div>
          <Header lancamentos={lancamentos} />
          <LancamentosControl
            lancamentos={lancamentos}
            onDelete={handleDelete}
            onPersist={handlePersit}
          />
          {isModalOpen && (
            <ModalLancamento
              onSave={handlePersitData}
              onClose={handleClose}
              selectedLancamento={selectedLancamento}
            />
          )}
        </div>
      )}
      {lancamentos.length == 0 && <p>Carregando Lançamentos...</p>}
    </div>
  );
}
