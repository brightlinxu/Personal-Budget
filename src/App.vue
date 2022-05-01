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
  border-style: solid;
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
  transition: 0.1s;
}
.buttonStyle:hover {
  /*background-color: #5f82b8;*/
  background-color: #0369a1;
  color: white;
}
.buttonStyle:active {
  /*background-color: #5472a1;*/
  color: white;
}

.buttonStyle2 {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
  /*background-color: #5f82b8;*/
  background-color: #0369a1;
  color: white;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  transition: 0.1s;
}
.buttonStyle2:hover {
  /*background-color: #5472a1;*/
}
.buttonStyle2:active {
  /*background-color: #48618a;*/
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


/*for settings page*/
.floatingInput {
  font-size: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  transition: border-color 0.2s ease;
  caret-color: #6200ee;
  height: 30px;
  padding-top: 10px;
  border-radius: 0px;
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
  color: darkgrey;
}

.floatingLabel::before,
.floatingInput:focus + .floatingLabel::before {
  transform: translate3d(-16px, -48px, 0) scale3d(0.82, 0.82, 1);
}

.floatingInput:focus + .floatingLabel::before {
  color: #0369a1;
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
