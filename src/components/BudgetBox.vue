<template>
  <div class='container'>
    <div class='topBar'>
      <div class='title cutOverflow' >{{ area.name }}</div>
      <div class='statsContainer'>
        <div class='individualStat'>
          <div class='statLeft'>Left</div>
          <div class='statRight' style='color: green;'>${{ (budgetTotal - budgetUsed).toFixed(2) }}</div>
        </div>
        <div class='individualStat'>
          <div class='statLeft'>Spent</div>
          <div class='statRight'>{{ Math.ceil(budgetUsed / budgetTotal * 100) }}%</div>
        </div>
      </div>
    </div>
    <div :class='{ inputContainer: true, inputContainerColor: spent || inputFocused }' >
      <form @submit.prevent='handleNewSpentItem'>
        <input :class='{ inputs: true, inputFocused: spent, inputUnfocused: !spent }' 
          @focus='inputFocused = true' @blur='inputFocused = false' @mouseover='inputHover = true' @mouseleave='inputHover = false'
          type='text' v-model='spent' 
          :placeholder='inputFocused ? "ex: no thai $9" : "+ New"' required
        >
        <button class='addItemButton' v-if='spent'>add</button>
      </form>
    </div>
    <div class='overflow-container'>
      <SpentItem v-for='(elt, i) in area.spent' :key='i' @removeSpentItem='handleRemoveSpentItem'
        :id='i' :item='elt'
      />
    </div>
    <div @click.prevent='handleUndo' class='undoButton noHighlight'><ArrowULeftTop :size='20'/></div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { updateData } from '../firebase/functions.js';
import SpentItem from './SpentItem.vue';
import { getBudgetAreaTotalUsed, getBudgetAreaTotalPerPeriod } from '../utilities/calculations.js';
import ArrowULeftTop from 'vue-material-design-icons/ArrowULeftTop.vue'

export default {
  props: ['id'],
  setup(props) {
    const store = useStore();

    const area = ref(computed({
      get() { return store.state.data.budgetAreas[props.id] },
      set(val) { store.commit('setData', val) }
    }));
    const spent = ref(null);
    const inputFocused = ref(false);
    const maxUndoStackSize = 8; 


    const handleNewSpentItem = () => {
      // separate label and amount from user input
      let separateIndex = spent.value.indexOf('$');

      if (separateIndex === -1) {
        console.log('USE $');
        return;
      }

      let label = spent.value.substring(0, separateIndex).trim();
      let amount = parseFloat(spent.value.substring(separateIndex + 1).trim());

      if (amount.toFixed(2) - amount !== 0 || label === '') {
        console.log('over 2 decimals OR label is empty');
        return;
      }

      // add label and amount into store
      area.value.spent.unshift({ label: label, amount: parseFloat(amount.toFixed(2))});
      // add action into undo array
      addToUndoStack({
        index: 0,
        action: 'a'
      });

      // reset spent ref back to null
      spent.value = null;

      // update database with info
      updateData(store, store.state.data)
    }

    const handleRemoveSpentItem = (id) => {
      // add action into undo array
      addToUndoStack({
        label: area.value.spent[id].label, 
        amount: area.value.spent[id].amount,
        index: id,
        action: 'r'
      });

      // remove label and amount from store
      area.value.spent.splice(id, 1);

      // update database with info
      updateData(store, store.state.data);
    }

    // UNDO stuff
    const handleUndo = () => {
      const undoObj = area.value.undoStack.shift();
      if (undoObj) {
        // there's something to undo
        if (undoObj.action === 'a') { // action WAS add
          // remove item at undoObj's index
          area.value.spent.splice(undoObj.index, 1);
        }
        else { // action WAS remove
          // add item at undoObj's index
          area.value.spent.splice(undoObj.index, 0, { 
            label: undoObj.label, 
            amount: undoObj.amount 
          });
        }

        // update info in database
        updateData(store, store.state.data);
      }
    }

    const addToUndoStack = (obj) => {
      // maintain undoStack size at maxUndoStackSize
      while (area.value.undoStack.length >= maxUndoStackSize) {
        area.value.undoStack.pop();
      }

      // add action into undo array
      area.value.undoStack.unshift(obj);
    }


    return {
      area,
      spent,
      inputFocused,
      handleNewSpentItem,
      handleRemoveSpentItem,
      handleUndo,
      budgetUsed: computed(() => getBudgetAreaTotalUsed(area.value.spent)),
      budgetTotal: computed(() => getBudgetAreaTotalPerPeriod(area.value, store.state.data.budgetPeriod, store))
    }
  },
  components: {
    SpentItem, ArrowULeftTop
  }
}
</script>

<style scoped>
.container {
  display: flex;
  min-width: 280px;
  width: 280px;
  height: 280px;
  /* border: 1px solid lightgrey; */
  /* box-shadow: 0 15px 10px -15px rgb(0 0 0 / 30%); */ /* shadow is only underneath box */
  box-shadow: 0px 1px 12px rgb(38 96 136 / 20%);
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
}

.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  height: 60px;
  margin-top: -10px;
}

.title {
  margin: -20px 0px 0px -8px;
  font-size: 28px;
  font-weight: 600;
}

.statsContainer {
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-right: -8px;
}

.individualStat {
  display: flex;
  align-items: center;
}
.statLeft {
  font-size: 12px;
  margin-right: 5px;
  white-space: nowrap;
  color: grey;
}
.statRight {
  font-size: 18px;
  font-weight: 450;
}

.overflow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 182px;
  width: 280px;
  margin-bottom: 10px;
  overflow: scroll;
  transition: 0.2s linear;
}
.overflow-container::-webkit-scrollbar {
  display: none; /* hide scroll bar for Chrome, Safari, and Opera */
}


.inputUnfocused {
  width: 230px;
  height: 20px;
  padding: 5px 10px;
  cursor: pointer;
}
.inputFocused {
  width: 190px;
  height: 20px;
  padding: 5px 10px;
}
.addItemButton {
  width: 40px;
  height: 22px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: #002946;
  font-weight: 550;
}
.addItemButton:hover {
  color: #005FA0;
}

.inputs {
  border: none;
  outline: none;
  background-color: transparent !important;
  height: 25px;
  border-radius: 5px;
}
.inputContainer {
  border-radius: 5px;
  height: 35px;
}
.inputContainer:hover {
  /* background-color: #BED8EA; */
  background-color: #D0E2EE;
}
.inputContainerColor {
  background-color: #D0E2EE;
}


.undoButton {
  position: absolute;
  transform: translate(-145px, 275px);
  height: 20px;
  width: 20px;
  cursor: pointer;
  border-radius: 3px;
}
.undoButton:hover {
  /* background-color: #BED8EA; */
  background-color: #D0E2EE;
}
</style>