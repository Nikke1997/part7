import { Button } from "@mui/material";

const LogOut = () => {
  const handleClick = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.reload();
  };

  return (
    <>
      <Button style={{marginTop: '10px', marginLeft: '10px'}}variant='contained' onClick={handleClick}>Log Out</Button>
    </>
  );
};

export default LogOut;
