<template>
  <div class="relative flex h-screen">
    <TheSidebar v-if="!isMobile" v-model="userId" :users="users" />
    {{ isMobile }}
    <div class="container flex flex-col px-4">
      <TheHeader />
      <PostContainer />
    </div>
  </div>
</template>
<script setup>

import { storeToRefs } from 'pinia';
import PostContainer from '../components/Post/PostContainer.vue';
import TheHeader from '../components/TheHeader.vue';
import TheSidebar from '../components/TheSidebar.vue';
import { useUserStore } from '../stores/users';
import { ref, watch } from 'vue'
import { usePostStore } from '../stores/posts';
import { useindexStore } from '../stores';
const usersStore = useUserStore()
const postsStore = usePostStore()
const { users } = storeToRefs(usersStore)
const { getPosts } = postsStore
const userId = ref(1)
const store = useindexStore()
const { isMobile } = storeToRefs(store)
watch(userId, (val) => {
  getPosts(1, val)
})


</script>
<style></style>
