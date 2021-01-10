<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <hello-world msg="Hello Vue 3 + Vite" />
  <d-button @click="confirm">Confirm1</d-button>
  <d-button @click="cancel">Cancel</d-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/hello-world.vue'
import DevUIButton from '../devui/button/button.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    DevUIButton,
  },
  methods: {
    confirm() {
      console.log('confirm')
    },
    cancel() {
      console.log('cancel')
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>