<template>
    <div class="relative grid grid-cols-1 gap-4 p-4 bg-white border rounded-lg shadow-lg">
        <div class="relative flex gap-4">

            <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between">
                    <span class="relative overflow-hidden text-xl truncate whitespace-nowrap">{{ comment.name }}</span>
                </div>
                <p class="text-sm text-gray-400">{{ comment.email }}</p>
            </div>
        </div>
        <p class="-mt-4 text-gray-500">{{ comment.body }}</p>
    </div>
</template>
<script setup>
const props = defineProps({
    comment: {
        type: Object,
        required: true
    }
})

</script>