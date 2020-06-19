<template>
  <transition
    appear
    @before-enter="enterDelay"
    @leave="leave"
    :leave-active-class="'animate__animated animate__fadeOut' + animationDirection"
    :enter-active-class="'animate__animated animate__zoomIn' + animationDirection"
  >
    <div
      v-if="visible"
      @click="processAnswer($event)"
      class="answer col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3"
    >{{ answer | cutDecimals}}</div>
  </transition>
</template>
<script>
import eventBus from "./main";

export default {
  props: ["answer", "animationDirection", "answerIndex", "correctAnswer"],
  methods: {
    enterDelay(el, done) {
      el.style.animationDuration = Math.random() * 1500 + 700 + "ms"; //
    },
    leave(el, done) {
      setTimeout(() => {
        done();
      }, 2000);
    },
    processAnswer(event) {
      if (this.answer !== this.correctAnswer) {
        event.target.classList.add("animate__animated", "animate__shakeX");
        const previousColor = "darkblue";
        event.target.style.background = "#ee1111";
        let shake = setTimeout(() => {
          event.target.classList.remove("animate__animated");
          event.target.classList.remove("animate__shakeX");
          event.target.style.background = previousColor;
        }, 800);
      } else {
        event.target.style.background="limegreen"
        this.$emit("answered", this.answerIndex);
      }
    }
  },
  filters: {
    cutDecimals(value) {
      if (("" + value).match(/\./)) return value.toFixed(5);
      return value;
    }
  },
  mounted() {
    eventBus.$on("closeAnswers", () => {
      setTimeout(() => {
        this.visible = false
      }, Math.random() * 300 + 700)

    });
  },
  data() {
    return { visible: true };
  }
};
</script>
<style>
.answer {
  width: 5em;
  height: 3em;
  margin: 2rem 20rem 2rem 20rem;
  border-radius: 3px;
  color: whitesmoke;
  background-color: darkblue;
  font-weight: bold;
  font-size: 28pt;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.1s ease-out;
}

</style>