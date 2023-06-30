<script setup lang="ts">
import type { IQuestion, IQuiz, IAnswer } from '@/types/quiz';
import { ref } from 'vue';

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

function getInputType(type: string) {
    switch (type) {
        case "multiple_choice":
            return "checkbox";

        case "single_choice":
            return "radio";

        default:
            return "";
    }
}

function getColor(answer: IAnswer) {
    if (!submitted.value) return "";

    if (answer.isCorrect === answer.isSelected || !answer.isCorrect && answer.isSelected === undefined) return "question-success";
    else return "question-failed";
}

</script>

<template>
    <div class="content">
        <form v-on:submit.prevent="onSubmit()">
            <h1 class="headline">{{ props.quiz.title }}</h1>
            <div class="question-box" v-for="question in props.quiz.questions">
                <h3 class="question-headline">{{ question.title }}</h3>

                <div v-for="answer in question.answers">
                    <div>
                        <input v-bind:type="getInputType(question.type)" v-bind:name="question.title"
                            v-bind:id="answer.text" v-on:change="updateAnswer(question, answer.text)" :disabled="submitted">
                        <label v-bind:class="getColor(answer)" v-bind:for="answer.text">{{
                            answer.text }}</label>
                    </div>
                </div>
            </div>
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

.question-box {
    border: 1px solid rgba(95, 95, 95, 0.673);
    border-radius: 10px;
    margin: 1rem;

    padding: 1rem;
    width: 100%;
}

.question-failed {
    color: rgb(181, 58, 58);
}

.question-success {
    color: rgb(59, 170, 59);
}

.question-headline {
    margin-bottom: 0.5rem;
}

input {
    margin-left: 0.5rem;
}

label {
    margin-left: 1rem;
}

label:hover {
    cursor: pointer;
}

@media (min-width: 1024px) {}
</style>
../types/interfaces@/types/quiz