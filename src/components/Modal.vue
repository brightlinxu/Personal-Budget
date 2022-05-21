<template>
  <div class="modalOverlay">
    <div class="modal" v-click-away="closeModal">
      <div class="modalTitle">{{ title }}</div>
      <slot></slot>
      <div v-if="isPhoneWidth">
        <div class="modalButtonsPhone modalSavePhone" @click="saveModal">
          Save
        </div>
        <div class="modalButtonsPhone modalCancelPhone" @click="closeModal">
          Cancel
        </div>
      </div>
      <div v-else class="modalBottomContainer">
        <div class="modalButtons modalCancel" @click="closeModal">
          Cancel
        </div>
        <div class="modalButtons modalSave" @click="saveModal">
          Save
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isPhoneWidth', 'title'],
  emits: ['closeModal', 'saveModal'],
  setup(props, { emit }) {
    const closeModal = () => {
      emit('closeModal');
    }

    const saveModal = () => {
      emit('saveModal');
    }

    return {
      closeModal,
      saveModal
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
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: white;
  padding: 15px;
  border-radius: 15px;
}

.modalTitle {
  display: flex;
  font-size: 25px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.modalBottomContainer {
  display: flex;
}

.modalButtons {
  width: 100%;
  padding: 10px 70px;
  border-radius: 5px;
  cursor: pointer;
}

.modalCancel {
  background-color: #e5e7eb;
  margin-right: 8px;
}

.modalSave {
  background-color: #0284c7;
  color: white;
  margin-left: 8px;
}

.modalButtonsPhone {
  width: 100%;
  padding: 8px 0;
  border-radius: 5px;
  cursor: pointer;
}

.modalSavePhone {
  background-color: #0284c7;
  color: white;
  margin-bottom: 8px;
}

.modalCancelPhone {
  background-color: #e5e7eb;
  margin-top: 8px;
}
</style>