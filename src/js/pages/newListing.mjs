import { createListings } from "../noroff-api-helper.mjs";

const publishPost = document.getElementById("publishPost");
const postTitle = document.getElementById("postTitle");
const description = document.getElementById("postDescription");
const media = document.getElementById("postMedia");
const postDay = document.getElementById("postDay");
const postMonth = document.getElementById("postMonth");
const postYear = document.getElementById("postYear");

Date.prototype.addDays = function (d) {
  this.setDate(this.getDate() + d);
  return this;
};

publishPost.addEventListener("click", async function () {
  const title = postTitle.value;
  const bodyDescription = description.value;
  const mediaPost = media.value;

  const day = postDay.value;
  const month = postMonth.value;
  const year = postYear.value;
  var date = new Date().addDays(28);

  if (day && month && year) {
    date = new Date(year, month, day);
  }
  const jsonDate = date.toJSON();

  if (title.length > 0 && bodyDescription.length > 0) {
    const result = await createListings(
      title,
      bodyDescription,
      jsonDate,
      mediaPost
    );
    if (result.statusCode === 201) {
      window.location.href = "../../../index.html";
    }
  }
});
