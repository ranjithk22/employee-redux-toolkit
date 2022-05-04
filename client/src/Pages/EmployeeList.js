import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { allEmployees, deleteEmployee } from "../Redux/EmployeesReducer";

function EmployeeList() {
  // get data from store
  const allEmmployeeFromStore = useSelector((state) => state.Employees.employees);

  // create dispatch to send employees date to store
  const dispatch = useDispatch();

  // Define state for employees
  const [empList, setEmpList] = useState([]);

  // Fetch all Employees data
  const fetchData = async () => {
    const res = await Axios.get("http://localhost:3001/employees").catch(
      (err) => console.log(err)
    );
    const data = await res.data.reverse();
    setEmpList(data);
    dispatch(allEmployees(data));
  };

  // Fetch all Employee data onLoad
  useEffect(() => {
    fetchData();
  }, []);

  // Delete single Employee
  const onEmployeeDelete = async (id) => {
    Axios.delete(`http://localhost:3001/employees/${id}`, {
      id,
    });
    dispatch(deleteEmployee(id));
  };


  return (
    <div className="employeeList">
      <header className="mb-3 d-flex justify-content-between align-items-center">
        <h5>Employee Dashboard</h5>
        <Link to="/add-employee/" className="btn btn-sm btn-primary">
          Add Employee
        </Link>
      </header>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>age</th>
            <th>Designation</th>
            <th>Status</th>
            <th>Edit Emp</th>
            <th>Delete Emp</th>
          </tr>
        </thead>
        <tbody>
          {allEmmployeeFromStore.map((emp) => {
            return (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>
                  <img className="img-fluid profile-pic" src={emp.profilePic} />
                </td>
                <td>{emp.name}</td>
                <td>{emp.age}</td>
                <td>{emp.designation}</td>
                <td>{emp.status ? "Active" : "No Active"}</td>
                <td>
                  <Link
                    to={`/edit-employee/${emp.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onEmployeeDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div >
  );
}

export default EmployeeList;
