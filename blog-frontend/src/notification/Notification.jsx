import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {

const message = useSelector((state) => state.notification.messages.message);

const errorMessage = useSelector((state) => state.notification.messages.errorMessage);



  return (
    <div>
{message && <Alert severity="success">{message}</Alert>}
{errorMessage && <Alert severity="error">{errorMessage}</Alert>}      
    </div>
  )
}

export default Notification
