import "./App.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import EmployeeList from "./Pages/EmployeeList";
import AddEmployee from "./Pages/AddEmployee";
import EditEmployee from "./Pages/EditEmployee";

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <header>
          <div className="container">
            <h4>
              <Link to="/">Employee Dashboard</Link>
            </h4>
          </div>
        </header>
        <section className="content container">
          <Routes>
            <Route path="/" exact element={<EmployeeList />} />
            <Route path="/add-employee/" element={<AddEmployee />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
            <Route path="/*" element={<EmployeeList />} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
