import React, { Component } from 'react';

export function InputReadOnly({ titulo, valor }) {
  return (
    <div>
      <span>{titulo}</span>
      <input type="text" readOnly value={valor}></input>
    </div>
  );
}
