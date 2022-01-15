<template>
  <div @click='handleClick'>{{ option }}</div>
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

<style>

</style>