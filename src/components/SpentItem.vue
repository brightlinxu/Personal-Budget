<template>
  <div @click='clicked = !clicked' @mouseenter='hover = true; clicked = false;' @mouseleave='hover = false; clicked = false;' class='itemContainer'>
    <div class='cutOverflow'>{{ item.label }}</div>
    <div :class='{ itemRightContainer: true, rightBefore: !hover || !clicked }'>
      <div class='leftSide'>${{ item.amount.toFixed(2) }}</div>
      <div @click='editClicked' class='options'>Edit</div>
      <div @click='removeSpentItem' class='delete'>Delete</div>
    </div>
  </div>
  <Transition name="spentItemModalContainer">
    <Modal v-if="modalOpen" @closeModal="handleCloseModal" @saveModal="handleSaveModal" :isPhoneWidth="isPhoneWidth" title="Edit">
      <div class="individualItemModalContainer">
        <form @submit.prevent="handleSaveModal" class="spentItemModalForm">
          <div class="spentItemModalInputWithTextContainer">
            Item:
            <div :class="{ spentItemModalInputContainer: true, spentItemModalInputContainerColor: inputLabelFocus }" @focusin="handleFocusChange('label')" @focusout="handleFocusChange('label')"><input type='text' v-model='spentItemCopy.label' class="spentItemModalInput"></div>
          </div>
          <div class="spentItemModalInputWithTextContainer">
            Amount:
            <div :class="{ spentItemModalInputContainer: true, spentItemModalInputContainerColor: inputAmountFocus }" @focusin="handleFocusChange('amount')" @focusout="handleFocusChange('amount')"><input type='text' v-model='spentItemCopy.amount' class="spentItemModalInput"></div>
          </div>
<!--          <button class="hiddenButton"/>-->
        </form>
      </div>
    </Modal>
  </Transition>
</template>

<script>
import { ref } from 'vue';
import { useStore } from "vuex";
import Modal from "@/components/Modal";
import {updateData} from "@/firebase/functions";

export default {
  props: ['budgetBoxId', 'id', 'item', 'isPhoneWidth'],
  setup(props, { emit }) {
    const store = useStore();

    const spentItemCopy = ref({ ...store.state.data.budgetAreas[props.budgetBoxId].spent[props.id] });

    const hover = ref(false);
    const clicked = ref(false);
    const showTransition = ref(false);
    const modalOpen = ref(false);

    const inputLabelFocus = ref(false);
    const inputAmountFocus = ref(false);

    const removeSpentItem = () => {
      emit('removeSpentItem', props.id);
    }

    const editClicked = () => {
      modalOpen.value = true;
    }

    const handleCloseModal = () => {
      modalOpen.value = false;

      // reset copy back to what's in the store
      spentItemCopy.value = { ...store.state.data.budgetAreas[props.budgetBoxId].spent[props.id] };
    }

    const handleSaveModal = () => {
      console.log('handle save modal');
      const storeData = { ...store.state.data };

      // check that amount is inputted in correct format and convert to number
      let amount = parseFloat(spentItemCopy.value.amount);
      if (amount.toFixed(2) - amount !== 0) {
        console.log('Money amount has to be 2 decimals or less')
        return;
      }
      spentItemCopy.value.amount = amount;

      // update store with data
      storeData.budgetAreas[props.budgetBoxId].spent[props.id] = { ...spentItemCopy.value };
      store.commit('setData', storeData);

      // update database with data
      updateData(store, store.state.data)

      // close modal
      modalOpen.value = false;
    }

    const handleFocusChange = (type) => {
      if (type === 'label') {
        inputLabelFocus.value = !inputLabelFocus.value;
      }
      else if (type === 'amount') {
        inputAmountFocus.value = !inputAmountFocus.value;
      }
    }


    return {
      hover,
      clicked,
      showTransition,
      removeSpentItem,
      editClicked,
      handleCloseModal,
      modalOpen,
      props,
      spentItemCopy,
      inputLabelFocus,
      inputAmountFocus,
      handleFocusChange,
      handleSaveModal
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
  margin-right: -113px;
}

.options {
  padding: 0 10px;
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
  margin: 0px -10px 0px 10px;
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

.individualItemModalContainer {
  margin: 10px 20px;
}

.spentItemModalInputWithTextContainer {
  text-align: left;
  margin: 6px 0;
  font-size: 14px;
}

.spentItemModalInputContainer {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  width: 100%;
  margin-top: 2px;
  transition: 0.2s ease;
}

.spentItemModalInputContainerColor {
  border: 1px solid #666 !important;
}

.spentItemModalForm {
  display: flex;
  flex-direction: column;
}

.spentItemModalInput {
  padding: 6px 10px;
  font-size: 16px;
}
</style>