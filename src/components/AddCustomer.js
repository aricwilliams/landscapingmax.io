import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [nextServiceDate, setNextServiceDate] = useState("");
  const [service, setService] = useState("weekly"); // add state for service
  const navigate = useNavigate();

  const addCustomer = async () => {
    const newCustomer = {
      name: name,
      address: address,
      email: email,
      phone: phone,
      status: status,
      nextServiceDate: nextServiceDate,
      service: service, // add service to the newCustomer object
    };
    try {
      await axios.post(
        `https://localhost:7185/api/Customers/CustomerCreateAsync/${name}/${address}/${email}/${phone}/${status}/${nextServiceDate}/${service}`, // add service to the endpoint
        newCustomer
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link to="/">
        <button>View Customers</button>
      </Link>
      <h1>Add Customer</h1>
      <form onSubmit={addCustomer}>
        <div>
          <label>Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" onChange={(e) => setStatus(e.target.value)} />
        </div>
        <div>
          <label>Next Service Date:</label>
          <input
            type="date"
            onChange={(e) => setNextServiceDate(e.target.value)}
          />
        </div>
        <div>
          <label>Service:</label>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
