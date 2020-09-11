import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function ModalLancamento({ onSave, onClose, selectedLancamento }) {
  const [typeSelected, setTypeSelected] = useState(selectedLancamento.type);
  const {
    _id,
    type,
    description,
    category,
    value,
    yearMonthDay,
  } = selectedLancamento;
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose(null);
  };
  const handleClose = () => {
    onClose(null);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      _id,
      type: typeSelected,
      description: document.getElementById('txtDescription').value,
      category: document.getElementById('txtCategory').value,
      value: document.getElementById('txtValue').value,
      yearMonthDay: document.getElementById('txtDate').value,
    };
    onSave(formData);
  };
  const handleRadioChange = (event) => {
    setTypeSelected(event.target.value);
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
  return (
    <Modal isOpen={true}>
      <form onSubmit={handleSubmit}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Edição de lançamento</span>
          <span
            style={{
              cursor: 'pointer',
              backgroundColor: 'red',
              color: 'white',
            }}
            className="material-icons"
            onClick={handleClose}
          >
            close
          </span>
        </div>
        <p>
          <label>
            <input
              name="group1"
              type="radio"
              defaultChecked={type === '-'}
              defaultValue="-"
              onChange={handleRadioChange}
            />
            <span>Despesa</span>
          </label>
          <label>
            <input
              name="group1"
              type="radio"
              defaultChecked={type === '+'}
              defaultValue="+"
              onChange={handleRadioChange}
            />
            <span>Receita</span>
          </label>
        </p>
        <p>
          <label className="radio-inline">Descrição</label>
          <input
            type="text"
            id="txtDescription"
            defaultValue={description}
          ></input>
        </p>
        <p>
          <label className="radio-inline">Categoria</label>
          <input type="text" id="txtCategory" defaultValue={category}></input>
        </p>
        <p>
          <label className="radio-inline">Valor</label>
          <input type="number" id="txtValue" defaultValue={value}></input>
          <input type="date" id="txtDate" defaultValue={yearMonthDay} />
        </p>
        <p>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={handleSubmit}
          >
            Salvar
            <i className="material-icons right">send</i>
          </button>
        </p>
      </form>
    </Modal>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItens: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px',
  },

  title: {
    fontSize: '1.3rem',
    fontWight: 'bold',
  },
};
