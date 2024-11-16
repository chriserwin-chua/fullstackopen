import React from 'react';

const PersonList = ({ personsToDisplay, handleDeletePerson }) => {
  return (
    <div>
      {personsToDisplay && personsToDisplay.length > 0 ? (
        <ul>
          {personsToDisplay.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
              <button
                onClick={() => handleDeletePerson(person.id, person.name)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No record found.</p>
      )}
    </div>
  );
};

export default PersonList;
