<script setup lang="ts">

import { ref } from 'vue';
import Quiz from './components/Quiz.vue';
import Home from './components/Home.vue';
import { type IQuiz } from './types/Quiz';

const quizes = ref<IQuiz[]>(
  [
    {
      title: "Vue.js Grundkurs Fragen",
      questions: [
        { type: "multiple_choice", title: "Was ist Vue.js?", answers: [{ text: "Datenbanksystem", isCorrect: false }, { text: "Programmiersprache", isCorrect: false }, { text: "JavaScript Framework", isCorrect: true }] },
        { type: "multiple_choice", title: "Welches Unternehmen steckt hinter Vue.js?", answers: [{ text: "Facebook", isCorrect: false }, { text: "Google", isCorrect: false }, { text: "Keines (Open Source Community)", isCorrect: true }] },
        { type: "single_choice", title: "Welchen API Stil sollte man für eine vollständige Applikation verwenden?", answers: [{ text: "Options API", isCorrect: false }, { text: "Composition API", isCorrect: true }] },
      ]
    },
    {
      title: "Test 2",
      questions: [
        { type: "multiple_choice", title: "What is the answer?", answers: [{ text: "Answer 1", isCorrect: false }, { text: "Answer 2", isCorrect: false }, { text: "Answer  3", isCorrect: false }] },
        { type: "single_choice", title: "What is the answer?", answers: [{ text: "Answer 1", isCorrect: false }, { text: "Answer 2", isCorrect: false }, { text: "Answer  3", isCorrect: false }] }
      ]
    }
  ]
);

const selectedQuiz = ref<IQuiz>();

function onSelectedQuiz(index: number) {
  selectedQuiz.value = quizes.value[index];
}

function onReturnToMain() {
  console.log("test");
  selectedQuiz.value = undefined;
}

</script>

<template>
  <main>
    <Home v-if="!selectedQuiz" :quizzes="quizes" @selected-quiz="onSelectedQuiz"></Home>
    <Quiz v-else :quiz="selectedQuiz" @return-to-main="onReturnToMain"></Quiz>
  </main>
</template>

<style scoped>
main {
  display: flex;
  width: 100%;
  justify-content: center;
}

@media (min-width: 1024px) {}
</style>
