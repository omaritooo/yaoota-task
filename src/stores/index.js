import { defineStore } from "pinia";
import { ref } from "vue";
export const useindexStore = defineStore("index", () => {
  const width = ref(0);
  const isMobile = ref(false);

  const setWidth = () => {
    if (width.value <= 768) {
      isMobile.value = true;
    } else {
      isMobile.value = false;
    }
  };

  return { width, isMobile, setWidth };
});
