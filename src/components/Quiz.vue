<script setup lang="ts">
import type { IQuestion, IQuiz } from '@/types/quiz';
import { ref } from 'vue';
import Question from './Question.vue';

const props = defineProps({
    quiz: {
        type: Object as () => IQuiz,
        required: true
    }
})

const submitted = ref(false);

function onSubmit() {
    if (submitted.value) return;
    submitted.value = true;
}

function updateAnswer(question: IQuestion, text: string) {
    const answer = question.answers.find(q => q.text === text);
    if (answer === undefined) return;

    answer.isSelected = !answer.isSelected;
}




</script>

<template>
    <div class="content">
        <form v-on:submit.prevent="onSubmit()">
            <h1 class="headline color-green">{{ props.quiz.title }}</h1>
            <Question v-for="question in props.quiz.questions" :question="question" :submitted="submitted"
                @updateAnswer="updateAnswer"></Question>
            <div class="flex">
                <button v-if="!submitted" class="button_submit">Überprüfen</button>
                <button v-else class="button_submit" @click="$emit('returnToMain')">Zurück zur Übersicht</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.content {
    display: flex;
    width: 100%;
    justify-content: center;
}

.flex {
    display: flex;
    gap: 0.5rem;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button_submit {
    all: unset;

    padding: 1rem 4rem;
    text-transform: uppercase;
    border: 1px solid rgba(95, 95, 95, 0.673);
    border-radius: 10px;
    transition: 0.5s all ease;
}

.button_submit:hover {
    cursor: pointer;
    color: hsla(160, 100%, 37%, 1);
    border-color: hsla(160, 100%, 37%, 1);
    box-shadow: 0 0 10px hsla(160, 100%, 37%, 1);
}

@media (min-width: 1024px) {}
</style>
../types/interfaces@/types/quiz