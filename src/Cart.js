import React from "react";

const Cart = ({ tasks, toggleCompletion, deleteTask, editTask }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); // or use any format you like
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          className="task my-3 px-3 py-2 border-2 rounded"
          style={{ backgroundColor: "#111827", border: "1px solid #2e3b4e" }}
          key={task.id}
        >
          <div className="d-flex justify-content-between">
            {/* Left section for task details */}
            <div className="task-details" style={{ width: "70%" }}>
              <h4>{task.title}</h4>
              <p className="mx-3 " style={{ color: "#6c757d", height: "50px" }}>
                {task.description}
              </p>

              {/* Created and Due Date in one row on the left */}
              <div className="row">
                <div className="col-4">
                  <strong>Created:</strong> {formatDate(task.id)}
                </div>
                <div className="col-4">
                  <strong>Due Date:</strong> {task.dueDate}
                </div>
                {/* <div className="col-6"></div> */}
              </div>
            </div>

            {/* Right section for actions */}
            <div
              className="task-actions "
              style={{
                width: "30%",
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Mark as Done and Priority in one row at the top */}
              <div className="row mb-4 m-1">
                <div className="col-8"></div>
                <button
                  className="btn btn-success col-4 p-1"
                  onClick={() => {
                    if (task.completed || new Date(task.dueDate) < new Date())
                      return; // Prevent click if time is over or task is already completed
                    toggleCompletion(task.id);
                  }}
                  style={{ height: "40px" }}
                  disabled={new Date(task.dueDate) < new Date()} // Disable button if the due date is passed
                >
                  {new Date(task.dueDate) < new Date()
                    ? "Time Over"
                    : task.completed
                    ? "Complete"
                    : "Done"}
                </button>
              </div>

              {/* Edit and Delete buttons in the bottom-right */}
              <div className="row mt-4">
                <div className="col-5"></div>
                <button
                  className="btn w-60 col-3"
                  style={{
                    height: "35px",
                    color: "white",
                    backgroundColor:
                      task.priority === "High"
                        ? "#4caf50"
                        : task.priority === "Medium"
                        ? "#444d5d"
                        : "red",
                  }}
                >
                  {task.priority}
                </button>

                <div className="col-2 text-start ">
                  <button
                    className="btn btn-warning w-60"
                    onClick={() => {
                        if(task.completed || new Date(task.dueDate) < new Date()) return ;
                      editTask(task);
                    }}
                    style={{
                      height: "35px",
                      backgroundColor:
                        task.completed || new Date(task.dueDate) < new Date()
                          ? "red" // Disabled state with a light gray background
                          : "#007bff", // Original background color for active state
                      color:
                        task.completed || new Date(task.dueDate) < new Date()
                          ? "#a9a9a9" // Disabled text color
                          : "white", // Active text colou
                        
                        cursor: (task.completed || new Date(task.dueDate) < new Date() )?"not-allowed":"",
                    }}
                    
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
                <div className="col-2 text-end ">
                  <button
                    className="btn btn-danger w-60"
                    onClick={() => deleteTask(task.id)}
                    style={{ height: "35px" }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
