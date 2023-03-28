import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import DeleteCustomerDialog from "./components/DeleteCustomerDialog";
import EditCustomer from "./components/EditCustomer";
import CustomerIntake from "./components/CustomerIntake";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/customerIntake" element={<CustomerIntake />}></Route>
        <Route exact path="/" element={<CustomerList />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/delete-customer" element={<DeleteCustomerDialog />} />
        <Route path="/edit-customer/:id" element={<EditCustomer />} />
      </Routes>
    </Router>
  );
}

export default App;
