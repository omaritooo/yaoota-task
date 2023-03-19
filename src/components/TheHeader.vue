<template>
    <header class="flex justify-between align-middle h-fit gap-x-2">
        <BaseInput id="text-field" v-model="searchInput" />
        <select v-model="postsPerPage"
            class="w-32 h-10 my-auto text-black rounded-sm shadow-md placeholder:text-black focus:outline-none">
            <option value="" disabled hidden>Number of posts</option>
            <option selected value="10">
                10
            </option>
            <option value="20">
                20
            </option>
            <option value="50">
                50
            </option>
        </select>
    </header>
</template>
<script setup>
import { ref, watch } from 'vue';
import BaseInput from './Base/BaseInput.vue';
import { usePostStore } from '../stores/posts';
import { storeToRefs } from 'pinia';
const searchInput = ref('')
const postsPerPage = ref(10)
const store = usePostStore()
const { searchPosts, getPosts } = store
const { filterToggle, searchTarget, postLimit } = storeToRefs(store)

watch(searchInput, (val) => {

    if (val == '') {
        getPosts()
        filterToggle.value = false
    }
    else {
        searchPosts(val)
        filterToggle.value = true
    }
    searchTarget.value = val

});
watch(postsPerPage, (val) => {
    postLimit.value = parseInt(val)
    if (searchInput.value == '') {
        getPosts()
    }
    else {
        searchPosts(searchInput.value)
    }
})
</script>