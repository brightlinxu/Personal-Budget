<template>
  <div @click='handleClick' class="dropdownItemContainer">
    {{ option }}
  </div>
</template>

<script>
export default {
  props: ['option'],
  emits: ['optionClicked'],
  setup(props, { emit }) {
    const handleClick = () => {
      emit('optionClicked', props.option)
    }

    return {
      handleClick
    }
  }
}
</script>

<style scoped>
.dropdownItemContainer {
  padding: 8px;
  border-radius: 10px;
}
.dropdownItemContainer:hover {
  background-color: lightgrey;
}
.dropdownItemContainer:active {
  background-color: grey;
}
</style>