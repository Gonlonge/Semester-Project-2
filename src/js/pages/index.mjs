import { logOut, isLoggedIn } from "/src/js/noroff-api-helper.mjs";

const API_BASE_URL = "https://nf-api.onrender.com";
const API_GET_LISTNING = "/api/v1/auction/listings?sort=created&sortOrder=desc";

const content = document.querySelector(".apiContainer");

async function getListing(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getAllData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getAllData);
    const json = await response.json();

    for (let i = 0; i < json.length; i++) {
      console.log(json[i]);
      content.innerHTML += `
      <div class="shadow-sm  p-3 col-xl-3 col-lg-4 col-md-6 mb-4 mt-5"><a href="/src/html/advertisement.html?id=${json[i].id}" class="text-decoration-none">
        <div class="card border-white my-5">
          <img src="${json[i].media}" class="img-fluid"/>
          <div class="mt-1">
            <div><h2>${json[i].title}</h2></div>
              <span class="text-dark"><i class="fa-solid fa-user fa-1x me-2 my-1"></i>${json[i].id}</span>
              <div class="d-flex align-items-center justify-content-between">
                <p class=" mb-0"><span class="text-dark">Current: ${json[i]._count.bids}</span></p>
                <div class="px-4 text-danger">${json[i].endsAt}</div> 
              </div>
            </div>
        </div>
      </div></a>
      `;
    }
  } catch (error) {
    console.log(error);
  }
}
const logOutElement = document.getElementById("logOut");
logOutElement.addEventListener("click", logOutEvent);

function logOutEvent() {
  if (isLoggedIn()) {
    //logging out
    console.log("click");
    logOut();
    window.location.href = "/index.html";
  } else {
    //logging in
    window.location.href = "/src/html/login.html";
  }
}

if (!isLoggedIn()) {
  logOutElement.innerHTML = "Log in";
}

getListing(API_BASE_URL + API_GET_LISTNING);
