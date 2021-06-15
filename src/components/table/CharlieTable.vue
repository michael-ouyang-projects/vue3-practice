<template>
  <!-- Paging -->
  <div>
    Rows:
    <select>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>&nbsp;&nbsp;&nbsp;
  </div><br/>

  <table>
    <!-- SortingRow -->
    <tr>
      <th v-for="column in columns" :key="column">
        <button @click="sort('asc', column)">Asc</button>&nbsp;
        <button @click="sort('desc', column)">Desc</button>
      </th>
    </tr>

    <!-- Header -->
    <tr>
      <th v-for="column in columns" :key="column">
        {{ column.title }}
      </th>
    </tr>

    <!-- Data -->
    <tr v-for="element in elements" :key="element">
      <td v-for="column in columns" :key="column">
        {{ element.[column.key] }}
      </td>
    </tr>
  </table>
</template>

<script>
import { toRef } from 'vue';

export default {
  props: {
    columns: {},
    data: {}
  },
  setup(props) {
    const elements = toRef(props, 'data');

    const sortByString = (option, key) => {
      if(option === 'asc') {
        elements.value.sort((a, b) => {
          return a[key].localeCompare(b[key]);
        });
      } else if(option === 'desc') {
        elements.value.sort((a, b) => {
          return b[key].localeCompare(a[key]);
        });
      }
    };

    const sortByNumber = (option, key) => {
      if(option === 'asc') {
        elements.value.sort((a, b) => {
          return a[key] - b[key];
        });
      } else if(option === 'desc') {
        elements.value.sort((a, b) => {
          return b[key] - a[key];
        });
      }
    };

    const sort = (option, column) => {
      if(column.sort === 'string') {
        sortByString(option, column.key);
      } else if(column.sort === 'number') {
        sortByNumber(option, column.key);
      }
    };

    return {
      elements,
      sort
    }
  }
}
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
}

th, td {
  padding: 10px;
  border: 1px solid black;
}
</style>
