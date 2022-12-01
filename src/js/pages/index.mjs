const API_BASE_URL = "https://nf-api.onrender.com";
const API_GET_LISTNING = "/api/v1/auction/listings";

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
    console.log(response);
    const json = await response.json();

    console.log("JSON RESPONSE:");
    console.log(json);
    for (let i = 0; i < json.length; i++) {
      console.log(json[i]);
      content.innerHTML += `
      <div class="col-xl-3 col-lg-4 col-md-6 mb-4 mt-5"><a href="advertisement.html?id=${json[i].id}" class="text-decoration-none">
        <div>
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
      </div></a>`;
    }
  } catch (error) {
    console.log(error);
  }
}
getListing(API_BASE_URL + API_GET_LISTNING);
