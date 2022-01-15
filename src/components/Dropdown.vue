<template>
  <div @click='toggleDropdown'>{{ selectedOption }}</div>
  <div v-if='visible'>
    <DropdownItem v-for='option in options' :key='option'
      :option='option' @optionClicked='optionClicked'
    />
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

    return {
      visible,
      selectedOption,
      toggleDropdown,
      optionClicked
    }
  },
  components: {
    DropdownItem
  }
}
</script>

<style>

</style>