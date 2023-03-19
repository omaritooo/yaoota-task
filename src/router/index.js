import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { storeToRefs } from "pinia";
import { usePostStore } from "../stores/posts";
import axios from "axios";
import { useUserStore } from "../stores/users";
import AboutView from "../views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      beforeEnter: (to, from, next) => {
        const postStore = usePostStore();
        const userStore = useUserStore();
        const { getPosts } = postStore;
        const { getUsers } = userStore;
        const data = getPosts();
        getUsers();
        next();
      },
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: `/post/:id`,
      name: "Post",
      props: true,
      beforeEnter: (to, from, next) => {
        const postStore = usePostStore();
        const usersStore = useUserStore();
        const { getUsers } = usersStore;
        const { users } = usersStore;
        const { getPost, getComments, post } = postStore;
        getComments(to.params.id);

        next();
      },
      beforeRouteUpdate(to, from) {
        getPost(to.params.id);
      },
      component: () => import("../views/PostView.vue"),
    },
  ],
});

export default router;
