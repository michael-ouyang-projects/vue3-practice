<template>
  <!-- Paging -->
  <div>
    Rows:
    <select v-model="condition.rows" @change="changeShowingRows()">
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="50">50</option>
    </select>&nbsp;&nbsp;&nbsp;

    Pages:
    <select v-model="condition.currentPage" @change="changeShowingPage()">
      <option v-for="index in condition.totalPage" :key="index" :value="index">{{ index }}</option>
    </select>&nbsp;
    <button @click="previousPage()">Previous</button>&nbsp;
    <button @click="nextPage()">Next</button>
  </div><br/>

  <!-- Table -->
  <table>
    <!-- Title -->
    <tr>
      <th></th>
      <th v-for="column in columns" :key="column">
        {{ column.title }}&nbsp;
        <span v-if="column.sort !== undefined">
          <button @click="sort(column)">
            <span v-show="column.key !== condition.sortingColumn">△▽</span>
            <span v-show="column.key === condition.sortingColumn && condition.sortingOrder === 'asc'">▲</span>
            <span v-show="column.key === condition.sortingColumn && condition.sortingOrder === 'desc'">▼</span>
          </button>
        </span>
      </th>
    </tr>

    <!-- Data -->
    <template v-for="(element, index) in elements" :key="element">
      <tr v-show="index >= condition.startIndex && index < condition.endIndex">
        <td>{{ index + 1 }}</td>
        <td v-for="column in columns" :key="column" >
          {{ element.[column.key] }}
        </td>
      </tr>
    </template>
  </table><hr/><br/>
</template>

<script>
import { reactive, toRef, onMounted } from 'vue';

export default {
  props: {
    columns: {},
    data: {}
  },
  setup(props) {
    const elements = toRef(props, 'data');
    const condition = reactive({ rows: 5, currentPage: 1, totalPage: 1, startIndex: 0, endIndex: 5 });
    onMounted(async () => {
      while(elements.value === null) {
        await new Promise(sleep => setTimeout(sleep, 1));
      }
      condition.totalPage = Math.ceil(elements.value.length / condition.rows);
    });
    const changeShowingRows = () => {
      condition.currentPage = 1;
      condition.totalPage = Math.ceil(elements.value.length / condition.rows);
      condition.startIndex = 0;
      condition.endIndex = condition.rows;
    };
    const changeShowingPage = () => {
      condition.startIndex = (condition.currentPage - 1) * condition.rows;
      condition.endIndex = condition.currentPage * condition.rows;
    };
    const previousPage = () => {
      if(condition.currentPage > 1) {
        condition.currentPage--;
        changeShowingPage();
      }
    };
    const nextPage = () => {
      if(condition.currentPage < condition.totalPage) {
        condition.currentPage++;
        changeShowingPage();
      }
    };

    const sort = (column) => {
      condition.currentPage = 1;
      condition.startIndex = 0;
      condition.endIndex = condition.rows;
      if(condition.sortingColumn !== column.key) {
        condition.sortingColumn = column.key;
        condition.sortingOrder = 'asc';
        doSort('asc', column);
      } else {
        if(condition.sortingOrder === 'asc') {
          condition.sortingOrder = 'desc';
          doSort('desc', column);
        } else if(condition.sortingOrder === 'desc') {
          condition.sortingOrder = 'asc';
          doSort('asc', column);
        }
      }
    };
    const doSort = (option, column) => {
      if(column.sort === String) {
        sortByString(option, column.key);
      } else if(column.sort === Number) {
        sortByNumber(option, column.key);
      }
    };
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

    return {
      elements,
      condition,
      changeShowingRows,
      changeShowingPage,
      previousPage,
      nextPage,
      sort
    }
  }
}
</script>

<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
  border-spacing: 0px;
}

th, td {
  padding: 15px;
  border-top: 1px solid black;
}
</style>
