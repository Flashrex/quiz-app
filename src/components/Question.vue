
<script setup lang="ts">
import type { IAnswer, IQuestion } from '@/types/quiz';
import { computed, ref } from 'vue';
import draggable from 'vuedraggable';

const props = defineProps({
    question: {
        type: Object as () => IQuestion,
        required: true
    },
    submitted: {
        type: Boolean,
        required: true
    }
})

const reactiveRef = ref(shuffle(props.question.answers.map((a, index) => { return { id: index, name: a.text } })));

const filteredAnswers = computed({
    get() {
        return reactiveRef.value
    },
    set(newValue) {
        reactiveRef.value = newValue
    }
});

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
    if (!props.submitted) return "";

    if (answer.isCorrect === answer.isSelected || !answer.isCorrect && answer.isSelected === undefined) return "question-success";
    else return "question-failed";
}

function getColorDropList(answer: string) {
    if (!props.submitted) return "";

    const original = props.question.answers;
    const current = reactiveRef.value.findIndex((a: { name: string; }) => a.name === answer);

    if (original[current].text === answer) return "droplist-success";
    else return "droplist-failed";
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(arr: any) {
    var j, x, index;
    for (index = arr.length - 1; index > 0; index--) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
    }
    return arr;
}
</script>

<template>
    <div class="question-box">
        <h3 class="question-headline">{{ question.title }}</h3>

        <draggable v-if="question.type === 'drop_list'" v-model="filteredAnswers" item-key="name">
            <template #item="{ element }">
                <div class="answer" v-bind:class="getColorDropList(element.name)"> {{ element.name }}</div>
            </template>
        </draggable>

        <div v-else v-for="answer in question.answers">
            <input v-bind:type="getInputType(question.type)" v-bind:name="question.title" v-bind:id="answer.text"
                v-on:change="$emit('updateAnswer', question, answer.text)" :disabled="submitted">
            <label v-bind:class="getColor(answer)" v-bind:for="answer.text">{{
                answer.text }}</label>
        </div>
    </div>
</template>

<style scoped>
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

.answer {
    margin: 0.2rem;
    padding: 0.2rem;
    padding-left: 0.5rem;
    border-radius: 5px;
    border: 1px solid rgba(95, 95, 95, 0.673);
}

.answer:hover {
    cursor: pointer;
}

.droplist-failed {
    border: 1px solid rgb(181, 58, 58);
}

.droplist-success {
    border: 1px solid rgb(59, 170, 59);
}
</style>