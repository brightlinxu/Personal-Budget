<template>
  <div class="modalOverlay">
    <div class="modal" v-click-away="clickAway">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['clickAway'],
  setup(props, { emit }) {
    const clickAway = () => {
      emit('clickAway');
    }

    return {
      clickAway
    }
  }
}
</script>

<style scoped>
.modalOverlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.modal {
  text-align: center;
  background-color: white;
  padding: 200px;
  border-radius: 30px;
}
</style>