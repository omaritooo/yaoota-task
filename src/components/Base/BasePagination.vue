<template>
    <div class="inline-flex items-center justify-center gap-3 mx-auto text-black">
        <button @click="pageChanger('prev')"
            class="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded disabled:bg-gray-100 disabled:text-gray-300"
            :disabled="page == 1">
            <span class="sr-only">Next Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
            </svg>
        </button>

        <p class="text-lg">
            {{ modelValue }}
            <span class="mx-0.25">/</span>
            {{ length }}
        </p>

        <button :disabled="page == length" @click="pageChanger('next')"
            class="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded disabled:bg-gray-100 disabled:text-gray-300">
            <span class="sr-only">Next Page</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref, toRefs, defineEmits, watch } from 'vue'
import { usePostStore } from '../../stores/posts';
const store = usePostStore()
const { searchTarget } = storeToRefs(store)
const props = defineProps({
    length: {
        type: Number,
        default: 0,
        required: true
    },
    modelValue: {
        type: Number,
        default: 1,
        required: true
    },
})
const emit = defineEmits(['update:modelValue'])
const page = ref(1)
const { length } = toRefs(props)
const pageChanger = (type) => {
    if (type == 'next') {
        if (page.value < 10) {
            page.value++
        }
    }
    if (type == 'prev') {
        page.value--
    }
    emit('update:modelValue', page.value)
}

watch(searchTarget, (val) => {
    page.value = 1
    emit('update:modelValue', 1)

})
watch(length, (val) => {
    if (val == 0) {
        page.value = 0
        emit('update:modelValue', 0)

    }
})




</script>