import React from 'react';
import Action from './Action';

export default function LancamentosControl({
  lancamentos,
  onDelete,
  onPersist,
}) {
  const handleActionClick = (id, type) => {
    console.log(id);
    console.log(type);
  };
  return (
    <table className="striped">
      <thead>
        <tr>
          <th>Novo Lançamento</th>
        </tr>
      </thead>
      <tbody>
        {lancamentos.map((lancamento) => {
          return (
            <tr key={lancamento._id}>
              <td>{lancamento.day}</td>
              <td>
                {lancamento.category}
                <br />
                {lancamento.description}
              </td>
              <td>
                <Action
                  onActionClick={handleActionClick}
                  id={lancamento._id}
                  type="create"
                />
                <Action
                  onActionClick={handleActionClick}
                  id={lancamento._id}
                  type="delete"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
}
