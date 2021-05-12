<template>
  == Menu ==
  <div v-for="type in types" :key="type">
    <button @click="handleChangeType(type.text)">{{ type.text }}</button>&nbsp;
  </div>
  <hr/>
</template>

<script>
export default {
  props: {
    changeShowingType: null,
  },
  setup(props) {
    const handleChangeType = type => {
      props.changeShowingType(type)
    }

    return {
      handleChangeType,
      types: [
        { text: 'Product' },
        { text: 'Practice' }
      ]
    }
  }
};
</script>

<style scoped>
div {
  padding: 10px
}
</style>