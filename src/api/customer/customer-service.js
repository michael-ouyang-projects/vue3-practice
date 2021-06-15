import axios from 'axios'
import customerDataUtil from '@/utils/customer/customer-data-util.js'

export default {
  getAllCustomers: async () => {
    let url = 'http://localhost:8000/customers/';
    let response = await axios.get(url);
    response.data.forEach(customer => {
      customerDataUtil.initializeCustomer(customer);
    });
    return response.data;
  },

  getCustomers: async condition => {
    let url = 'http://localhost:8000/customers/';
    let response = await axios.post(url, condition.value);
    response.data.forEach(customer => {
      customerDataUtil.initializeCustomer(customer);
    });
    return response.data;
  },

  addCustomer: async customer => {
    let url = 'http://localhost:8000/customer/';
    await axios.post(url, customer);
  },

  updateCustomer: async customer => {
    let url = 'http://localhost:8000/customer/';
    await axios.put(url, customer);
  },

  deleteCustomer: async id => {
    let url = 'http://localhost:8000/customer/' + id;
    await axios.delete(url);
  },

  getCustomerAccounts: async customerId => {
    let url = 'https://jsonplaceholder.typicode.com/todos?userId=' + customerId;
    let response = await axios.get(url);
    return response.data;
  }
}
