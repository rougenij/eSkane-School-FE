import { useState } from "react";
import myApi from "../../API/api";
import { useNavigate } from "react-router-dom";

//MUI Imports
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar, Typography } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Link from "@mui/material/Link";

export default function Login() {
  const navgiate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginHandle = () => {
    if (!email || !password) return;
    myApi
      .post("/users/login", {
        email,
        password,
      })
      .then((data) => {
        if (data.data.status === "success") {
          navgiate("/profile", { state: { data: data.data } });
        }
      });
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = {
    backgroundColor: "green",
  };

  const btnStyle = {
    margin: "8px 0",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LoginIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          onChange={handleEmailChange}
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
          value={email}
        />
        <TextField
          onChange={handlePasswordChange}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          value={password}
        />
        <Button
          onClick={loginHandle}
          type="submit"
          variant="contained"
          style={btnStyle}
          fullWidth
        >
          Sign In
        </Button>
        <Typography>
          <Link href="#">Forgot Password?</Link>
        </Typography>
        <Typography>
          Dont have an account?
          <Link href="/register">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
