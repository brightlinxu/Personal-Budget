<template>
  <div class="mostOuterContainer">
    <div class="firstAnimationSizeContainer">
      <div class="firstAnimationContainer">
        <div class="goodbyeText">Goodbye</div>
        <div class="laptopImg"><img src="/laptop3D2.png" alt="Laptop Render" width="450"/></div>
        <div class="phoneImg"><img src="/phone3D2.png" alt="Phone Render" width="180"/></div>
      </div>
      <div class="firstAnimationPlaceholder" id="temp" />
    </div>
<!--    second animation starts here-->
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
    const windowWidth = ref();

    const firstAnimationContainerSize = ref('250vh');
    const firstAnimationTextSize = ref(1);
    const firstAnimationLaptopSize = ref(1);
    const firstAnimationPhoneSize = ref(1);
    const firstAnimationLaptopShiftX = ref(0);
    const firstAnimationLaptopShiftY = ref(0);
    const firstAnimationPhoneShiftX = ref(0);
    const firstAnimationPhoneShiftY = ref(0);
    const firstAnimationTextOpacity = ref(1);

    watch(scrollPosition, (curScrollVal) => {
      firstAnimationContainerSize.value = `${(windowWidth.value * 0.16) + 30}vh`; // y = 0.16x + 30 is best line of fit where x = windowWidth and y = vh
      firstAnimationTextSize.value = 1 + (curScrollVal * 0.0005);
      firstAnimationLaptopSize.value = 1 + (curScrollVal * 0.002);
      firstAnimationPhoneSize.value = 1 + (curScrollVal * 0.002);
      firstAnimationLaptopShiftX.value = curScrollVal * -0.9;
      firstAnimationLaptopShiftY.value = curScrollVal * 0.24;
      firstAnimationPhoneShiftX.value = curScrollVal * 0.6;
      firstAnimationPhoneShiftY.value = curScrollVal * -0.22;

      // if (curScrollVal / windowWidth.value > 0.5) { // when scroll value is half of window width
      //   firstAnimationTextOpacity.value = 1 - (curScrollVal * 0.001);
      // }

      const opacityIndicator = document.getElementById('temp').getBoundingClientRect();
      if (opacityIndicator.bottom <= window.innerHeight) {
        // opacity is ready to change
        firstAnimationTextOpacity.value = 1 - (curScrollVal * 0.001);
      }
    });

    onMounted(() => {
      document.title = 'Budget';
      window.addEventListener('scroll', updateScrollPosition);
      window.addEventListener('resize', handleWindowResize);
      handleWindowResize();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', handleWindowResize);
    });

    const updateScrollPosition = () => {
      scrollPosition.value = window.scrollY;
      // console.log(scrollPosition.value)
    }

    const handleWindowResize = () => {
      windowWidth.value = window.innerWidth;
    }

    return {
      store: computed(() => store.state),
      firstAnimationTextSize,
      firstAnimationLaptopSize,
      firstAnimationPhoneSize,
      firstAnimationLaptopShiftX,
      firstAnimationLaptopShiftY,
      firstAnimationPhoneShiftX,
      firstAnimationPhoneShiftY,
      firstAnimationContainerSize,
      firstAnimationTextOpacity
    }
  }
}
</script>

<style scoped>
.mostOuterContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  contain: paint;
}

.firstAnimationSizeContainer {
  height: v-bind(firstAnimationContainerSize);
}

.firstAnimationContainer {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}

.goodbyeText {
  font-size: 100px;
  font-weight: 900;
  font-family: sans-serif;
  transform: matrix(v-bind(firstAnimationTextSize), 0, 0, v-bind(firstAnimationTextSize), 0, 0);
  opacity: v-bind(firstAnimationTextOpacity);
}

.laptopImg {
  position: absolute;
  top: 220px;
  left: -330px;
  transform: matrix(v-bind(firstAnimationLaptopSize), 0, 0, v-bind(firstAnimationLaptopSize), v-bind(firstAnimationLaptopShiftX), v-bind(firstAnimationLaptopShiftY));
}

.phoneImg {
  position: absolute;
  top: 110px;
  left: 460px;
  transform: matrix(v-bind(firstAnimationPhoneSize), 0, 0, v-bind(firstAnimationPhoneSize), v-bind(firstAnimationPhoneShiftX), v-bind(firstAnimationPhoneShiftY));
}

.firstAnimationPlaceholder {
  position: absolute;
  bottom: 20%;
}


/*@media only screen and (max-width: 1200px) {*/
/*  .goodbyeText {*/
/*    font-size: 80px;*/
/*    transform: matrix(v-bind(firstAnimationTextSize), 0, 0, v-bind(firstAnimationTextSize), 0, 0);*/
/*  }*/

/*  .laptopImg {*/
/*    position: absolute;*/
/*    top: 220px;*/
/*    left: -330px;*/
/*    transform: matrix(v-bind(firstAnimationLaptopSize), 0, 0, v-bind(firstAnimationLaptopSize), v-bind(firstAnimationLaptopShiftX), v-bind(firstAnimationLaptopShiftY));*/
/*  }*/

/*  .phoneImg {*/
/*    position: absolute;*/
/*    top: 120px;*/
/*    left: 450px;*/
/*    transform: matrix(v-bind(firstAnimationPhoneSize), 0, 0, v-bind(firstAnimationPhoneSize), v-bind(firstAnimationPhoneShiftX), v-bind(firstAnimationPhoneShiftY));*/
/*  }*/
/*}*/
/*@media only screen and (max-width: 1000px) {*/

/*}*/

</style>