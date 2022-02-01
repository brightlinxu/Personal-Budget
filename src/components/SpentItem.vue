<template>
  <div @click='clicked = !clicked' @mouseenter='hover = true; clicked = false;' @mouseleave='hover = false; clicked = false;' class='itemContainer'>
    <div class='cutOverflow'>{{ item.label }}</div>
    <div :class='{ itemRightContainer: true, rightBefore: !hover || !clicked }'>
      <div class='leftSide'>${{ item.amount.toFixed(2) }}</div>
      <div @click='removeSpentItem' class='delete'>delete</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: ['id', 'item'],
  emits: ['removeSpentItem'],
  setup(props, { emit }) {
    const hover = ref(false);
    const clicked = ref(false);
    const showTransition = ref(false);

    const removeSpentItem = () => {
      emit('removeSpentItem', props.id);
    }

    return {
      hover,
      clicked,
      showTransition,
      removeSpentItem
    }
  }
}
</script>

<style scoped>
.itemContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  height: 20px;
  border-radius: 6px;
  padding: 5px 10px;
  border: 1px solid lightgrey;
  margin: 1px;
  cursor: pointer;
  /* overflow: hidden; */
}
.itemContainer:hover {
  background-color: rgb(241, 241, 241);
}

.itemRightContainer {
  display: flex;
  align-items: center;
  height: 30px;
  transition: 0.08s linear;
}
.rightBefore {
  margin-right: -60px;
}

.delete {
  padding: 5px 7px;
  margin: 0px -12px 0px 10px;
  border-radius: 0px 6px 6px 0px;
  position: relative;
  background-color: red;
  color: white;
  /* color: red; */
}
.delete:hover {
  background-color: rgb(231, 0, 0);
  /* background-color: rgb(255, 212, 212); */
}

.label {
  margin-right: 2px; 
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>