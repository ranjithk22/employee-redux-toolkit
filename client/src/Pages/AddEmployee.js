import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { addEmployee } from "../Redux/EmployeesReducer";

function AddEmployee() {
  let navigate = useNavigate();

  // create dispatch to send employees date to store
  const dispatch = useDispatch();

  // Create Ref for form elements
  const idRef = useRef();
  const profilePicRef = useRef();
  const nameRef = useRef();
  const ageRef = useRef();
  const designationRef = useRef();
  const statusRef = useRef();

  // Create State for employee details
  const [emp, setEmp] = useState({
    id: 0,
    profilePic: "",
    name: "",
    age: 0,
    designation: "React Developer",
    status: false
  }
  );

  // Handlers to get value of Form elements
  const idHandler = (e) => {
    setEmp(prevState => ({ ...prevState, id: e.target.value }))
  };
  const profilePicHandler = (e) => {
    setEmp(prevState => ({ ...prevState, profilePic: e.target.value }))
  };

  const nameHandler = (e) => {
    setEmp(prevState => ({ ...prevState, name: e.target.value }))
  };

  const ageHandler = (e) => {
    setEmp(prevState => ({ ...prevState, age: e.target.value }))
  };

  const designationHandler = (e) => {
    setEmp(prevState => ({ ...prevState, designation: e.target.value }))
  };

  const statusHandler = (e) => {
    setEmp(prevState => ({ ...prevState, status: e.target.value }))
  };

  // Reset Values of Form Elements
  const onReset = () => {
    setEmp({ id: 0, profilePic: "", name: "", age: 0, designation: "", status: false })
    console.log("Reset Button Clicked")
  };



  // Post edited employee to database
  const onFormSubmit = (e) => {
    e.preventDefault();
    setEmp({
      id: idRef.current.value,
      profilePic: profilePicRef.current.value,
      name: nameRef.current.value,
      age: ageRef.current.value,
      designation: designationRef.current.value,
      status: statusRef.current.value
    });
    updateNewEmp();
  };

  const updateNewEmp = async () => {
    await Axios.post(`http://localhost:3001/employees/`, emp).then((res) => console.log(res.data));
    console.log(emp);
    dispatch(addEmployee(emp))
    navigate("/");
  };


  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <h3>Add Employee</h3>
        <div className="row add-employee">
          <div className="col-md-6">
            <ul>
              <li className="d-flex align-items-center mb-2">
                <label>ID</label>
                <input
                  className="form-control"
                  type="text"
                  value={emp.id}
                  onChange={idHandler}
                  ref={idRef}
                  required
                />
              </li>
              <li className="d-flex align-items-center mb-2">
                <label>Profile Pic URL</label>
                <input
                  className="form-control"
                  type="text"
                  value={emp.profilePic}
                  onChange={profilePicHandler}
                  ref={profilePicRef}
                  required
                />
              </li>
              <li className="d-flex align-items-center mb-2">
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={emp.name}
                  onChange={nameHandler}
                  ref={nameRef}
                  required
                />
              </li>
              <li className="d-flex align-items-center mb-2">
                <label>Age</label>
                <input
                  className="form-control"
                  type="text"
                  value={emp.age}
                  onChange={ageHandler}
                  ref={ageRef}
                  required
                />
              </li>
              <li className="d-flex align-items-center mb-2">
                <label>Designation</label>
                <select value={emp.designation}
                  onChange={designationHandler}
                  ref={designationRef}
                  required
                  id="designation">
                  <option>React Developer</option>
                  <option>Angular Developer</option>
                </select>
              </li>
              <li className="d-flex align-items-center mb-2">
                <label>Status</label>
                <select
                  value={emp.status}
                  onChange={statusHandler}
                  ref={statusRef}
                  required
                >
                  <option>{!emp.status ? "true" : "false"}</option>
                  <option>{emp.status ? "true" : "false"}</option>
                </select>
              </li>
            </ul>
            <button className="m-2 btn btn-sm btn-primary" onClick={onReset}>
              Reset
            </button>
            <button className="btn btn-sm btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddEmployee;
