import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/Login/Login";
import SignupPage from "./Pages/SignUp/Signup";
import Profile from "./Pages/Profile/Profile";
import ClassesPage from "./Pages/Classes/Classes";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<LoginPage />} />
      <Route path="/register" exact element={<SignupPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/classes" element={<ClassesPage />} />
      <Route />
    </Routes>
  );
}

export default App;
