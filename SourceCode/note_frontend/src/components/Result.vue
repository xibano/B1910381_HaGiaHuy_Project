<script setup>
    import {defineProps} from "vue"
    import {RouterLink} from "vue-router"

    const {numberOfCorrectAnswers, quizQuestionLength} = defineProps(["quizQuestionLength", "numberOfCorrectAnswers"])
</script>

<template>
    <div class="result">
        <p>Kết quả của bạn</p>
        <h1>
            {{ numberOfCorrectAnswers }}/{{ quizQuestionLength }}
        </h1>
        <RouterLink to="/board">Trở lại trang chủ</RouterLink>
    </div>
</template>

<style scoped>
    .result {
        text-align: center;
        padding: 100px 0;
    }

    p{
        font-size: 25px;
    }

    h1 {
        font-size: 80px;
    }
</style>