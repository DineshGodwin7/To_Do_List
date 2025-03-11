import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import "./App.css";
import AddToDo from "./Components/AddToDo";
import ViewMine from "./Components/ViewMine";
import ViewAll from "./Components/ViewAll";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/addtodo" element={<AddToDo/>} />
        <Route path="/viewmine" element={<ViewMine/>} />
        <Route path="/viewall" element={<ViewAll/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
