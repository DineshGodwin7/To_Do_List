import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewAll.css"; // Import custom styles

const ViewAll = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("Token");
    if (!token) {
      alert("Unauthorized! Please log in.");
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:8080/viewAll", { headers: { Authorization: token } })
      .then((response) => setTodos(response.data))
      .catch((err) => {
        setError("Failed to fetch To-Dos");
        console.error("Error:", err);
      });
  }, [navigate]);

  return (
    <div className="viewall-container">
      <h2 className="text-center mb-4">📝 All To-Dos</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row justify-content-center">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo.id} className="col-md-4 mb-4">
              <div className="card todo-card shadow">
                <div className="card-body">
                  <h5 className="card-title">{todo.title} 📌</h5>
                  <p className="card-text">{todo.description}</p>
                  <p className="priority">
                    <strong>🔹 Priority:</strong> {todo.priority}
                  </p>
                  <p>
                    <strong>📅 Date:</strong> {todo.date}
                  </p>
                  <p>
                    <strong>⏰ Time:</strong> {todo.time}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No To-Dos available. Start adding tasks! 😊</p>
        )}
      </div>
    </div>
  );
};

export default ViewAll;
