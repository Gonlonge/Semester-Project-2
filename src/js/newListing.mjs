import { createListings, noroffPOST } from "../noroff-api-helper.mjs";
import { makePost } from "../post-helper.mjs";

// Home:

// Navigate to single post
function openPost(id) {
  window.location.href = "/src/html/new-listing.html?id=" + id;
}
window.openPost = openPost;

// Publish post:
const publishPost = document.getElementById("publishPost");
const postTitle = document.getElementById("postTitle");
const description = document.getElementById("description");

publishPost.addEventListener("click", async function () {
  const title = postTitle.value;
  const bodyDescription = description.value;

  if (title.length > 0 && bodyDescription.length > 0) {
    const result = await createListings(title, bodyDescription);
    console.log("awaited and complete");
    console.table(result);
    if (result.statusCode === 200) {
      // Success
      console.log("success");
      currentFilter = null;
      currentSearch = null;
      refreshPosts();

      postTitle.value = "";
      description.value = "";
    }
  }
});
