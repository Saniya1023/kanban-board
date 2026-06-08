import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [columns, setColumns] = useState(() => {
    const saved =
      localStorage.getItem("columns");
    return saved ? JSON.parse(saved) : [];
  });

  const [columnName, setColumnName] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [selectedColumn, setSelectedColumn] =
    useState(null);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "columns",
      JSON.stringify(columns)
    );
  }, [columns]);

  const addColumn = () => {
    if (!columnName.trim()) return;

    if (columns.length >= 4) {
      alert("Maximum 4 columns allowed");
      return;
    }

    setColumns([
      ...columns,
      {
        id: Date.now(),
        title: columnName,
        tasks: [],
      },
    ]);

    setColumnName("");
  };

  const deleteColumn = (id) => {
    setColumns(
      columns.filter(
        (column) => column.id !== id
      )
    );
  };

  const openTaskModal = (
    columnId
  ) => {
    setSelectedColumn(columnId);

    setTaskData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });

    setShowModal(true);
  };

  const addTask = () => {
    if (!taskData.title.trim())
      return;

    const newTask = {
      id: Date.now(),
      ...taskData,
    };

    setColumns(
      columns.map((column) =>
        column.id === selectedColumn
          ? {
              ...column,
              tasks: [
                ...column.tasks,
                newTask,
              ],
            }
          : column
      )
    );

    setShowModal(false);
  };

  const deleteTask = (
    columnId,
    taskId
  ) => {
    setColumns(
      columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks:
                column.tasks.filter(
                  (task) =>
                    task.id !== taskId
                ),
            }
          : column
      )
    );
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>📋 Kanban Board</h1>

        <div className="add-column">
          <input
            value={columnName}
            onChange={(e) =>
              setColumnName(
                e.target.value
              )
            }
            placeholder="Column Name"
          />

          <button onClick={addColumn}>
            Add Column
          </button>
        </div>
      </nav>

      <div className="board">
        {columns.map((column) => (
          <div
            key={column.id}
            className="column"
          >
            <div className="column-header">
              <h3>{column.title}</h3>

              <button
                onClick={() =>
                  deleteColumn(
                    column.id
                  )
                }
              >
                🗑️
              </button>
            </div>

            <div className="tasks-container">
              {column.tasks.map(
                (task) => (
                  <div
                    key={task.id}
                    className="task-card"
                  >
                    <div className="task-top">
                      <h4>
                        {task.title}
                      </h4>

                      <button
                        onClick={() =>
                          deleteTask(
                            column.id,
                            task.id
                          )
                        }
                      >
                        ❌
                      </button>
                    </div>

                    <p>
                      {
                        task.description
                      }
                    </p>

                    <div className="task-footer">
                      <span
                        className={`priority ${task.priority.toLowerCase()}`}
                      >
                        {
                          task.priority
                        }
                      </span>

                      <span>
                        📅{" "}
                        {
                          task.dueDate
                        }
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>

            <button
              className="task-btn"
              onClick={() =>
                openTaskModal(
                  column.id
                )
              }
            >
              + Add Task
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Task</h2>

            <input
              placeholder="Title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  title:
                    e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              value={
                taskData.description
              }
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  description:
                    e.target.value,
                })
              }
            />

            <select
              value={
                taskData.priority
              }
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  priority:
                    e.target.value,
                })
              }
            >
              <option>
                Low
              </option>
              <option>
                Medium
              </option>
              <option>
                High
              </option>
            </select>

            <input
              type="date"
              value={
                taskData.dueDate
              }
              onChange={(e) =>
                setTaskData({
                  ...taskData,
                  dueDate:
                    e.target.value,
                })
              }
            />

            <div className="modal-buttons">
              <button
                onClick={addTask}
              >
                Add Task
              </button>

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;