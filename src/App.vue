<template>
  <v-app>
    <div id="app">
      <img src="./assets/todologo.png"/>
      <ToDo />
      <br/>
      <Checked />
    
    </div>
  </v-app>
</template>

<script>
import ToDo from './components/ToDo.vue'
import Checked from './components/Checked.vue'

export default {
  name: 'app',
  components: {
    ToDo, Checked
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

body{
  background-color: #d9f1f7;
  font-family: 'Monsterrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2px;
  margin-bottom: 50px;
  
}
#app{
  background-color: #d9f1f7;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
