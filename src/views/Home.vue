<template>
  <div class="mostOuterContainer">
    <div class="firstAnimationSizeContainer" id="firstAnimationSizeContainer">
      <div class="firstAnimationContainer">
        <div class="goodbyeText">
          <transition name="fadeInGoodbye" appear>
            <div class="goodbyeTextOpacity" v-show="displayReady">Goodbye</div>
          </transition>
          <transition name="fadeInLaptop" appear>
            <div class="laptopImg" v-show="displayReady"><img src="/laptop3D2.png" alt="Laptop Render" width="450" @load="handleImgLoad"/></div>
          </transition>
          <transition name="fadeInPhone" appear>
            <div class="phoneImg" v-show="displayReady"><img src="/phone3D2.png" alt="Phone Render" width="180" @load="handleImgLoad"/></div>
          </transition>
        </div>
      </div>
    </div>
    <div class="firstAnimationOpacityIndicator" id="opacityIndicator" />
    <div class="secondAnimationSizeContainer" id="secondAnimationSizeContainer">
      <div class="secondAnimationContainer">
        <div class="secondAnimationText">Hello Simple Budgeting</div>
      </div>
    </div>
  </div>
  <div class="restOfLandingContainer">
    <div @click="handleSignupClick" class='buttonStyle landingSignup'>Let's go!</div>
    <div @click="handleLoginClick" class='landingLogin'>I already have an account</div>
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
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const scrollPosition = ref();
    const windowWidth = ref();

    const imgCounter = ref(0);
    const displayReady = ref(false);

    const firstAnimationContainerSize = ref(1200);
    const firstAnimationTextSize = ref(1);
    const firstAnimationLaptopSize = ref(1);
    const firstAnimationPhoneSize = ref(1);
    const firstAnimationLaptopShiftX = ref(0);
    const firstAnimationLaptopShiftY = ref(0);
    const firstAnimationPhoneShiftX = ref(0);
    const firstAnimationPhoneShiftY = ref(0);
    const firstAnimationTextOpacity = ref(1);
    const firstAnimationFinish = ref(true);
    const secondAnimationStartPosition = ref();
    const secondAnimationTextSize = ref(1);
    const secondAnimationTextOpacity = ref(0);
    const secondAnimationContainerSize = ref(2640);

    watch(scrollPosition, (curScrollVal) => {
      // first animation
      // const widthHeightScale = (windowWidth.value * 0.16) + 100;
      // firstAnimationContainerSize.value = `${widthHeightScale}vh`; // y = 0.16x + 30 is best line of fit where x = windowWidth and y = vh
      const widthHeightScale = (windowWidth.value * 1.13) + 370;
      firstAnimationContainerSize.value = widthHeightScale; // y = 1.13x + 170 is best line of fit where x = windowWidth and y = vh
      firstAnimationTextSize.value = 1 + (curScrollVal * 0.0004);
      firstAnimationLaptopSize.value = 1 + (curScrollVal * 0.002);
      firstAnimationPhoneSize.value = 1 + (curScrollVal * 0.002);
      firstAnimationLaptopShiftX.value = curScrollVal * -0.9;
      firstAnimationLaptopShiftY.value = curScrollVal * 0.24;
      firstAnimationPhoneShiftX.value = curScrollVal * 0.6;
      firstAnimationPhoneShiftY.value = curScrollVal * -0.22;
      secondAnimationContainerSize.value = (windowWidth.value * -1.14) + 2400

      const opacityIndicator = document.getElementById('opacityIndicator').getBoundingClientRect();
      firstAnimationFinish.value = opacityIndicator.bottom > window.innerHeight / 5;
      secondAnimationStartPosition.value = opacityIndicator.bottom + curScrollVal + 100; // second animation will always start at the addition of the 2 values
      if (opacityIndicator.bottom <= window.innerHeight) {
        // opacity is ready to change
        firstAnimationTextOpacity.value = firstAnimationFinish.value ? (opacityIndicator.bottom / window.innerHeight) ** 3 : 0;
      }
      else {
        firstAnimationTextOpacity.value = 1;
      }

      // second animation
      if (curScrollVal > secondAnimationStartPosition.value) {
        secondAnimationTextSize.value = Math.min(1 + ((curScrollVal - secondAnimationStartPosition.value) * 0.0002), 1.12);
        secondAnimationTextOpacity.value = ((curScrollVal / secondAnimationStartPosition.value) - 1) * 2;
      }
      else {
        secondAnimationTextOpacity.value = 0;
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
    }

    const handleWindowResize = () => {
      windowWidth.value = window.innerWidth;
    }

    const handleSignupClick = () => {
      router.push('/signup');
    }

    const handleLoginClick = () => {
      router.push('/login');
    }

    const handleImgLoad = () => {
      imgCounter.value += 1;
      if (imgCounter.value === 2) {
        displayReady.value = true;
      }
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
      firstAnimationContainerSize: computed(() => `${firstAnimationContainerSize.value}px`),
      firstAnimationTextOpacity,
      secondAnimationStartPosition,
      secondAnimationTextSize,
      secondAnimationTextOpacity,
      secondAnimationContainerSize: computed(() => `${secondAnimationContainerSize.value}px`),
      handleSignupClick,
      handleLoginClick,
      handleImgLoad,
      displayReady,
      firstAnimationOpacityIndicatorMargin: computed(() => `-${firstAnimationContainerSize.value * 0.38}px`)
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
  position: -webkit-sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
}

.goodbyeText {
  font-size: 100px;
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  transform: matrix(v-bind(firstAnimationTextSize), 0, 0, v-bind(firstAnimationTextSize), 0, 0);
  will-change: transform;
}

.goodbyeTextOpacity {
  opacity: v-bind(firstAnimationTextOpacity);
  will-change: opacity;
}

.laptopImg {
  position: absolute;
  top: -20px;
  left: -330px;
  transform: matrix(v-bind(firstAnimationLaptopSize), 0, 0, v-bind(firstAnimationLaptopSize), v-bind(firstAnimationLaptopShiftX), v-bind(firstAnimationLaptopShiftY));
  will-change: transform;
}

.phoneImg {
  position: absolute;
  top: -140px;
  left: 460px;
  transform: matrix(v-bind(firstAnimationPhoneSize), 0, 0, v-bind(firstAnimationPhoneSize), v-bind(firstAnimationPhoneShiftX), v-bind(firstAnimationPhoneShiftY));
  will-change: transform;
}

.firstAnimationOpacityIndicator {
  margin-top: v-bind(firstAnimationOpacityIndicatorMargin);
}

.secondAnimationSizeContainer {
  height: 1900px;
}

.secondAnimationContainer {
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  margin-top: -3000px;
}

.secondAnimationText {
  font-size: 50px;
  font-weight: 600;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  transform: matrix(v-bind(secondAnimationTextSize), 0, 0, v-bind(secondAnimationTextSize), 0, 0);
  opacity: v-bind(secondAnimationTextOpacity);
}

.restOfLandingContainer {
  margin: -10vh 0 30vh 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.landingSignup {
  z-index: 10;
  border-radius: 50px;
  padding: 15px 40px;
  background-color: #0369a1;
  color: white;
  font-size: 18px;
  transition: 0.15s linear;
}
.landingSignup:hover {
  transform: scale(1.05);
}

.landingLogin {
  z-index: 10;
  color: #0369a1;
  cursor: pointer;
  margin-top: 40px;
}



.fadeInGoodbye-enter-active,
.fadeInGoodbye-leave-active {
  transition: all 1.5s;
  transition-delay: 0.3s;
}
.fadeInGoodbye-enter-from,
.fadeInGoodbye-leave-to {
  opacity: 0;
  transform: matrix(0.7, 0, 0, 0.7, 0, 0)
}

.fadeInLaptop-enter-active,
.fadeInLaptop-leave-active {
  transition: all 1.8s;
}
.fadeInLaptop-enter-from,
.fadeInLaptop-leave-to {
  transform: matrix(0.5, 0, 0, 0.5, 250, -80)
}

.fadeInPhone-enter-active,
.fadeInPhone-leave-active {
  transition: all 1.8s;
}
.fadeInPhone-enter-from,
.fadeInPhone-leave-to {
  transform: matrix(0.5, 0, 0, 0.5, -250, 20)
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