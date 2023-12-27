import { useLocation, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import {
  Grid,
  CardContent,
  Button,
  Avatar,
  Card,
  TextField,
} from "@mui/material";
import myApi from "../../API/api";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(location.state.data.user._id);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const fetchLoggedInUser = () => {
    myApi.get(`/user/${userId}`).then((data) => {
      console.log(data.data);
      setFirstName(data.data.firstName);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
    });
  };
  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const updateUser = () => {
    if (!email || !firstName || !lastName) return;
    myApi
      .put("/users/change", {
        userId,
        email,
        firstName,
        lastName,
      })
      .then(() => {
        console.log("done");
      });
  };

  const changePage = () => {
    navigate("/classes", { state: { userId } });
  };

  const avatarStyle = {
    padding: 20,
    margin: "20px auto",
  };
  const paperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px" }}>
      <Grid container spacing={6} style={paperStyle}>
        <Grid item xs={12} sm={4} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <Avatar style={avatarStyle} />
            <CardContent style={cardStyle}>
              <label>First Name:</label>
              <TextField
                label="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <label>Last Name:</label>
              <TextField
                label="lastName"
                value={lastName}
                onChange={handleLastNameChange}
              />
              <label>Email:</label>
              <TextField
                label="Email"
                value={email}
                onChange={handleEmailChange}
              />
              <Button type="submit" variant="contained" onClick={updateUser}>
                Click to Save
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" onClick={changePage}>
        Go to Classes
      </Button>
    </Container>
  );
};

export default Profile;
