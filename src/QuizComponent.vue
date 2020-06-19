<template>
  <div class="panel panel-default" style="width:100%; height: 400px;">
    <div
      class="panel-heading"
      style="font-size:20pt; font-family:Helvetica; text-align:center"
    >What does {{mathQuestion}} equal to?</div>
    <div class="panel-body">
      <div class="container" style="margin:-15px">
        <div class="row" style="display: flex; align-items: center; justify-content: center;">
          <SingleAnswer
            :correctAnswer="correctAnswer"
            :answer="answers[0]"
            :animationDirection="'Right'"
            :answerIndex="0"
            @answered="receiveAnswer($event)"
          />
          <SingleAnswer
            :correctAnswer="correctAnswer"
            :answer="answers[1]"
            :animationDirection="'Left'"
            :answerIndex="1"
            @answered="receiveAnswer($event)"
          />
        </div>
        <br />
        <div class="row" style="display: flex; align-items: center; justify-content: center;">
          <SingleAnswer
            :correctAnswer="correctAnswer"
            :answer="answers[2]"
            :animationDirection="'Right'"
            :answerIndex="2"
            @answered="receiveAnswer($event)"
          />
          <SingleAnswer
            :correctAnswer="correctAnswer"
            :answer="answers[3]"
            :animationDirection="'Left'"
            :answerIndex="3"
            @answered="receiveAnswer($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import SingleAnswer from './SingleAnswer.vue';
import eventBus from './main.js';
export default {
  data() {
    return {
      // mathQuestion: '',
      numbers: [],
      operand: '',
      answers: [],
      operandFunctionMap: {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
      },
      visible: true,
      correctAnswer: ''
    };
  },
  mounted() {
    this.newGame();
  },
  computed: {
    mathQuestion() {
      return this.numbers[0] + ' ' + this.operand + ' ' + this.numbers[1];
    }
  },
  methods: {
    receiveAnswer(emittedIndex) {
      eventBus.$emit('closeAnswers')
      eventBus.$emit('endGame')
    },
    newGame() {
      this.randomizeNumbers();
      this.randomizeOperand();
      this.populateAnswers();
    },
    randomizeNumbers() {
      this.numbers = [
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100)
      ];
    },
    randomizeOperand() {
      this.operand = this.getRandomOperator();
    },
    populateAnswers() {
      this.correctAnswer = this.operandFunctionMap[this.operand](
        this.numbers[0],
        this.numbers[1]
      );
      this.answers = this.shuffleArray([
        this.correctAnswer,
        Math.floor(Math.random() * 200),
        Math.floor(Math.random() * 200),
        Math.floor(Math.random() * 200)
      ]);
    },
    getRandomOperator() {
      return ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
    },
    enterDelay(el, done) {
      el.style.animationDuration = Math.random() * 1500 + 700 + 'ms';
    },
    shuffleArray(array) {
      // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    },
  },
  components: {
      SingleAnswer: SingleAnswer
    },
};
</script>
<style>

</style>