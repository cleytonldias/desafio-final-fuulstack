import React, { Component } from 'react';
import { InputReadOnly } from './InputReadOnly';
import { formatNumber } from '../helpers/formatHelpers.js';

export function Header({ lancamentos }) {
  const sumByType = (type) => {
    const totalByType = lancamentos
      .filter((lancamento) => {
        return lancamento.type === type;
      })
      .reduce((accumulator, current) => {
        return accumulator + (current.type === type ? current.value : 0);
      }, 0);

    return totalByType;
  };
  const receita = sumByType('+');
  const despesa = sumByType('-');
  const saldo = receita - despesa;

  return (
    <div style={styles.flexRow}>
      <InputReadOnly titulo="Lançamentos:" valor={lancamentos.length} />
      <InputReadOnly titulo="Receitas:" valor={formatNumber(receita)} />
      <InputReadOnly titulo="Despesas:" valor={formatNumber(despesa)} />
      <InputReadOnly titulo="Saldo:" valor={formatNumber(saldo)} />
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItens: 'center',
    flexwrap: 'wrap',
    border: '1px solid lightgray',
    padding: '5px',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWight: 'bold',
  },
};
