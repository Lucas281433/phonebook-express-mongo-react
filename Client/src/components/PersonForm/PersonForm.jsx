import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Card,
  CardBody,
} from "react-bootstrap";

/**
 * A form component for adding a new person to the phonebook.
 *
 * @param {function} addPerson - The function to call when the form is submitted.
 * @param {string} newName - The current name entered in the form.
 * @param {function} handleNameChange - The function to call when the name input changes.
 * @param {string} newNumber - The current number entered in the form.
 * @param {function} handleNumberChange - The function to call when the number input changes.
 * @returns {JSX.Element} The rendered form component.
 */
const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <Form onSubmit={addPerson}>
      <Card border="primary mb-2">
        <CardBody>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text className="border-primary">Name:</InputGroup.Text>
            <FormControl
              value={newName}
              onChange={handleNameChange}
              className="border-primary"
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text className="border-primary">
              Number:
            </InputGroup.Text>
            <FormControl
              value={newNumber}
              onChange={handleNumberChange}
              className="border-primary"
            />
          </InputGroup>

          <Button type="submit">Add</Button>
        </CardBody>
      </Card>
    </Form>
  );
};

export default PersonForm;
