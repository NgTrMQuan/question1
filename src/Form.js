import React, { useState } from 'react';

const Form = ({ onTaskSubmit }) => {
  const [task, setTask] = useState('');

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task.trim() !== '') {
      onTaskSubmit(task);
      setTask('');
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Enter task ..."
          value={task}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;