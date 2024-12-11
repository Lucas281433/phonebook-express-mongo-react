import { Alert } from "react-bootstrap";

/**
 * A Notification component that displays a Bootstrap Alert component
 * with the message passed to it as a prop. If the message is null, the
 * component returns null. If the message starts with "Information" or
 * "Person", the component uses the "danger" variant of the Alert, otherwise
 * the "success" variant is used.
 *
 * @param {string|null} message The message to be displayed in the Alert.
 * @returns {JSX.Element|null} The Alert component or null if message is null.
 */
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  if (message.startsWith("Information") || message.startsWith("Person")) {
    return <Alert variant="danger">{message}</Alert>;
  }

  return <Alert variant="success">{message}</Alert>;
};

export default Notification;
