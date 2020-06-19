<template>
  <div class="container">
    <div class="row">
      <h1 style="text-align: center">Small numbers quiz</h1>
      <hr>
          <transition type="animation" mode="out-in" 
            leave-active-class="animate__animated animate__backOutDown" 
            enter-active-class="animate__animated animate__backInDown">
        <component :is="currentComponent"></component>      
      </transition>
      
    </div>
  </div>
</template>

<script>
import QuizComponent from "./QuizComponent.vue";
import StartScreen from "./StartScreen.vue";
import eventBus from './main.js';

export default {
  mounted() {
    const vm = this
    eventBus.$on('endGame', () => {
      setTimeout( () => {
        console.log('changing')
        vm.currentComponent = StartScreen
      }, 2000)
    });
    eventBus.$on('newGame', () => {
      setTimeout( () => {
        console.log('changing')
        vm.currentComponent = QuizComponent
      })
    });
  },
  data() {
    return {
      currentComponent: QuizComponent
    }
  },
  components: {
    QuizComponent: QuizComponent,
    StartScreen: StartScreen
  },
  methods: {
  }
};
</script>

<style>

</style>
