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
}
.dropdownItemContainer:hover {
  background-color: #f3f4f6;
}
.dropdownItemContainer:active {
  background-color: #e5e7eb;
}
</style>