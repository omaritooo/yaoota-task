import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const usePostStore = defineStore(
  "posts",
  () => {
    const posts = ref([]);
    const post = ref({});
    const comments = ref([]);
    const totalPosts = ref(100);
    const totalPages = ref(10);
    const filterToggle = ref(false);
    const searchTarget = ref("");
    const postLimit = ref(10);
    const numOfPosts = computed(() => posts.value.length);

    async function getPosts(page = 1, userId) {
      totalPages.value = totalPosts.value / postLimit.value;
      let url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${postLimit.value}`;
      if (userId) {
        url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_page=${page}&_limit=${postLimit.value}`;
      }
      return await axios.get(url).then((res) => {
        if (res.status == 200) {
          posts.value = res.data;
          totalPages.value = Math.ceil(res.data.length / postLimit.value);
        } else return;
      });
    }
    async function searchPosts(payload, page = 1) {
      if (page == 1) {
        axios
          .get(`https://jsonplaceholder.typicode.com/posts?q=${payload}`)
          .then((res) => {
            if (res.status == 200) {
              totalPages.value = Math.ceil(res.data.length / postLimit.value);
            } else return;
          });
      }
      axios
        .get(
          `https://jsonplaceholder.typicode.com/posts?q=${payload}&_page=${page}&_limit=${postLimit.value},`
        )
        .then((res) => {
          if (res.status == 200) {
            posts.value = res.data;
          } else return;
        });
    }
    async function getPost(payload) {
      await axios
        .get(`https://jsonplaceholder.typicode.com/posts/${payload}`)
        .then((res) => {
          if (res.status == 200) {
            post.value = res.data;
          } else return;
        });
    }
    async function getComments(payload) {
      await axios
        .get(`https://jsonplaceholder.typicode.com/comments?postId=${payload}`)
        .then((res) => {
          if (res.status == 200) {
            comments.value = res.data;
          } else return;
        });
    }
    async function postComment(postId, payload) {
      await axios.post(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        payload
      );
    }

    return {
      post,
      posts,
      getPost,
      getPosts,
      totalPages,
      totalPosts,
      searchPosts,
      numOfPosts,
      filterToggle,
      searchTarget,
      postLimit,
      comments,
      getComments,
      postComment,
    };
  },
  {
    presist: {
      enabled: true,
      paths: ["post"],
    },
  }
);
