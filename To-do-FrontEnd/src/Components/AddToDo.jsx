import axios from "axios";
import React, { useState } from "react";
import "./AddToDo.css";

const AddToDo = () => {
  const name = sessionStorage.getItem("Name");

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    time: "",
    date: "",
    priority: "",
    userId: sessionStorage.getItem("UserId")
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New To-Do:", todo);

    try {
      const response = await axios.post(
        "http://localhost:8080/addToDo",
        todo,
        { headers: { Authorization: sessionStorage.getItem("Token") } }
      );
      if (response.data.status === "Success") {
        alert("Successfully Added");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.Error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="add-todo-container">
      <h2>Welcome {name}</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={todo.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={todo.description}
          onChange={handleChange}
          required
        />
        <select
          name="priority"
          value={todo.priority}
          onChange={handleChange}
          required
        >
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="High">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          name="date"
          value={todo.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={todo.time}
          onChange={handleChange}
          required
        />
        <button type="submit" className="add-todo-button">
          Add
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default AddToDo;
