import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("users", () => {
  const users = ref([]);
  const user = ref({});

  function getUsers() {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      if (res.status == 200) {
        users.value = res.data;
      } else return;
    });
  }
  function getUser(payload) {
    axios
      .get(`https://jsonplaceholder.typicode.com/user/${payload}`)
      .then((res) => {
        if (res.status == 200) {
          user.value = res.data;
        } else return;
      });
  }

  return { user, users, getUser, getUsers };
});
