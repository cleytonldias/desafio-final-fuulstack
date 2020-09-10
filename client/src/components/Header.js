import React, { Component } from 'react';
import { InputReadOnly } from './InputReadOnly';

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
    <div>
      <InputReadOnly titulo="Lançamentos:" valor={lancamentos.length} />
      <InputReadOnly titulo="Receitas:" valor={receita} />
      <InputReadOnly titulo="Despesas:" valor={despesa} />
      <InputReadOnly titulo="Saldo:" valor={saldo} />
    </div>
  );
}
