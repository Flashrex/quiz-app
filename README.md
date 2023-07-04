# Quiz App Vue 3

A vue 3 quiz app. Create your own tests and check your knowledge.
Generated using vue version 3.3.4 and typescript.

## Creating your own Quizzes

To create a new quiz simply place your quiz.json file in "public/assets/quizzes/". 
Afterwards add your filename to "src/quizzes.ts".
Thats it! Restart the app and your quiz should be displayed.

## How to format the quiz file

This framework is using json-files to save and load quizzes.
A barebone quiz.json looks like this:

```js
{
    "title": "YOUR QUIZ NAME",
    "questions": [
        ...
    ]

}
```

Currently there are 3 types of questions for Quizzes.

# Single Choice Question
A single choice question is a question where only one answer is correct.

```js
{
    "type": "single_choice",
    "title": "YOUR QUESTION HERE"
    "answers": [
        {
            "text": "YOUR FIRST ANSWER",
            "isCorrect": true
        },
        {
            "text": "YOUR SECOND ANSWER",
            "isCorrect": false
        },
        ...
    ]
}
```

You can add as many answers as you like. Keep in mind that only one answer should have a positive "isCorrect" value.

# Multiple Choice Question
A multiple choice question is a question where multiple answers are correct.

```js
{
    "type": "multiple_choice",
    "title": "YOUR QUESTION HERE"
    "answers": [
        {
            "text": "YOUR FIRST ANSWER",
            "isCorrect": true
        },
        {
            "text": "YOUR SECOND ANSWER",
            "isCorrect": false
        },
        ...
    ]
}
```

You can add as many answers as you like.
There is no limit on how many answers are correct.

# Drop List Question
A drop list question is a question where you need to bring the answers in the correct order.

```js
{
    "type": "drop_list",
    "title": "YOUR QUESTION HERE",
    "answers": [
        {
            "text": "Answer A"
        },
        {
            "text": "Answer B"
        },
        {
            "text": "Answer C"
        },
        ...
    ]
}
```

You can add as many answers as you like. 
Keep in mind that the order of your answers in the array is considered the correct order while submitting the quiz.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
