import React, { Component } from 'react';

export function InputReadOnly({ titulo, valor }) {
  return (
    <div>
      {titulo}
      <input type="text" readOnly value={valor} style={styles.size}></input>
    </div>
  );
}
const styles = {
  flexRow: {
    border: '5px solid lightgray',
  },

  title: {
    fontSize: '1.3rem',
    fontWight: 'bold',
  },

  size: {
    width: '120px',
    padding: '10px',
    border: '0px',
  },
};
