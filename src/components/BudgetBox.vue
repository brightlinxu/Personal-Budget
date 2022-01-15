<template>
  <div class='container'>budget box {{ id }}</div>
</template>

<script>
export default {
  props: ['id'],
  setup() {


    return {

    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 1px solid lightgrey;
  border-radius: 15px;
  padding: 20px;
  margin: 1px;
}
</style>