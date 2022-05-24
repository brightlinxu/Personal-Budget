<template>
  <div :class='{ fixedContainer: true, fixedContainerAfterScroll: scrollPosition > 20}'>
    <div class='nav-bar-container'>
      <div @click='handleRedirectHome' class='buttonStyle'>Home</div>
      <div v-if='authIsReady && !authData' class='rightSide'> <!-- not logged in -->
        <LoginButton />
        <SignupButton />
      </div>
      <div v-else-if="isPhoneWidth" class='rightSide'> <!-- logged in -->
        <div v-if='dataIsReady && data' style='margin: 5px 13px;'>Hi {{ data.firstName }}!</div>
        <div @click='toggleDropdown' v-click-away="onClickAway" :class="{ navbarMenuIcon: true, navbarMenuContentsOpen: menuOpen }"><Menu :size="22"/></div>
        <transition name="dropdown">
          <div v-if="menuOpen" class="navbarMenuContents">
            <div @click='handleRedirectSettings' class='navbarMenuContent'>Settings</div>
            <LogoutButton class="navbarMenuContent" :usingCustomStyle="true"/>
          </div>
        </transition>
      </div>
      <div v-else class='rightSide'>
        <div v-if='dataIsReady && data' style='margin: 5px 13px;'>Hi {{ data.firstName }}!</div>
        <div @click='handleRedirectSettings' class='buttonStyle' style='margin: 0px 3px;'>Settings</div>
        <LogoutButton />
      </div>
    </div>
  </div>
</template>

<script>
import LoginButton from './LoginButton.vue';
import SignupButton from './SignupButton.vue';
import LogoutButton from './LogoutButton.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import Menu from 'vue-material-design-icons/Menu.vue'

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const scrollPosition = ref();
    const windowWidth = ref();
    const menuOpen = ref(false);

    const handleRedirectHome = () => {
      if (store.state.authData === null) {
        // not logged in
        router.push('/');
      }
      else {
        // is logged in
        router.push('/budget');
      }
    }

    const handleRedirectSettings = () => {
      router.push('/settings');
    }

    const updateScrollPosition = () => {
      scrollPosition.value = window.scrollY;
    }

    const toggleDropdown = () => {
      menuOpen.value = !menuOpen.value;
    }

    const onClickAway = () => {
      menuOpen.value = false;
    }

    const handleWindowResize = () => {
      windowWidth.value = window.innerWidth;
    }

    onMounted(() => {
      window.addEventListener('scroll', updateScrollPosition);
      window.addEventListener('resize', handleWindowResize);
      handleWindowResize();
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', handleWindowResize)
    });

    return {
      authData: computed(() => store.state.authData),
      authIsReady: computed(() => store.state.authIsReady),
      data: computed(() => store.state.data),
      dataIsReady: computed(() => store.state.dataIsReady),
      handleRedirectSettings,
      handleRedirectHome,
      scrollPosition,
      toggleDropdown,
      menuOpen,
      onClickAway,
      isPhoneWidth: computed(() => windowWidth.value < 720),
    }
  },
  components: {
    LoginButton, SignupButton, LogoutButton, Menu
  }
}
</script>

<style scoped>
.fixedContainer {
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: 0.3s;
  color: #333;
}
.fixedContainerAfterScroll {
  background-color: rgba(256, 256, 256, 0.95);
  box-shadow: 0 0 15px 0 rgb(0 0 0 / 10%);
}

.nav-bar-container {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
}

.rightSide {
  display: flex;
}

.navbarMenuIcon {
  width: 22px;
  height: 22px;
  margin: 1.5px 5px 0 5px;
  cursor: pointer;
  padding: 3px;
  border-radius: 3px;
}
.navbarMenuIcon:hover {
  background-color: #ddd;
}
.navbarMenuContentsOpen {
  background-color: #ddd;
}

.navbarMenuContents {
  position: absolute;
  transform: translate(19px, 36px);
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 7px;
  z-index: 99;
  width: 100px;
  overflow: hidden;
}

.navbarMenuContent {
  padding: 8px 10px;
  cursor: pointer;
}
.navbarMenuContent:hover {
  background-color: #f3f4f6;
}
.navbarMenuContent:active {
  background-color: #e5e7eb;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translate(19px, 31px);
}
</style>