import "./styles.css";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import en from "./language/en"
import es from "./language/es";

export default function App() {
  const [tasks, setTasks] = useState(['coding']);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showNotFinishedOnly, setShowNotFinishedOnly] = useState(false);
  const [language, setLanguage] = useState("en");
  const translations = language === "en" ? en : es;


  const handleTaskSubmit = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskCompletion = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((taskIndex) => taskIndex !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  const toggleNotFinishedOnly = () => {
    setShowNotFinishedOnly((prevValue) => !prevValue);
  };

  const filteredTasks = showNotFinishedOnly
    ? tasks.filter((_, index) => !completedTasks.includes(index))
    : tasks;

  const Home = () => {
    return (
      <div className="App">
        <div className="container">
          <TodoListHeader tasks={tasks} completedTasks={completedTasks} />
          <div>
            <input
              type="checkbox"
              checked={showNotFinishedOnly}
              onChange={toggleNotFinishedOnly}
            />
            <label>Not finished only</label>
          </div>
          <TodoList tasks={filteredTasks} handleTaskCompletion={handleTaskCompletion} />
          <Form onTaskSubmit={handleTaskSubmit} />
        </div>
        <Footer />
      </div>
    );
  };

  return (
    
    <div className="App">
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
      </select>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}


