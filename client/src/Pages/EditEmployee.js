import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editEmployee } from "../Redux/EmployeesReducer";

import "bootstrap/scss/bootstrap.scss";

function EditEmployee() {
  let navigate = useNavigate();
  // get data from store
  const allEmmployeeFromStore = useSelector((state) => state.Employees.employees);
  // create dispatch to send employees date to store
  const dispatch = useDispatch();
  // Id to fetch current employee
  const { id } = useParams();

  // Define state for employee
  const [emp, setEmp] = useState({});
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [designation, setDesignation] = useState("");
  const [status, setStatus] = useState(false);

  // Fetch Employee data
  const fetchData = async () => {
    const res = await Axios.get(`http://localhost:3001/employees/${id}`).catch(
      (err) => console.log(err)
    );
    const data = await res.data;
    console.log(data);
    setEmp(data);
    setProfilePic(data.profilePic);
    setName(data.name);
    setAge(data.age);
    setDesignation(data.designation);
    setStatus(data.status);
    return data;
  };

  // Put edited employee to database
  const onSubmit = (e) => {
    e.preventDefault();
    setProfilePic(profilePic);
    setName(name);
    setAge(age);
    setDesignation(designation);
    setStatus(status);

    setEmp({ ...emp, profilePic, name, age, designation, status });

    Axios.put(`http://localhost:3001/employees/${id}`, {
      ...emp,
      profilePic,
      name,
      age,
      designation,
      status,
    }).then((res) => console.log(res.data));

    console.log(emp)
    dispatch(editEmployee(emp))
    navigate("/");
  };

  // Fetch all Employee data onLoad
  useEffect(() => {
    fetchData();
  }, []);

  // Handlers to get value of Form elements
  const profilePicHandler = (e) => {
    setProfilePic(e.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const ageHandler = (e) => {
    setAge(e.target.value);
  };

  const designationHandler = (e) => {
    setDesignation(e.target.value);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  // Reset all Employees Data
  const onReset = () => {
    fetchData();
  };

  return (
    <div>
      <h3>Edit Employee</h3>
      <div className="row add-employee">
        <div className="col-md-6">
          <ul>
            <li className="d-flex align-items-center mb-2">
              <label>ID</label>
              <input type="text" value={id} disabled />
            </li>
            <li className="d-flex align-items-center mb-2">
              <label>Profile Pic URL</label>
              <input
                type="text"
                value={profilePic}
                onChange={profilePicHandler}
              />
            </li>
            <li className="d-flex align-items-center mb-2">
              <label>Name</label>
              <input type="text" value={name} onChange={nameHandler} />
            </li>
            <li className="d-flex align-items-center mb-2">
              <label>Age</label>

              <input type="text" value={age} onChange={ageHandler} />
            </li>
            <li className="d-flex align-items-center mb-2">
              <label>Designation</label>
              <select value={designation} onChange={designationHandler}>
                <option>React Developer</option>
                <option>Angular Developer</option>
              </select>
            </li>
            <li className="d-flex align-items-center mb-2">
              <label>Status</label>
              <select value={status} onChange={statusHandler}>
                <option>{!status ? "true" : "false"}</option>
                <option>{status ? "true" : "false"}</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
      <button className="m-2 btn btn-sm btn-primary" onClick={onReset}>
        Reset
      </button>
      <button className="btn btn-sm btn-primary" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}

export default EditEmployee;
