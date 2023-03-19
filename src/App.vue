<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useindexStore } from './stores';
const store = useindexStore()
const { setWidth } = store
const handleResize = () => {
  store.width = window.innerWidth
  setWidth();
}
window.addEventListener('resize', handleResize);


</script>

<template>
  <main class="bg-[#F4F6FF]">
    <RouterView />
  </main>
</template>

<style scoped></style>
