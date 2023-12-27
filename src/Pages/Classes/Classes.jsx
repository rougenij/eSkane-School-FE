import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import myApi from "../../API/api";
import Container from "@mui/material/Container";
import {
  Grid,
  CardContent,
  Button,
  Avatar,
  Card,
  TextField,
} from "@mui/material";

const Classes = () => {
  const location = useLocation();
  const [userId, setUserId] = useState(location.state.userId);
  const [userType, setUserType] = useState("");
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");

  const [user, setUser] = useState("");

  const classNameHandler = (event) => {
    console.log();
    setClassName(event.target.value);
  };

  const fetchLoggedInUser = () => {
    myApi.get(`/user/${userId}`).then((data) => {
      setUserType(data.data.userType);
      setUser(data.data.firstName);
      setClasses(data.data.enRolledClasses);
    });
  };
  useEffect(() => {
    fetchLoggedInUser();
    // fetchAllClasses();
  }, []);

  const createClass = () => {
    myApi
      .post("/class/create", {
        className: className,
        classTeacher: user,
        studentsList: [],
        userId,
      })
      .then((data) => {
        console.log(data);
      });
  };

  // const fetchAllClasses = () => {
  //   myApi.get("/classes").then((data) => {
  //     console.log(data);
  //   });
  // };

  const classesStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
  };

  return (
    <div>
      {userType === "Teacher" && (
        <Container maxWidth="lg" style={{ marginTop: "20px" }}>
          <Card sx={{ maxWidth: 345 }}>
            <TextField
              value={className}
              label="Inset class name here"
              fullWidth
              onChange={classNameHandler}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={createClass}
            >
              Create Class
            </Button>
          </Card>
        </Container>
      )}

      {classes.map((data, i) => {
        return (
          <Container maxWidth="lg" style={{ marginTop: "20px" }} key={i}>
            <Grid container spacing={6} style={classesStyle}>
              <Grid item xs={12} sm={4} md={4} style={classesStyle}>
                <Card sx={{ maxWidth: 345 }} style={classesStyle}>
                  <CardContent>
                    <div>Class Name: {data.className}</div>
                    <div>Class Teacher: {data.classTeacher}</div>
                    <div>Current Students in class:{data.studentsList}</div>
                  </CardContent>
                  <Button type="submit">Leave Class</Button>
                  <Button type="submit">Delete Class</Button>
                </Card>
              </Grid>
            </Grid>
          </Container>
        );
      })}
    </div>
  );
};

export default Classes;
