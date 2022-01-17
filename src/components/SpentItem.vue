<template>
  <div class='item-container'>
    {{ item.label }} - ${{ item.amount.toFixed(2) }}
    <div @click='removeSpentItem' @mouseover='deleteHover = true' @mouseleave='deleteHover = false' class='icon noHighlight'>
      <TrashCanOutline v-if='!deleteHover' :size='20' />
      <TrashCan v-else :size='20' />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline.vue';
import TrashCan from 'vue-material-design-icons/TrashCan.vue';

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
    TrashCanOutline, TrashCan
  }
}
</script>

<style scoped>
.item-container {
  display: flex;
  justify-content: space-between;
  width: 160px;
  height: 20px;
  border-radius: 10px;
  padding: 5px 10px;
  border: 1px solid lightgrey;
}

.icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>