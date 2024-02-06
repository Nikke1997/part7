import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notifications.messages.message);
  const errorMessage = useSelector((state) => state.notifications.messages.errorMessage);

  console.log("message", message);

  if (message === null && errorMessage === null) {
    return null;
  } else if (message && errorMessage === null) {
    return <div className="green">{message}</div>;
  } else if (errorMessage && message === null) {
    return <div className="error">{errorMessage}</div>;
  }
};

export default Notification;
