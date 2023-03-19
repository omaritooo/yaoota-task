<template>
    <main class="container px-2 py-4 text-black">
        <Post detailed v-if="post.id == route.params.id" :post="post" />
        <PostLoader v-if="post.id != route.params.id" />
        <CommentSection @comment="addComment" v-if="comments" :userId="post.userId" :comments="comments" />
    </main>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { usePostStore } from '../stores/posts.js'
import { useUserStore } from '../stores/users';
import { ref, defineAsyncComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import PostLoader from '../components/Post/PostLoader.vue';
import CommentSection from '../components/Comment/CommentSection.vue';



const Post = defineAsyncComponent({
    loader: () => import('../components/Post/Index.vue'),
    loadingComponent: PostLoader,
    delay: 2000,
    timeout: 3000,
})



const route = useRoute()
const postStore = usePostStore()
const { getComments, getPost, postComment } = postStore
const { post, comments } = storeToRefs(postStore)
const userStore = useUserStore()
const { getUsers } = userStore
const { users } = storeToRefs(userStore)
const user = ref(users.value[post.value.userId])

onMounted(() => {
    getPost(route.params.id)
    getUsers()
    getComments(route.params.id)
})

const addComment = (payload) => {
    postComment(route.params.id, payload)
}
</script>