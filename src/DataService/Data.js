import axios from "axios";

// Get all customers
export const getAllCustomers = async () => {
  const response = await axios.get("/api/customers");
  return response.data;
};

// Create a new customer
export const createCustomer = async (customer) => {
  const response = await axios.post("/api/customers", customer);
  return response.data;
};

// Update a customer
export const updateCustomer = async (id, customer) => {
  const response = await axios.put(`/api/customers/${id}`, customer);
  return response.data;
};

// Delete a customer
export const deleteCustomer = async (id) => {
  const response = await axios.delete(`/api/customers/${id}`);
  return response.data;
};
