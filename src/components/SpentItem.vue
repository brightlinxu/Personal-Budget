<template>
  <div class='itemContainer'>
    <div class='cutOverflow'>{{ item.label }}</div>
    <div>${{ item.amount.toFixed(2) }}</div>
    <!-- <div @click='removeSpentItem' @mouseover='deleteHover = true' @mouseleave='deleteHover = false' class='icon noHighlight'>
      <TrashCanOutline v-if='!deleteHover' :size='20' />
      <TrashCan v-else :size='20' />
    </div> -->
  </div>
</template>

<script>
import { ref } from 'vue';
// import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline.vue';
// import TrashCan from 'vue-material-design-icons/TrashCan.vue';

export default {
  props: ['id', 'item'],
  emits: ['removeSpentItem'],
  setup(props, { emit }) {
    const deleteHover = ref(false);

    const removeSpentItem = () => {
      emit('removeSpentItem', props.id);
    }

    return {
      deleteHover,
      removeSpentItem
    }
  },
  components: {
    // TrashCanOutline, TrashCan
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
}
.itemContainer:hover {
  background-color: rgb(230, 230, 230);
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