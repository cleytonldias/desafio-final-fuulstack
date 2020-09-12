import React, { Component } from 'react';

export function Select({ yearMonth, onChange }) {
  const handleSelectChange = (event) => {
    onChange(event.target.value);
  };

  const Data = new Date();
  console.log(Data);

  return (
    <div>
      <select className="browser-default" onChange={handleSelectChange}>
        <option value="2020-07">Jul/2020</option>
        <option value="2020-08">Ago/2020</option>
        <option value="2020-09">Set/2020</option>
        <option value="2020-10">Out/2020</option>
      </select>
    </div>
  );
}
