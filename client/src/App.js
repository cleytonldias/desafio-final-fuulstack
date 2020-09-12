import React, { useEffect, useState } from 'react';
import * as api from './api/apiService.js';
import LancamentosControl from './components/LancamentosControl.js';
import { Header } from './components/Header.js';
import { ModalLancamento } from './components/ModalLancamento.js';
import { Select } from './components/Select.js';

export default function App() {
  const [selectedYearMonth, setSelectedYearMonth] = useState('2020-07');
  const [lancamentos, setlancamentos] = useState([]);
  const [allLancamentos, setAllLancamentos] = useState([]);
  const [selectedLancamento, setSelectedLancamento] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getLancamentos = async () => {
      const lanc = await api.findByPeriod(selectedYearMonth);
      setTimeout(() => {
        setlancamentos(lanc);
        setAllLancamentos(lanc);
      }, 2000);
    };
    getLancamentos();
  }, [selectedYearMonth]);

  const handleDelete = async (id) => {
    const isDeleted = await api.remove(id);
    if (isDeleted) {
      const deletedLancamentos = lancamentos.filter((lancamento) => {
        return lancamento._id !== id;
      });
      const deletedAllLancamentos = allLancamentos.filter((lancamento) => {
        return lancamento._id !== id;
      });
      setlancamentos(deletedLancamentos);
      setAllLancamentos(deletedAllLancamentos);
    }
  };
  const handlePersit = async (lancamento) => {
    setSelectedLancamento(lancamento);
    setIsModalOpen(true);
  };

  const handlePersitData = async (formData) => {
    const { _id, type, description, category, value, yearMonthDay } = formData;

    const lancamentosToUpdate = Object.assign([], lancamentos);
    const lancamentoToUpdate = lancamentosToUpdate.find((lancamento) => {
      return lancamento._id === _id;
    });

    lancamentoToUpdate.type = type;
    lancamentoToUpdate.description = description;
    lancamentoToUpdate.descriptionLowerCase = description.toLowerCase();
    lancamentoToUpdate.category = category;
    lancamentoToUpdate.value = Number(value);
    lancamentoToUpdate.day = yearMonthDay.substring(8);
    lancamentoToUpdate.month = yearMonthDay.substring(5, 7);
    lancamentoToUpdate.year = yearMonthDay.substring(0, 4);
    lancamentoToUpdate.yearMonth = yearMonthDay.substring(0, 7);
    lancamentoToUpdate.yearMonthDay = yearMonthDay;

    const isUpdated = await api.update(lancamentoToUpdate);
    if (isUpdated) {
      const filteredLancamentos = lancamentosToUpdate.filter((lancamento) => {
        return lancamento.yearMonth === selectedYearMonth;
      });
      setlancamentos(filteredLancamentos);

      const filteredAllLancamentos = allLancamentos.filter((lancamento) => {
        return lancamento.yearMonth === selectedYearMonth;
      });
      setlancamentos(filteredAllLancamentos);
    } else {
      //Alerta de erro
      setlancamentos(lancamentos);
    }

    setIsModalOpen(false);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSelectChange = (selectedValue) => {
    setlancamentos([]);
    setSelectedYearMonth(selectedValue);
  };

  const handleKeyUp = (event) => {
    const filterTextLowerCase = event.target.value.toLowerCase();
    const lancamentosToFind = Object.assign([], allLancamentos);
    const returnedLancamentos = lancamentosToFind.filter((lancamento) => {
      return lancamento.description.includes(filterTextLowerCase);
    });
    console.log(filterTextLowerCase);
    setlancamentos(returnedLancamentos);
  };

  return (
    <div>
      <div>
        <h4>Controle Financeiro Pessoal</h4>
      </div>
      <Select onChange={handleSelectChange} yearMonth={selectedYearMonth} />
      <input type="text" id="txtFind" onKeyUp={handleKeyUp}></input>
      {lancamentos.length > 0 && (
        <div className="container">
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
