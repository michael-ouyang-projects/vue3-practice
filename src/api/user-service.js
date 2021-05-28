import axios from 'axios'

export default {
  getUsers: async () => {
    let url = 'https://jsonplaceholder.typicode.com/users/';
    let response = await axios.get(url);
    return response.data;
  },

  getUserTodoList: async userId => {
    let url = 'https://jsonplaceholder.typicode.com/todos?userId=' + userId;
    let response = await axios.get(url);
    return response.data;
  }
}