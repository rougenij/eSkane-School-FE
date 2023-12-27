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

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    if (!email || !password || !firstName || !lastName) return;
    myApi
      .post("/users/register", {
        email,
        firstName,
        lastName,
        password,
        userType,
      })
      .then((data) => {
        console.log(data);
        navigate("/");
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
          <h2>Register</h2>
        </Grid>
        <TextField
          onChange={handleEmailChange}
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
        />
        <TextField
          onChange={handleFirstNameChange}
          label="First Name"
          placeholder="First Name"
          fullWidth
          required
        />
        <TextField
          onChange={handleLastNameChange}
          label="Last Name"
          placeholder="Last Name"
          fullWidth
          required
        />
        <TextField
          onChange={handlePasswordChange}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <InputLabel id="userType">What Are You?</InputLabel>
        <Select
          labelId="userType"
          id="userType"
          value={userType}
          onChange={handleUserTypeChange}
          autoWidth
          label="userType"
          fullWidth
        >
          <MenuItem value="Teacher">Teacher</MenuItem>
          <MenuItem value="Student">Student</MenuItem>
        </Select>
        <Button
          onClick={handleRegister}
          type="submit"
          variant="contained"
          style={btnStyle}
          fullWidth
        >
          Sign up
        </Button>
        <Typography>
          Do you have an account?
          <Link href="/">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
