<template>
    <textarea v-if="textField" class="w-full p-4 my-4 text-black rounded-sm shadow-md placeholder:text-black"
        :placeholder="placeholder" :value="modelValue" @keyup="$emit('update:modelValue', $event.target.value)" :id="id" />
    <input v-else class="w-full h-10 p-4 my-4 text-black rounded-sm shadow-md placeholder:text-black"
        :placeholder="placeholder" :value="modelValue" @keyup="$emit('update:modelValue', $event.target.value)" :id="id" />
</template>
<script setup>
defineProps({
    id: {
        required: true,
        default: '',
        type: String
    },
    modelValue: {
        type: String,
        default: ''
    },
    textField: {
        default: false,
        type: Boolean
    },
    placeholder: {
        type: String,
        default: 'Enter your text here..'
    }
})
</script>