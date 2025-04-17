import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TODOLIST(props) {

  return (
    <div className="container-xxl">
      <h1>TODO</h1>
      {props.tasks &&
        props.tasks.length > 0 &&
        props.tasks.map((task, index) => (
          <div className="card" key={index} id={index}>
            <div className="card-header">{ task.title}</div>
            <div className="card-body">
              <p>{task.content}</p>
              <input
                type="checkbox"
                onChange={() => props.onDelete(task.id)}
                style={{ marginRight: "10px" }}
              />
              <button
                className="btn btn-warning btn-sm"
                onClick={() => {props.onEdit(index)
}}
                
              >
                Edit
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default TODOLIST;
