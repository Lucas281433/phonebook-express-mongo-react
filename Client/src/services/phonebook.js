import axios from "axios";

const baseUrl = "/api/persons";

/**
 * Returns a Promise that resolves to the list of all persons in the phonebook
 * stored on the server.
 *
 * @returns {Promise<Object[]>} A Promise that resolves to the list of all persons
 */
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

/**
 * Adds a new person to the phonebook on the server.
 *
 * @param {Object} newPerson - The person to add, must have "name" and "number" properties.
 * @returns {Promise<Object>} A Promise that resolves to the newly added person.
 */
const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

/**
 * Deletes a person from the phonebook on the server.
 *
 * @param {number} id - The unique identifier of the person to delete.
 * @returns {Promise<Object>} A Promise that resolves to the response data after deletion.
 */
const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

/**
 * Updates a person in the phonebook on the server.
 *
 * @param {number} id - The unique identifier of the person to update.
 * @param {Object} personToUpdate - The updated person information, must have "name" and "number" properties.
 * @returns {Promise<Object>} A Promise that resolves to the updated person.
 */
const update = (id, personToUpdate) => {
  const request = axios.put(`${baseUrl}/${id}`, personToUpdate);
  return request.then((response) => response.data);
};

export default { getAll, create, deletePerson, update };
