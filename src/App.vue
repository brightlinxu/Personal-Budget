<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>

<style>
.loadingContainer {
  display: flex;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  /* color: #2c3e50; */
}

body {
  margin: 0;
  padding: 0;
  background-color: #FAFAFA;
}
input {
  font-family: Avenir;
  background: none;
  outline: none;
  margin: 0;
  padding: 0;
  border-width: 0;
  display: block;
  width: 100%;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number]{
  -moz-appearance: textfield;
}
button {
  font-family: Avenir;
  background: none;
	color: inherit;
	border: none;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}

.buttonStyle {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  transition: 0.15s;
}
.buttonStyle:hover {
  background-color: #D0E2EE;
}
.buttonStyle:active {
  background-color: #bbccd8;
}

.buttonStyle2 {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #D0E2EE;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.buttonStyle2:hover {
  background-color: #bbccd8;
}

.cutOverflow {
  margin-right: 2px; 
  overflow: hidden; 
  text-overflow: ellipsis;
  white-space: nowrap;
}

.noHighlight {
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>


<!--
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
-->
