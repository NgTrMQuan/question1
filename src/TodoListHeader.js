import React from 'react';

const Header = ({ tasks, completedTasks }) => {
  const tasksLeft = tasks.length - completedTasks.length;

  return <div className="header">You have {tasksLeft} tasks left!</div>;
};

export default Header;