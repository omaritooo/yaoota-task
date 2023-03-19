<template>
    <section class="flex flex-col justify-between w-full sm:w-full sm:flex-row gap-x-2">
        <div class="flex flex-col w-full p-5 mt-4 bg-white rounded-md shadow-md h-fit gap-y-3 sm:w-1/3">
            <h1 class="text-xl md:text-2xl ">
                More About the Author:
            </h1>
            <template v-if="user">
                <span>
                    Email: {{ user.email }}
                </span>
                <span>
                    Name: {{ user.name }}
                </span>
                <span>
                    Number: {{ user.phone }}
                </span>
                <span>
                    Company: {{ user.company.name }}
                </span>
                <span>
                    Website: {{ user.website }}
                </span>
            </template>
        </div>
        <div class="flex flex-col flex-1 mt-4 gap-y-2 ">
            <form action="" class="w-full p-4 bg-white rounded-md shadow-md">
                <label class="mb-4" for="" v-if="error">Enter correct data</label>
                <div class="mb-2">
                    <BaseInput v-model="form.name" id="name" placeholder="Enter your name" />
                </div>
                <div class="mb-2">
                    <BaseInput v-model="form.email" id="email" placeholder="Enter your Email" />
                </div>
                <div class="mb-2">
                    <BaseInput v-model="form.body" id="body" textField placeholder="Enter your Comment" />
                </div>
                <div>
                    <button @click.prevent="submit"
                        class="px-3 py-2 text-sm text-white text-blue-100 bg-blue-600 rounded bg-darkBlue">
                        Comment
                    </button>
                </div>
            </form>
            <Comment v-if="comments" v-for="comment in comments" :comment="comment" />
            <CommentLoader v-else />
        </div>
    </section>
</template>
<script setup>
import {
    defineProps, ref, defineAsyncComponent,
    defineEmits, toRefs, onMounted

} from 'vue'

import CommentLoader from "./CommentLoader.vue"
import BaseInput from '../Base/BaseInput.vue';
import { useUserStore } from '../../stores/users';
import { storeToRefs } from 'pinia';


const form = ref({
    name: '',
    email: '',
    body: ''
})

const error = ref(false)


const Comment = defineAsyncComponent({
    loader: () => import('./Index.vue'),
    loadingComponent: CommentLoader,
    delay: 2000,
    timeout: 3000,
})
const props = defineProps({
    comments: {
        type: Array,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
        default: 1
    }
})
const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const { userId } = toRefs(props)
const user = ref({})
user.value = users.value[userId.value - 1]







const submit = () => {
    if (!form.value['email'].match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        error.value = true
        return;
    }
    if (!form.value['name'].match(/^[a-z ,.'-]+$/i)) {
        error.value = true
        return;
    }
    if (form.value['body'].length < 6) {
        error.value = true
        return;
    }
    error.value = false
    emit('comment', form.value)


}
</script>