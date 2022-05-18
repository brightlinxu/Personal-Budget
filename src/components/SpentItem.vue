<template>
  <div @click='clicked = !clicked' @mouseenter='hover = true; clicked = false;' @mouseleave='hover = false; clicked = false;' class='itemContainer'>
    <div class='cutOverflow'>{{ item.label }}</div>
    <div :class='{ itemRightContainer: true, rightBefore: !hover || !clicked }'>
      <div class='leftSide'>${{ item.amount.toFixed(2) }}</div>
      <div @click='optionsClicked' class='options'>Options</div>
      <div @click='removeSpentItem' class='delete'>Delete</div>
    </div>
  </div>
  <Transition name="spentItemModalContainer">
    <Modal v-if="modalOpen" @clickAway="handleClickAway">
      hi
    </Modal>
  </Transition>
</template>

<script>
import { ref, watch } from 'vue';
import Modal from "@/components/Modal";

export default {
  props: ['id', 'item'],
  setup(props, { emit }) {
    const hover = ref(false);
    const clicked = ref(false);
    const showTransition = ref(false);
    const modalOpen = ref(false);

    const removeSpentItem = () => {
      emit('removeSpentItem', props.id);
    }

    const optionsClicked = () => {
      modalOpen.value = true;
    }

    const handleClickAway = () => {
      modalOpen.value = false;
    }

    watch(modalOpen, (curVal) => {
      if (curVal) { // modal open
        document.body.style.overflow = 'hidden'
      }
      else {
        document.body.style.overflow = 'visible'
      }
    });

    return {
      hover,
      clicked,
      showTransition,
      removeSpentItem,
      optionsClicked,
      handleClickAway,
      modalOpen,
      props
    }
  },
  emits: ['removeSpentItem'],
  components: {
    Modal
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
  background-color: white;
  /*overflow: hidden;*/
}
.itemContainer:hover {
  background-color: rgb(245, 245, 245);
}

.itemRightContainer {
  display: flex;
  align-items: center;
  height: 30px;
  transition: 0.08s linear;
  /*overflow: hidden;*/
}
.rightBefore {
  margin-right: -134px;
}

.options {
  padding: 0 7px;
  margin: 0px -10px 0px 10px;
  position: relative;
  color: #0369a1;
  border-left: solid 1px lightgrey;
}
.options:hover {
  color: #0c4a6e;
}

.delete {
  padding: 0 7px;
  margin: 0px -11px 0px 10px;
  border-radius: 0px 6px 6px 0px;
  position: relative;
  color: red;
  border-left: solid 1px lightgrey;
}
.delete:hover {
  color: rgb(200, 0, 0);
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

.spentItemModalContainer-enter-active,
.spentItemModalContainer-leave-active {
  transition: 0.3s ease;
}
.spentItemModalContainer-enter-from,
.spentItemModalContainer-leave-to {
  opacity: 0;
}
</style>