<template>
  <div class="mostOuterContainer">
    <div class="firstAnimationSizeContainer">
      <div class="firstAnimationContainer">
        <div class="firstAnimationText">
          <div>Goodbye</div>
        </div>
        <div class="excelImg">
          <img src="/excel_logo.png" width="100"/>
        </div>
        <div class="googleImg">
          <img src="/google_sheets_logo.png" width="100"/>
        </div>
      </div>
    </div>
    second animation starts here
  </div>
<!--<div>-->
<!--  <div>Welcome to my budgeting app!</div>-->
<!--  <br />-->
<!--  <div>The development is still in progress. Although it's usable, I'm currently adding some more features, and the UI isn't finished.</div>-->
<!--  <br />-->
<!--  <div>Login or Signup to give it a try!</div>-->
<!--</div>-->
</template>

<script>
import { computed, onMounted, onUnmounted, watch, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    const scrollPosition = ref();
    const firstAnimationZoomScale = ref(1);
    const firstAnimationSpacingScale = ref('1px');

    watch(scrollPosition, (curVal) => {
      console.log(curVal);
      // firstAnimationZoomScale.value = 1 + (curVal * 0.1);
      // firstAnimationSpacingScale.value = `${1 + (curVal * 0.05)}px`;
    });

    onMounted(() => {
      document.title = 'Budget';
      window.addEventListener('scroll', updateScrollPosition);
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', updateScrollPosition);
    });

    const updateScrollPosition = () => {
      scrollPosition.value = window.scrollY;
    }

    return {
      store: computed(() => store.state),
      firstAnimationZoomScale,
      firstAnimationSpacingScale
    }
  }
}
</script>

<style scoped>
.mostOuterContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.firstAnimationSizeContainer {
  height: 300vh;
}

.firstAnimationContainer {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: 90vh;
}

.firstAnimationText {
  font-size: 60px;
  font-weight: 900;
  font-family: sans-serif;
  text-align: center;
  transform: matrix(v-bind(firstAnimationZoomScale), 0, 0, v-bind(firstAnimationZoomScale), 0, 0);
}

.excelImg {
  width: 100px;
  height: 100px;
}

.googleImg {
  width: 100px;
  height: 100px;
}
</style>