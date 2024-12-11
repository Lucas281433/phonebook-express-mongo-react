import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import phonebookService from "./services/phonebook";

import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import Persons from "./components/Persons/Persons";
import Notification from "./components/Notification/Notification";
import phonebookImage from "./assets/phonebook.webp"

/**
 * The main App component.
 *
 * This component renders the entire application, including the title, form,
 * list of persons, and notification area.
 *
 * The component uses the useState hook to store the following state:
 * - persons: an array of objects, each representing a person in the phonebook.
 * - newName: the new name to be added to the phonebook.
 * - newNumber: the new phone number to be added to the phonebook.
 * - personFilter: the string to filter the persons list by.
 * - message: the message to be displayed in the notification area.
 *
 * The component uses the useEffect hook to fetch the list of persons from the
 * server when the component mounts.
 *
 * The component renders the following components:
 * - Notification: displays the message in the notification area.
 * - Filter: renders the filter form.
 * - PersonForm: renders the form for adding a new person.
 * - Persons: renders the list of persons.
 */
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [personFilter, setPersonFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebookService.getAll().then((phonebook) => setPersons(phonebook));
  }, []);

/**
 * Updates the newName state with the value from the input field.
 *
 * @param {object} event - The event object from the input field change event.
 */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  /**
   * Updates the newNumber state with the value from the input field.
   *
   * @param {object} event - The event object from the input field change event.
   */
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

/**
 * Updates the personFilter state with the value from the filter input field.
 *
 * @param {object} event - The event object from the input field change event.
 */
  const handlePersonFilter = (event) => {
    setPersonFilter(event.target.value);
  };

  /**
   * Handles the submission of the person form.
   *
   * If a person with the same name already exists in the phonebook, the user is
   * prompted to confirm whether to update the existing person's phone number.
   * If the user confirms, the person is updated on the server and the list of
   * persons is updated accordingly.
   *
   * If the person does not exist in the phonebook, the person is added to the
   * phonebook on the server and the list of persons is updated accordingly.
   *
   * @param {object} event - The event object from the form submission event.
   */
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const repeatedPerson = persons.find((person) => person.name === newName);

    if (repeatedPerson) {
      if (
        window.confirm(
          `${repeatedPerson.name} is alredy added to phonebook, replace the old number with a new one ?`
        )
      ) {
        phonebookService
          .update(repeatedPerson.id, newPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== repeatedPerson.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setMessage(`Update of ${newPerson.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setMessage(
                `Information of ${newPerson.name} has already been removed from server`
              );
            }
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      phonebookService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${newPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setMessage(error.response.data.error);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

/**
 * Deletes a person from the phonebook after user confirmation.
 *
 * Finds the person by their unique identifier and prompts the user
 * for confirmation before deleting the person from the server and
 * updating the local list of persons.
 *
 * @param {number} id - The unique identifier of the person to delete.
 */
  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const personToSeach = persons.filter(
    (person) => person.name.toLowerCase() === personFilter.toLowerCase()
  );

  const personsToShow = personFilter ? personToSeach : persons;

  return (
    <Container className="d-flex justify-content-center">
      <div>
        <h2 className="text-center">
          <i className="bi bi-journal-text"></i> <strong>Phonebook</strong> 
        </h2>
          <img src={phonebookImage} width='300' />
        <Notification message={message} />
        <Filter
          personFilter={personFilter}
          handlePersonFilter={handlePersonFilter}
        />
        <h3 className="text-center">
          <i className="bi bi-person-fill-add"></i> <strong>Add a New</strong>
        </h3>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
        <h3 className="text-center">
          <i className="bi bi-telephone"></i> <strong>Numbers</strong>
        </h3>
        <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
      </div>
    </Container>
  );
};

export default App;
