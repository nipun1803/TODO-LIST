import React, { useState, useEffect } from "react";
import "./style.css"; // Import external CSS file

const ToDoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addOrUpdateTodo = () => {
    if (task.title.trim() === "" || task.description.trim() === "") return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = task;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, task]);
    }

    setTask({ title: "", description: "" });
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const editTodo = (index) => {
    setTask(todos[index]);
    setEditIndex(index);
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase()) ||
      todo.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h2 className="todo-header">To-Do App</h2>

      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <input
          type="text"
          className="todo-input"
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <button className="todo-button" onClick={addOrUpdateTodo}>
          {editIndex !== null ? "Update" : "Add"} Task
        </button>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li key={index} className="todo-item">
            <h4>{todo.title}</h4>
            <p>{todo.description}</p>
            <div className="button-group">
              <button className="edit-button" onClick={() => editTodo(index)}>Edit</button>
              <button className="delete-button" onClick={() => deleteTodo(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoApp;
