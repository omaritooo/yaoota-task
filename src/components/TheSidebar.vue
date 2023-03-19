<template>
    <aside class="flex flex-col py-2 text-black transition duration-300 bg-white rounded-r-sm shadow-md gap-y-2 w-fit">

        <h2 class="flex px-2 text-2xl align-middle gap-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-10 h-10 my-auto">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
            <span v-if="sidebarToggle">Users</span>
        </h2>
        <button @click="userInfo(user.id)" v-show="sidebarToggle"
            class="flex p-2 rounded-sm hover:bg-red-500 whitespace-nowrap gap-x-1" v-for="user in users" :key="user.id">

            {{ user.name }}
        </button>
        <button :class="sidebarToggle ? '' : 'mx-auto'" class="px-2 mt-auto transition duration-150 delay-150"
            @click="minimizeSideBar">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
        </button>

    </aside>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    users: {
        type: Array,
        required: true
    },
    modelValue: {
        type: Number,
        default: 1,
        required: true
    },
})

const sidebarToggle = ref(true)
const userInfo = (userId) => {
    emit('update:modelValue', userId)
}
const minimizeSideBar = () => {
    sidebarToggle.value = !sidebarToggle.value
}
</script>
<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}
</style>