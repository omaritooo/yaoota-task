import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  createComment,
  fetchPosts,
  fetchComments,
  fetchPost,
  fetchUsers,
} from "./requests.service";
import axios from "axios";

vi.mock("axios");
describe("Posts Service", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  describe("fetchPosts", () => {
    test("makes a GET request to fetch posts", async () => {
      const postMock = [{ id: 1 }, { id: 2 }];

      axios.get.mockResolvedValue({
        data: postMock,
      });

      const posts = await fetchPosts();

      expect(axios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts"
      );
      expect(posts).toStrictEqual(postMock);
    });
  });
});
describe("Single Post Service", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  describe("fetchPosts", () => {
    test("makes a GET request to fetch a specific post", async () => {
      const postMock = [{ id: 1 }];

      axios.get.mockResolvedValue({
        data: postMock,
      });

      const post = await fetchPost(1);

      expect(axios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/post?id=1"
      );
      expect(post).toStrictEqual(postMock);
    });
  });
});

describe("Users Service", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  describe("fetchUsers", () => {
    test("makes a GET request to fetch users", async () => {
      const usersMock = [{ id: 1 }, { id: 2 }];

      axios.get.mockResolvedValue({
        data: usersMock,
      });

      const users = await fetchUsers();

      expect(axios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/users"
      );
      expect(users).toStrictEqual(usersMock);
    });
  });
});
describe("Comments Service", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  describe("fetchComments", () => {
    test("makes a GET request to fetch comments", async () => {
      const commentsMock = [{ postId: 2 }];

      axios.get.mockResolvedValue({
        data: commentsMock,
      });

      const comment = await fetchComments(2);

      expect(axios.get).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/comments?postId=2"
      );
      expect(comment).toStrictEqual(commentsMock);
    });
  });
});
describe("Post Service", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  test("postComment", () => {
    test("makes a GET request to fetch comments", async () => {
      const commentsMock = [
        {
          name: "Test",
          email: "test@test.com",
          body: "lorem ipsmujlksadf",
        },
      ];
      axios.post.mockResolvedValue({
        data: commentsMock,
      });

      const comment = await createComment(1, commentsMock);

      expect(axios.post).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/posts/1/comments"
      );
      expect(comment).toStrictEqual(commentsMock);
    });
  });
});
