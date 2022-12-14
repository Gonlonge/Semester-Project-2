import {
  getAuctionProfile,
  updateProfileImage,
} from "/src/js/noroff-api-helper.mjs";
import { load, save } from "/src/js/storage-helper.mjs";

const userKey = "noroff-user-key";

const avatar = document.querySelector(".avatar");
const MainProfileName = document.querySelector(".MainProfileName");
const profileName = document.querySelector(".profileName");
const email = document.querySelector(".email");
const totalCredits = document.querySelector(".totalCredits");
const editProfileImage = document.getElementById("editProfileImage");
const saveProfileImage = document.getElementById("saveProfileImage");

async function getProfile() {
  try {
    const user = load(userKey);
    const json = await getAuctionProfile(user.name);
    console.log("JSON");
    console.log(json);
    profileHtml(json);
  } catch (error) {
    console.log(error);
  }
}

function profileHtml(user) {
  editProfileImage.setAttribute("value", user.avatar);
  avatar.setAttribute("src", user.avatar);
  MainProfileName.innerHTML += ` ${user.name}`;
  profileName.innerHTML += ` ${user.name}`;
  email.innerHTML += ` ${user.email}`;
  totalCredits.innerHTML += ` ${user.credits}`;
}

async function saveImage() {
  console.log("CLICK");
  const user = load(userKey);
  const res = await updateProfileImage(editProfileImage.value, user.name);
  save(res);
  avatar.setAttribute("src", res.avatar);
}
console.log(saveProfileImage);
saveProfileImage.addEventListener("click", saveImage);

getProfile();
