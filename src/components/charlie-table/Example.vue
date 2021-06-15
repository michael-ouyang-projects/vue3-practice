<template>
  <CharlieTable :columns='columns' :data="data" />
</template>

<script>
import { ref, onMounted } from 'vue'
import CharlieTable from './CharlieTable.vue'
import customerService from '@/api/customer/customer-service.js'

export default {
  components: {
    CharlieTable
  },
  setup () {
    const columns = [{ title: 'Customer ID', key: 'customerId', sort: String },
                     { title: 'Name', key: 'name' },
                     { title: 'Sex', key: 'sex' },
                     { title: 'Age', key: 'age', sort: Number },
                     { title: 'Balance', key: 'balance', sort: Number }];
    const data = ref(null);
    onMounted(async () => {
      data.value = await customerService.getAllCustomers();
    });
    return {
      columns,
      data
    }
  }
}
</script>
