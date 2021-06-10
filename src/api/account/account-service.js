import axios from 'axios'

export default {
  getAccountsByCustomerId: async customerId => {
    let url = 'http://localhost:8000/account/' + customerId;
    let response = await axios.get(url);
    return response.data;
  }
}
