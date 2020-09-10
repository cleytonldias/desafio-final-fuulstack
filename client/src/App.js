import React, { useEffect, useState } from 'react';
import * as api from './api/apiService.js';
import LancamentosControl from './components/LancamentosControl.js';
import { Header } from './components/Header.js';

export default function App() {
  const [selectedYearMonth, setSelectedYearMonth] = useState('');
  const [lancamentos, setlancamentos] = useState([]);
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

  const handleDelete = () => {
    console.log('Delete');
  };
  const handlePersit = () => {
    console.log('Persist');
  };

  console.log(lancamentos);
  return (
    <div>
      {lancamentos.length > 0 && (
        <div>
          <Header lancamentos={lancamentos} />
          <LancamentosControl
            lancamentos={lancamentos}
            onDelete={handleDelete}
            onPersit={handlePersit}
          />
        </div>
      )}
      {lancamentos.length == 0 && <p>Carregando Lançamentos...</p>}
    </div>
  );
}
