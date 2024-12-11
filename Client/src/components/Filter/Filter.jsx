import { FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import "./Filter.css"
/**
 * Component for filtering the persons list.
 * 
 * @param {string} personFilter The current filter string.
 * @param {function} handlePersonFilter A function to handle the change of the filter string.
 * @returns {JSX.Element} The Filter component.
 */
const Filter = ({ personFilter, handlePersonFilter }) => {
  return (
    <InputGroup className="mb-2">
      <InputGroupText><h3 className="input-text"><strong>Filter shown with:</strong></h3></InputGroupText> 
      <FormControl value={personFilter} onChange={handlePersonFilter} className="input-style" />
    </InputGroup>
  );
};

export default Filter;
