<template>
  <div class="dropdownContainer noHighlight">
    <div @click='toggleDropdown' v-click-away="onClickAway">{{ selectedOption }}</div>
    <transition name="dropdown">
      <div v-if='visible' class="dropdownItemsContainer">
        <DropdownItem v-for='option in options' :key='option'
                      :option='option' @optionClicked='optionClicked'
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import DropdownItem from './DropdownItem.vue';

export default {
  props: ['options', 'defaultText'],
  emits: ['optionClicked'],
  setup(props, { emit }) {
    const visible = ref(false);
    const selectedOption = ref(props.defaultText)

    const toggleDropdown = () => {
      visible.value = !visible.value
    }

    // dropdown item is clicked
    const optionClicked = (option) => {
      selectedOption.value = option;
      visible.value = false;
      emit('optionClicked', option);
    }

    // update selectedOption to defaultText when defaultText changes
    watch(() => props.defaultText, (cur) => {
      selectedOption.value = cur;
    });

    const onClickAway = () => {
      visible.value = false;
    }

    return {
      visible,
      selectedOption,
      toggleDropdown,
      optionClicked,
      onClickAway
    }
  },
  components: {
    DropdownItem
  }
}
</script>

<style scoped>
.dropdownContainer {
  cursor: pointer;
}

.dropdownItemsContainer {
  position: absolute;
  transform: translate(0, 5px);
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 10px;
  z-index: 99;
  width: 100px;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>