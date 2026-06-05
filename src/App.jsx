import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem("columns");
    return savedColumns ? JSON.parse(savedColumns) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "columns",
      JSON.stringify(columns)
    );
  }, [columns]);

  const addColumn = () => {
    if (columns.length >= 4) {
      alert("Maximum 4 columns allowed");
      return;
    }

    const columnName = prompt("Enter Column Name");

    if (!columnName?.trim()) return;

    const newColumn = {
      id: Date.now(),
      title: columnName,
      tasks: [],
    };

    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (columnId) => {
    const confirmDelete = window.confirm(
      "Delete this column?"
    );

    if (!confirmDelete) return;

    setColumns(
      columns.filter(
        (column) => column.id !== columnId
      )
    );
  };

  const addTask = (columnId) => {
    const taskTitle = prompt(
      "Enter Task Title"
    );

    if (!taskTitle?.trim()) return;

    setColumns(
      columns.map((column) => {
        if (column.id === columnId) {
          return {
            ...column,
            tasks: [
              ...column.tasks,
              {
                id: Date.now(),
                title: taskTitle,
              },
            ],
          };
        }

        return column;
      })
    );
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>📋 Kanban Board</h1>

        <button onClick={addColumn}>
          Add Column
        </button>
      </nav>

      <div className="board">
        {columns.map((column) => (
          <div
            key={column.id}
            className="column"
          >
            <div className="column-header">
              <h3>{column.title}</h3>

              <div className="header-right">
                <span className="task-count">
                  {column.tasks.length}
                </span>

                <button
                  className="delete-column-btn"
                  onClick={() =>
                    deleteColumn(column.id)
                  }
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="tasks-container">
              {column.tasks.length === 0 ? (
                <p className="empty-text">
                  No tasks yet
                </p>
              ) : (
                column.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="task-card"
                  >
                    {task.title}
                  </div>
                ))
              )}
            </div>

            <button
              className="task-btn"
              onClick={() =>
                addTask(column.id)
              }
            >
              + Add Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;