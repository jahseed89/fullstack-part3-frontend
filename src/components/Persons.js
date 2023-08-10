import React, { useState } from 'react';

const Persons = ({id, name, number, handleDelete, handleUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedNumber, setUpdatedNumber] = useState(number);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    // Call the handleUpdate function passed from the parent component
    handleUpdate(id, updatedNumber);
    setIsEditing(false);
  };

  return (
    <div>
      <p>
        {name} <span>{isEditing ? <input value={updatedNumber} onChange={(e) => setUpdatedNumber(e.target.value)} /> : number}</span>
        {isEditing ? (
          <button onClick={handleUpdateClick}>Update</button>
        ) : (
          <button onClick={handleDelete}>Delete</button>
        )}
        {!isEditing && <button onClick={handleEditClick}>Edit Num</button>}
      </p>
    </div>
  );
};

export default Persons;