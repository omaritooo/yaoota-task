<script setup>
import { useUserStore } from '../../stores/users';
import { ref, toRefs, defineEmits } from 'vue'
import { storeToRefs } from 'pinia';

const emits = defineEmits(['filter'])


const props = defineProps({
    post: {
        required: true,
        type: Object
    },
    detailed: {
        default: false,
        type: Boolean
    }
})
const store = useUserStore()
const user = ref({})
const { post } = toRefs(props)
const { users } = storeToRefs(store)


user.value = users.value[post.value.userId - 1]

</script>
<template>
    <section :id="`post-${post.id}`" class="flex flex-col w-full gap-y-5 ">
        <div class="py-4 text-black bg-white rounded shadow-lg ">
            <div class="flex justify-between p-4 sm:px-8">
                <div class="flex space-x-4">
                    <div class="flex-shrink-0 w-16 h-16 p-2 bg-gray-200 rounded-full"><svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-12 h-12">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg></div>
                    <div class="flex-1 py-2 space-y-3" v-if="user">
                        <div class="w-full text-sm font-semibold rounded sm:h-3 sm:text-lg"
                            @click="$emit('filter', post.userId)">{{
                                user.name
                            }}
                        </div>
                        <div @click="$emit('filter', post.userId)" class="w-5/6 rounded sm:h-3">@{{ user.username }}</div>
                    </div>
                </div>
                <div class="">

                </div>
            </div>
            <div class="p-4 space-y-2 sm:px-8 ">
                <div class="w-full h-full text-3xl font-bold rounded">{{ post.title }}</div>
                <p class="w-3/4 text-xl font-light rounded ">{{ post.body }}</p>
                <div v-if="detailed" class="flex flex-col mt-2 gap-y-1">
                    <h2>
                        More about the author:
                    </h2>
                    <span>
                        Website: {{ user.website }}
                    </span>
                    <span>
                        Email: {{ user.email }}
                    </span>
                </div>
                <router-link v-else class="flex mt-4 justify-items-end" :to="`/post/${post.id}`">
                    Read more...
                </router-link>
            </div>
        </div>

    </section>
</template>

