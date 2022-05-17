<template>
  <div class="modalOverlay">
    <div class="modal" v-click-away="onClickAway">
      hi
    </div>
  </div>
</template>

<script>
export default {
  emits: ['removeSpentItem'],
  setup() {
    const onClickAway = () => {

    }

    return {
      onClickAway
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
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.modal {
  text-align: center;
  background-color: white;
  padding: 200px;
  border-radius: 30px;
}
</style>