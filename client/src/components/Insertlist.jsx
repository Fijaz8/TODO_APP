import React, { useState,useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";


function Insertlist(props) {
  const [habit, sethabit] = useState({
    title: "",
    content: "",
  });


  useEffect(() => {
    if (props.editTask) {
      sethabit({ ...props.editTask }); // ✅ Creates a new object to ensure reactivity
    }
  }, [props.editTask]);

  function handlechange(event) {
    const { name, value } = event.target;
    sethabit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }


  function handleclick(event){
    props.onadd(habit)
    sethabit({ title: "", content: "" });
    event.preventDefault();

}

  return (
    <div className="container">
      <form>
        <div class="mb-3">
          <label class="form-label">habit</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleInputcontent"
            onChange={handlechange}
            value={habit.title}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">brief content</label>
          <input
            name="content"
            type="text"
            class="form-control"
            id="exampleInputbrief"
            onChange={handlechange}
            value={habit.content}
          />
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleclick}>
        {props.editTask ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Insertlist;
