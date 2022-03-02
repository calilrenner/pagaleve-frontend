import axios from 'axios';

const URL = process.env.REACT_APP_API_URL;

export function getCustomers() {
  return axios.get(`${URL}/`);
}

export function editCustomer(text: string) {
  const body = { text };
  return axios.put(`${URL}/edit-customer`, body);
}

export function postCustomer(customer) {
  return axios.post(`${URL}/new-customer`, customer);
}

export function deleteCustomer(id) {
  return axios.delete(`${URL}/delete-customer/${id}`);
}
