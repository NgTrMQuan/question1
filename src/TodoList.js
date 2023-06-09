import React, { useState, useEffect } from 'react';
import { FaRegCircle, FaRegCheckCircle } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = ({ tasks, handleTaskCompletion }) => {
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const storedCompletedTasks = localStorage.getItem('completedTasks');

    if (storedTasks) {
      setCompletedTasks(JSON.parse(storedTasks));
    }

    if (storedCompletedTasks) {
      setCompletedTasks(JSON.parse(storedCompletedTasks));
    }
  }, []);

  // Update localStorage whenever tasks or completedTasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [removed] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, removed);

    setCompletedTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div className="todo-list-container" {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={index} draggableId={`task-${index}`} index={index}>
                {(provided) => (
                  <div
                    className="todo-item-container"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {completedTasks.includes(index) ? (
                      <FaRegCheckCircle
                        className="item-done-button"
                        color="#9a9a9a"
                        onClick={() => handleTaskCompletion(index)}
                      />
                    ) : (
                      <FaRegCircle
                        className="item-done-button"
                        color="#9a9a9a"
                        onClick={() => handleTaskCompletion(index)}
                      />
                    )}
                    <div className="item-title">{task}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
