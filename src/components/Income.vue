<template>
  <div class="individualIncomeContainerSize">
    <div class="individualIncomeContainer">
      <div class="incomeTopBar">
        <Dropdown :options='freqOptions' :defaultText='income.freq ? income.freq : "Income Frequency"' @optionClicked='freqOptionClicked'/>
        <div @click.prevent="removeIncome" class="incomeDeleteIcon"><WindowClose :size='18'/></div>
      </div>
      <div class="incomeInputs">
        <div class="incomeInput">
          <input type='text' v-model='income.name' placeholder='Name' name="Name" id="incomeName" class="floatingInput" required />
          <label for="incomeName" data-content="Name" class="floatingLabel" />
        </div>
        <div class="incomeInput">
          <input type='number' step='0.01' v-model='income.amount' placeholder='Amount' @keydown="handleKeyDown" name="Amount" id="incomeAmount" class="floatingInput" required />
          <label for="incomeAmount" data-content="Amount" class="floatingLabel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import Dropdown from './Dropdown.vue';
import WindowClose from 'vue-material-design-icons/WindowClose.vue'

export default {
  props: ['id', 'freqOptions'],
  emits: ['removeIncome'],
  setup(props, { emit }) {
    const store = useStore();

    const income = ref(computed({
      get() { return store.state.data.incomes[props.id] },
      set(val) { store.commit('setData', val) }
    }));

    const freqOptionClicked = (option) => {
      income.value.freq = option;
    }

    const removeIncome = () => {
      emit('removeIncome', props.id);
    }

    const handleKeyDown = (event) => {
      // prevent arrow keys from changing number input
      if (event.which === 38 || event.which === 40) {
        event.preventDefault();
      }
    }


    return {
      freqOptionClicked,
      income,
      removeIncome,
      handleKeyDown
    }
  },
  components: {
    Dropdown, WindowClose
  }
}
</script>

<style scoped>
.individualIncomeContainerSize {
  width: 100%;
}

.individualIncomeContainer {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 4px rgb(38 96 136 / 20%);
  border-radius: 8px;
  padding: 20px;
  background-color: white;
}

.incomeTopBar {
  display: flex;
  justify-content: space-between;
}

.incomeDeleteIcon {
  cursor: pointer;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  margin: -8px -8px;
}
.incomeDeleteIcon:hover {
  background-color: #D0E2EE;
}

.incomeInputs {
  padding-top: 10px;
}

.incomeInput {
  padding: 10px;
}

.floatingInput {
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  transition: border-color 0.2s ease;
  caret-color: #6200ee;
  height: 30px;
  padding-top: 10px;
}

.floatingInput::placeholder {
  color: rgba(0, 0, 0, 0);
}

.floatingLabel {
  display: block;
  position: relative;
  max-height: 0;
  /*font-weight: 500;*/
  pointer-events: none;
}

.floatingLabel::before {
  color: #222;
  content: attr(data-content);
  display: inline-block;
  filter: blur(0);
  backface-visibility: hidden;
  transform-origin: left top;
  transition: transform 0.2s ease;
  left: 1rem;
  position: relative;
}

.floatingLabel::after {
  bottom: 1rem;
  content: "";
  height: 0.1rem;
  position: absolute;
  transition: transform 280ms cubic-bezier(0.4, 0, 0.2, 1),
  opacity 180ms cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
  opacity: 0;
  left: 0;
  top: 100%;
  margin-top: -0.1rem;
  transform: scale3d(0, 1, 1);
  width: 100%;
  background-color: #0369a1;
}

.floatingInput:focus + .floatingLabel::after {
  transform: scale3d(1, 1, 1);
  opacity: 1;
}

.floatingInput:placeholder-shown + .floatingLabel::before {
  transform: translate3d(-16px, -27px, 0) scale3d(1, 1, 1);
  color: red;
}

.floatingLabel::before,
.floatingInput:focus + .floatingLabel::before {
  transform: translate3d(-16px, -48px, 0) scale3d(0.82, 0.82, 1);
}

.floatingInput:focus + .floatingLabel::before {
  color: #0369a1;
}
</style>