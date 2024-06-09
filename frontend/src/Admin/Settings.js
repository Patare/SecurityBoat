import React from 'react'
import { Container, TextField, Button, Box, Typography } from "@mui/material";
const Logout = () => {
    const onLogin=(e)=>{
        navigate("/login");
      }
  return (
    <div>
    <Typography variant="body1" sx={{ mt: 2 }}>
      Already registered? Then log in below:
    </Typography>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      sx={{ mt: 3 }}
      onClick={onLogin}
    >
      Login
    </Button>
  </div>
  )
}

export default Logout
