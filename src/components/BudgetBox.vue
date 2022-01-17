<template>
  <div class='container'>
    <div class='topBar'>
      <div class='title' >{{ area.name }}</div>
      <div class='statsContainer'>
        <div>${{ (budgetTotal - budgetUsed).toFixed(2) }}</div>
        <div>Used {{ Math.ceil(budgetUsed / budgetTotal * 100) }}%</div>
      </div>
      <!-- <div @click.prevent='handleUndo' class='undoButton noHighlight'><ArrowULeftTop :size='20'/></div> -->
    </div>
    <form @submit.prevent='handleNewSpentItem'>
      <input :class='{ inputs: true, inputFocused: inputFocused, inputUnfocused: !inputFocused }' 
        @focus='inputFocused = true' @blur='inputFocused = false' type='text' v-model='spent' 
        :placeholder='inputFocused ? "ex: no thai $9" : "+ New"' required
      >
      <button class='addItemButton' v-if='inputFocused'>add</button>
    </form>
    <div class='overflow-container'>
      <SpentItem v-for='(elt, i) in area.spent' :key='i' @removeSpentItem='handleRemoveSpentItem'
        :id='i' :item='elt'
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { updateData } from '../firebase/functions.js';
import SpentItem from './SpentItem.vue';
import { getBudgetAreaTotalUsed, getBudgetAreaTotalPerPeriod } from '../utilities/calculations.js';
// import ArrowULeftTop from 'vue-material-design-icons/ArrowULeftTop.vue'

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

      let label = spent.value.substring(0, separateIndex);
      let amount = parseFloat(spent.value.substring(separateIndex + 1));

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
        amount: parseFloat(area.value.spent[id].amount).toFixed(2),
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
      console.log('undo');
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
    SpentItem, /*ArrowULeftTop*/
  }
}
</script>

<style scoped>
.container {
  display: flex;
  width: 200px;
  height: 200px;
  border: 1px solid lightgrey;
  border-radius: 15px;
  padding: 20px;
  margin: 1px;
}

.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 40px;
  margin-top: -15px;
}

.title {
  margin: 0px 0px 0px -8px;
  font-size: 25px;
}

.statsContainer {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.undoButton {
  position: absolute;
  transform: translate(190px, -20px);
  height: 20px;
  width: 20px;
  cursor: pointer;
  border-radius: 3px;
}
.undoButton:hover {
  background-color: #BED8EA;
}

.overflow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px;
  width: 200px;
  overflow: scroll;
}
.overflow-container::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}


.inputUnfocused {
  width: 170px;
}
.inputFocused {
  width: 130px;
}
.addItemButton {
  width: 40px;
  height: 22px;
}

.inputs {
  border: none;
  outline: none;
  background-color: transparent !important;
  height: 25px;
  cursor: pointer;
}
</style>