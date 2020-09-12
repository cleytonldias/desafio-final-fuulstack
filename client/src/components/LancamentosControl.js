import React from 'react';
import Action from './Action';

export default function LancamentosControl({
  lancamentos,
  onDelete,
  onPersist,
}) {
  const handleActionClick = (id, type) => {
    const lancamento = lancamentos.find((lancamento) => lancamento._id === id);
    if (type === 'delete') {
      onDelete(id);
      return;
    }

    onPersist(lancamento);
  };
  let cont = 0;
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
            <tr
              key={lancamento._id}
              style={lancamento.type === '-' ? styles.colorA : styles.colorB}
            >
              <td>{(cont = lancamento.day)}</td>
              <td>
                <div style={{ fontWeight: 'bold' }}>{lancamento.category}</div>
                <div>
                  <span>{lancamento.description}</span>
                </div>
              </td>
              <td>{lancamento.value}</td>
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
const styles = {
  colorA: {
    backgroundColor: '#F5B7B1',
    border: '2px solid white',
    padding: '5px',
    paddingTop: '10px',
    justifyContent: 'space-between',
    marginBottom: '40px',
    height: '10px',
  },

  colorB: {
    backgroundColor: '#A3E4D7',
    border: '2px solid white',
    padding: '5px',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },
};
