/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./persons.scss";

const Persons = ({ id, name, number, handleDelete, handleUpdate }) => {
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
    <div className="update-person-container">
      <div className="updates-btn-holder">
        <div>
          {name}
          {" "}
          <span>
            {isEditing ? (
              <input
                value={updatedNumber}
                onChange={(e) => setUpdatedNumber(e.target.value)}
              />
            ) : (
              number
            )}
          </span>
        </div>
        <div>
          {isEditing ? (
            <button onClick={handleUpdateClick}>Update</button>
          ) : (
            <button onClick={handleDelete}>Delete</button>
          )}
          {!isEditing && <button onClick={handleEditClick}>Edit Num</button>}
        </div>
      </div>
    </div>
  );
};

export default Persons;
