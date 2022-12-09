import { getProfileName } from "/src/jstest/noroff-api";

function makePost(post) {
  const isYourPost = post.author.name === getProfileName() ? "" : "hidden";
  const postDate = new Date(post.updated);

  const html = `<div class="postContainer">
<h1> HAHAHHAHAHAHAH </h1>
        </div>`;
  return html;
}

export { makePost };
