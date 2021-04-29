<template>
  <div>
    <button @click="handleClicked">{{ value }}</button>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    changeCardShowingStatus: null
  }, 
  setup (props) {
    const handleClicked = () => {
      props.changeCardShowingStatus()
    }
    return {
      handleClicked
    }
  }
}
</script>

<style>
div {
  padding: 10px
}
</style>