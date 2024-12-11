import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Persons.css"

/**
 * A component for displaying a list of persons in the phonebook.
 *
 * @param {Object[]} personsToShow - The persons to display in the list.
 * @param {function} deletePerson - The function to call when the delete button is pressed for a person.
 * @returns {JSX.Element} The rendered list of persons component.
 */
const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <ListGroup>
      {personsToShow.map((person) => (
        <ListGroupItem
          className="list-style"
          key={person.name}
        >
          <strong>
            {person.name} {person.number}
          </strong>
          <Button variant="danger ms-2" onClick={() => deletePerson(person.id)}>
            <i className="bi bi-person-dash me-2"></i>Delete
          </Button>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Persons;
