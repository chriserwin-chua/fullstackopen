import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonList from './components/PersonList';
import axios from 'axios';
import person from './services/person';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name == newName);
    if (!existingPerson) {
      const newPerson = { name: newName, number: newNumber };
      person
        .create(newPerson)
        .then((res) => {
          setPersons([...persons, res]);
          setNewName('');
          setNewNumber('');
          setNotificationMessage(
            `Successfully added ${res.name} to the phonebook.`
          );
          setNotificationType('success');
        })
        .catch((e) => alert(`Something went wrong ${e}`));
    } else {
      const shouldUpdate = window.confirm(
        `${newName} already exists in the phonebook, update the number?`
      );
      const updatedPerson = { name: newName, number: newNumber };
      if (shouldUpdate) {
        person
          .update(existingPerson.id, updatedPerson)
          .then((res) => {
            setPersons(
              persons.map((person) =>
                person.id == existingPerson.id ? res : person
              )
            );
            setNewName('');
            setNewNumber('');
            setNotificationMessage(`Successfully updated ${res.name} number.`);
            setNotificationType('success');
          })
          .catch((e) => alert(`Something went wrong ${e}`));
      }
      //alert(`${newName} is already in the phonebook.`);
    }
  };

  const handleDeletePerson = (id, name) => {
    const isConfirm = window.confirm(`Delete ${name}?`);
    if (isConfirm) {
      person.deletePerson(id).catch((e) => {
        setNotificationMessage(`${name} does not exist in the server.`);
        setNotificationType('error');
      });
      const newList = persons.filter((person) => person.id !== id);
      setPersons(newList);
    }
  };

  const personsToDisplay = !filter
    ? persons
    : persons.filter((person) => person.name.includes(filter));

  useEffect(() => {
    person.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  useEffect(() => {
    if (notificationMessage) {
      setTimeout(() => {
        setNotificationMessage('');
        setNotificationType('');
      }, 3000);
    }
  }, [notificationMessage]);

  if (!personsToDisplay) {
    return null;
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        notificationType={notificationType}
      />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <PersonList
        personsToDisplay={personsToDisplay}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
