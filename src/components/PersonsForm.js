import React from 'react';

const PersonsFrom = ({ onSubmit, textValue, textOnchange, numValue, numOnchange }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>Add new</h2>
      <div>
          Name:{" "} <br />
        <input
          type="text"
          value={textValue}
          onChange={textOnchange}
          name="name"
        />
        <br />
          Numbers:{" "} <br />
        <input
          type="number"
          value={numValue}
          onChange={numOnchange}
          name="number"
        />
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </div>
    </form>
  );
};

export default PersonsFrom;