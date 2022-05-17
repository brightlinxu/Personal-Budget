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
      <div class="bottomBudgetContainer">
        <div class="budgetOrderContainer">
          <div @click.prevent="changeOrderPositionLeft" class="budgetOrderLeft">
            <ChevronUp v-if="props.isPhoneWidth" :size="18"/>
            <ChevronLeft v-else :size="18"/>
          </div>
          <div class="budgetOrderNumber">{{ props.id + 1 }}</div>
          <div @click.prevent="changeOrderPositionRight" class="budgetOrderRight">
            <ChevronDown v-if="props.isPhoneWidth" :size="18"/>
            <ChevronRight v-else :size="18"/>
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
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { getPercentOfIncome, getBudgetAmountPerYear } from '../utilities/calculations.js';
import Dropdown from './Dropdown.vue';
import WindowClose from 'vue-material-design-icons/WindowClose.vue'
import ChevronLeft from "vue-material-design-icons/ChevronLeft";
import ChevronRight from "vue-material-design-icons/ChevronRight";
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'

export default {
  props: ['id', 'durOptions', 'isPhoneWidth'],
  emits: ['removeArea', 'changeOrderPositionLeft', 'changeOrderPositionRight'],
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

    const changeOrderPositionLeft = () => {
      emit('changeOrderPositionLeft', props.id);
    }

    const changeOrderPositionRight = () => {
      emit('changeOrderPositionRight', props.id);
    }


    return {
      area,
      removeArea,
      percent: computed(() => getPercentOfIncome(getBudgetAmountPerYear(area.value, props.durOptions), store.state.data.yearlyTaxedIncome)),
      durOptionClicked,
      handleKeyDown,
      props,
      changeOrderPositionLeft,
      changeOrderPositionRight,
      budgetOrderLeftColor: computed(() => props.id !== 0 ? 'black' : 'lightgrey'),
      budgetOrderRightColor: computed(() => props.id !== store.state?.data?.budgetAreas?.length - 1 ? 'black' : 'lightgrey'),
      budgetOrderLeftCursor: computed(() => props.id !== 0 ? 'pointer' : ''),
      budgetOrderRightCursor: computed(() => props.id !== store.state?.data?.budgetAreas?.length - 1 ? 'pointer' : ''),
    }
  },
  components: {
    Dropdown, WindowClose, ChevronLeft, ChevronRight, ChevronDown, ChevronUp
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
  background-color: #9abbed;
}

.budgetInputs {
  padding-top: 10px;
}

.budgetInput {
  padding: 10px;
}

.bottomBudgetContainer {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 10px;
}

.percentIncome {
  display: flex;
  justify-content: right;
  align-items: baseline;
  margin-right: -5px;
}

.justPercent {
  margin-right: 6px;
  font-weight: 500;
}

.justOfIncome {
  font-size: 14px;
  font-weight: 300;
}

.budgetOrderContainer {
  display: flex;
  justify-content: center;
  cursor: default;
  align-items: baseline;
}

.budgetOrderLeft {
  cursor: v-bind(budgetOrderLeftCursor);
  color: v-bind(budgetOrderLeftColor);
  margin-right: 4px;
  transform: translate(0, 4px);
}

.budgetOrderRight {
  cursor: v-bind(budgetOrderRightCursor);
  color: v-bind(budgetOrderRightColor);
  margin-left: 4px;
  transform: translate(0, 4px);
}

.budgetOrderNumber {
  font-size: 14px;
}
</style>