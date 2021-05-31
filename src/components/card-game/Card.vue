<template>
  <div>
    <button>{{ value }}</button>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  }
}
</script>

<style scoped>
div {
  padding: 30px
}
</style>