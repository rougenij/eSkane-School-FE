import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import myApi from "../../API/api";

import { Button } from "@mui/material";

const ClassDetails = () => {
  const location = useLocation();
  const [classId, setClassId] = useState(location.state.classId);
  const [currentClass, setCurrentClass] = useState({});
  const [students, setStudents] = useState([]);

  const fetchCurrentClass = () => {
    myApi.get(`classes/${classId}`).then((data) => {
      setCurrentClass(data.data);
    });
  };

  const fetchAllUsers = () => {
    myApi.get("/students").then((data) => {
      setStudents(data.data);
    });
  };

  useEffect(() => {
    fetchCurrentClass();
    fetchAllUsers();
  }, []);

  const addToClass = () => {};

  return (
    <div>
      <div>Class Name: {currentClass.className}</div>
      <div>Teacher Name: {currentClass.classTeacher}</div>
      <div>Students Enrolled to class: {currentClass.studentsList}</div>

      <div>Students list:</div>
      <div>
        {students &&
          students.map((student) => {
            {
              console.log(student);
            }
            return (
              <div>
                <div>
                  Student Name: {student.firstName} {student.lastName}{" "}
                  <Button type="submit" variant="contained">
                    Add to class
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ClassDetails;
