<script setup lang="ts">
import type { IQuiz } from '@/types/Quiz';

const props = defineProps({
    quizzes: {
        type: Object as () => IQuiz[],
        required: true
    }
})

</script>

<template>
    <div class="content">
        <h1>Quiz App</h1>
        <div v-for="(quiz, index) in props.quizzes" class="quiz-box">
            <h2>{{ quiz.title }}</h2>
            <p class="cursive">Anzahl Fragen: {{ quiz.questions.length }}</p>
            <button class="button" @click="$emit('selectedQuiz', index)">Auswählen</button>
        </div>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cursive {
    font-style: italic;
}

.quiz-box {
    border: 1px solid rgba(95, 95, 95, 0.673);
    border-radius: 10px;
    margin: 1rem;

    padding: 1rem;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.button {
    all: unset;

    padding: 0.5rem 2rem;
    text-transform: uppercase;
    border: 1px solid rgba(95, 95, 95, 0.673);
    border-radius: 10px;
    transition: 0.5s all ease;
}

.button:hover {
    cursor: pointer;
    color: hsla(160, 100%, 37%, 1);
    border-color: hsla(160, 100%, 37%, 1);
    box-shadow: 0 0 10px hsla(160, 100%, 37%, 1);
}

@media (min-width: 1024px) {}
</style>
../types/interfaces