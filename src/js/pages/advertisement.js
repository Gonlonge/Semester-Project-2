const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

const API_BASE_URL = "https://nf-api.onrender.com/";
const API_LISTINGS = `api/v1/auction/listings/${id}?_seller=true&_bids=true`;

console.log();

const media = document.querySelector(".media");
const specificTitle = document.querySelector(".specificTitle");
const sellerEmail = document.querySelector(".sellerEmail");
const timeEndsAt = document.querySelector(".timeEndsAt");
const currentBids = document.querySelector(".currentBids");
const description = document.querySelector(".description");

async function specificAdvertisement(API_LISTINGS) {
  try {
    const token = localStorage.getItem("accessToken");
    const getAllData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(API_LISTINGS, getAllData);
    console.log(response);
    const json = await response.json();
    console.log("JSON RESPONSE:");
    console.log(json);

    media.setAttribute("src", json.media);
    specificTitle.innerHTML += ` ${json.title}`;
    sellerEmail.innerHTML += ` ${json.seller.email}`;
    timeEndsAt.innerHTML += ` ${json.endsAt}`;
    timeEndsAt.innerHTML += ` ${json.endsAt}`;
    currentBids.innerHTML += ` ${json._count.bids}`;
    description.innerHTML += ` ${json.description}`;
  } catch (error) {
    console.log(error);
  }
}
specificAdvertisement(API_BASE_URL + API_LISTINGS);
