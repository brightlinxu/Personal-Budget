<template>
  <div class="individualBudgetContainerSize">
    <div class="individualBudgetContainer">
      <div class="budgetTopBar">
        <Dropdown :options='durOptions' :defaultText='area.dur ? area.dur : "Duration of Budget"' @optionClicked='durOptionClicked'/>
        <div @click.prevent="removeArea" class="budgetDeleteIcon"><WindowClose :size='18'/></div>
      </div>
      <div class="budgetInputs">
        <div class="budgetInput">
          <input type='text' v-model='area.name' placeholder='Name' name="Name" id="budgetName" class="floatingInput" />
          <label for="budgetName" data-content="Name" class="floatingLabel" />
        </div>
        <div class="budgetInput">
          <input type='number' step='0.01' v-model='area.amount' placeholder='Amount' @keydown="handleKeyDown" name="Amount" id="budgetAmount" class="floatingInput" />
          <label for="budgetAmount" data-content="Amount" class="floatingLabel" />
        </div>
      </div>
      <div class="percentIncome">
        <div class="justPercent">
          {{ percent }}%
        </div>
        <div class="justOfIncome">
          of income
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { getPercentOfIncome, getBudgetAmountPerYear } from '../utilities/calculations.js';
import Dropdown from './Dropdown.vue';
import WindowClose from 'vue-material-design-icons/WindowClose.vue'

export default {
  props: ['id', 'durOptions'],
  emits: ['removeArea'],
  setup(props, { emit }) {
    const store = useStore();

    const area = ref(computed({
      get() { return store.state.data.budgetAreas[props.id] },
      set(val) { store.commit('setData', val) }
    }));

    const durOptionClicked = (option) => {
      area.value.dur = option;
    }

    const removeArea = () => {
      emit('removeArea', props.id);
    }

    const handleKeyDown = (event) => {
      // prevent arrow keys from changing number input
      if (event.which === 38 || event.which === 40) {
        event.preventDefault();
      }
    }


    return {
      area,
      removeArea,
      percent: computed(() => getPercentOfIncome(getBudgetAmountPerYear(area.value, props.durOptions), store.state.data.yearlyTaxedIncome)),
      durOptionClicked,
      handleKeyDown
    }
  },
  components: {
    Dropdown, WindowClose
  }
}
</script>

<style scoped>
.individualBudgetContainerSize {
  width: 100%;
}

.individualBudgetContainer {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 4px rgb(38 96 136 / 20%);
  border-radius: 8px;
  padding: 20px;
  background-color: white;
  height: 180px;
}

.budgetTopBar {
  display: flex;
  justify-content: space-between;
}

.budgetDeleteIcon {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  margin: -8px -8px;
}
.budgetDeleteIcon:hover {
  background-color: #D0E2EE;
}

.budgetInputs {
  padding-top: 10px;
}

.budgetInput {
  padding: 10px;
}

.percentIncome {
  display: flex;
  justify-content: right;
  align-items: baseline;
  margin: 10px -5px 0 0;
}

.justPercent {
  margin-right: 6px;
  font-weight: 500;
}

.justOfIncome {
  font-size: 14px;
  font-weight: 300;
}
</style>