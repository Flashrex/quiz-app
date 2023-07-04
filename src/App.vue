<script setup lang="ts">

import { ref, onMounted } from 'vue';
import Quiz from './components/Quiz.vue';
import Home from './components/Home.vue';
import { type IQuiz } from './types/quiz';
import axios from 'axios';
import { quizNames } from './quizzes';

const quizzes = ref<IQuiz[]>([]);

onMounted(async () => {
  let data: IQuiz[] = [];

  try {

    for (const quiz of quizNames) {
      const fileResponse = await axios.get(`assets/quizzes/${quiz}.json`);
      const fileData = fileResponse.data;
      data.push(fileData);
    }
  } catch (err) {
    console.error(err);
  }
  quizzes.value = data;
})

const selectedQuiz = ref<IQuiz>();

function onSelectedQuiz(index: number) {
  selectedQuiz.value = quizzes.value[index];
}

function onReturnToMain() {
  selectedQuiz.value = undefined;
}

</script>

<template>
  <main>
    <Home v-if="!selectedQuiz" :quizzes="quizzes" @selected-quiz="onSelectedQuiz"></Home>
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
./types/quiz