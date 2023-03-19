<script setup>

import { ref, watch, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { usePostStore } from '../../stores/posts';
import BasePagination from '../Base/BasePagination.vue';
import PostLoader from './PostLoader.vue';
const Post = defineAsyncComponent({
    loader: () => import('./Index.vue'),
    loadingComponent: PostLoader,
    delay: 1000,
    timeout: 3000,
})
const store = usePostStore()
const page = ref(1);
const paginationToggle = ref(true)
const { posts, totalPages, filterToggle, searchTarget } = storeToRefs(store)
const { getPosts, searchPosts } = store
watch(page, (val) => {
    if (!filterToggle.value) {
        getPosts(val)
    }
    else {
        searchPosts(searchTarget.value, val, 10)
    }
})




</script>


<template>
    <section class="flex flex-col w-full h-full py-4 overflow-y-auto text-black gap-y-5 ">
        <Post @filter="filter" v-for="post in posts" :key="post.id" :post="post" />
        <BasePagination :length="totalPages" v-model="page" />
    </section>
</template>

