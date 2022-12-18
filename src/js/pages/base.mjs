import { logOut, isLoggedIn } from "/src/js/noroff-api-helper.mjs";

const logOutElement = document.getElementById("logOut");
const listingsSearch = document.getElementById("listingsSearch");

function logOutEvent() {
  if (isLoggedIn()) {
    // Logging out
    console.log("click");
    logOut();
    window.location.href = "/index.html";
  } else {
    // Logging in
    window.location.href = "/src/html/login.html";
  }
}

if (!isLoggedIn()) {
  logOutElement.innerHTML = "Log in";
}

logOutElement.addEventListener("click", logOutEvent);
listingsSearch.addEventListener("submit", async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const entries = Object.fromEntries(formData.entries());
  const searchInput = entries.searchInput;
  console.log(searchInput);

  if (searchInput) {
    window.location.href = `/index.html?search=${searchInput}`;
  }
});
