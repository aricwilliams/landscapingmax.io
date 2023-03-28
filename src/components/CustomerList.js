import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { parseISO, format } from "date-fns";
import { CSVLink } from "react-csv";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [filter, setFilter] = useState(""); // new state variable for the selected filter value
  const [searchTerm, setSearchTerm] = useState(""); // new state variable for the search term

  useEffect(() => {
    axios
      .get("https://localhost:7185/api/Customers/GetAllCustomersController")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        setErrorMessage(`Error fetching customers: ${error.message}`);
      });
  }, []);

  const sendEmail = async () => {
    try {
      await axios.post("https://localhost:1234/api/send-email", {
        to: "aricwilliamst@gmail.com",
        subject: "Test Email",
        body: "This is a test email",
      });
      setEmailSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://localhost:7185/api/Customers/CustomerDeleteController/${id}`
      )
      .then(() => {
        setCustomers(customers.filter((customer) => customer.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting customer: ", error);
      });
  };
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    setSearchTerm(""); // clear the search term when a filter option is selected
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilter(""); // clear the filter when a search term is entered
  };

  const filteredCustomers = filter
    ? customers.filter((customer) => customer.service === filter)
    : customers.filter((customer) => {
        // filter the customers based on the selected filter value or search term
        const fields = [
          "name",
          "address",
          "email",
          "phone",
          "service",
          "status",
          "nextServiceDate",
        ];
        return fields.some((field) => {
          const fieldValue = customer[field];
          if (fieldValue) {
            const normalizedValue = fieldValue.toLowerCase();
            const normalizedTerm = searchTerm.toLowerCase();
            return normalizedValue.includes(normalizedTerm);
          }
          return false;
        });
      });

  const headers = [
    { label: "Name", key: "name" },
    { label: "Address", key: "address" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Service", key: "service" },
    { label: "Status", key: "status" },
    { label: "Next Service Date", key: "nextServiceDate" },
  ];

  const data = filteredCustomers.map((customer) => ({
    name: customer.name,
    address: customer.address,
    email: customer.email,
    phone: customer.phone,
    service: customer.service,
    status: customer.status,
    nextServiceDate: format(parseISO(customer.nextServiceDate), "dd/MM/yyyy"),
  }));

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div>
      <Link to="/add-customer">
        <button>Add Customer</button>
      </Link>
      <select value={filter} onChange={handleFilterChange}>
        <option value="">Filter by Service</option>
        <option value="weekly">Weekly</option>
        <option value="biweekly">Bi-weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <input
        type="text"
        placeholder="Search customers"
        value={searchTerm}
        onChange={handleSearch}
      />
      <CSVLink data={data} headers={headers} filename="customers.csv">
        <button>Download CSV</button>
      </CSVLink>

      <h2>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Status</th>
            <th>Next Service Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.address}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.service}</td>
              <td>{customer.status}</td>
              <td>
                {format(parseISO(customer.nextServiceDate), "dd/MM/yyyy")}
              </td>
              <td>
                <Link to={`/edit-customer/${customer.id}`}>Edit</Link>
              </td>
              <td>
                <button onClick={() => handleDelete(customer.id)}>
                  Delete
                </button>
                <button onClick={() => sendEmail()}>Send Email</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
