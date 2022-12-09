import {
  deleteSocialPost,
  getSocialPost,
  isLoggedIn,
} from "/src/jstest/noroff-api.mjs";
import { makePost } from "/src/jstest/post-helper";

const container = document.getElementById("postsContainer");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

const result = await getSocialPost(id);

if (result.statusCode === 200) {
  const postHtml = makePost(result.json);
  container.innerHTML = postHtml;
}

// Delete post:
async function deletePost(id) {
  if (id) {
    const result = await deleteSocialPost(id);
    if (result.statusCode === 200) {
      window.location.href = "/home.html";
    }
  }
}
window.deletePost = deletePost;

// Edit post:
async function editPost(id) {
  if (id) {
    window.location.href = "/edit.html?id=" + id;
  }
}
window.editPost = editPost;
