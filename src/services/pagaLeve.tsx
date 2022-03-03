import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export function getCustomers() {
  return axios.get(`${URL}/`);
}

export function upsertCustomer(customer) {
  return axios.put(`${URL}/upsert-customer`, customer);
}

export function deleteCustomer(id) {
  return axios.delete(`${URL}/delete-customer/${id}`);
}
