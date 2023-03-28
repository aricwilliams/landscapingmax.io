import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    status: "",
    nextServiceDate: "",
  });

  useEffect(() => {
    axios
      .get(`https://localhost:7185/api/Customers/CustomerController/${id}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving customer: ", error);
      });
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `https://localhost:7185/api/Customers/updateCustomer/${id}/${customer.name}/${customer.address}/${customer.email}/${customer.phone}/${customer.status}/${customer.nextServiceDate}`
      )
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating customer: ", error);
      });
  };

  return (
    <div>
      <h2>Edit Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            name="id"
            value={customer.id}
            onChange={handleChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={customer.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={customer.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={customer.status}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Next Service Date:
          <input
            type="text"
            name="nextServiceDate"
            value={customer.nextServiceDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditCustomer;
