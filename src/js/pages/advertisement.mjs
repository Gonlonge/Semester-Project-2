import { placeBid } from "../noroff-api-helper.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const API_BASE_URL = "https://nf-api.onrender.com/";
const API_LISTINGS = `api/v1/auction/listings/${id}?_seller=true&_bids=true`;

const media = document.querySelector(".media");
const specificTitle = document.querySelector(".specificTitle");
const sellerEmail = document.querySelector(".sellerEmail");
const timeEndsAt = document.querySelector(".timeEndsAt");
const currentBids = document.querySelector(".currentBids");
const bidAmount = document.querySelector(".bidAmount");
const description = document.querySelector(".description");

const bidButton = document.getElementById("bidButton");
bidButton.addEventListener("click", async function () {
  console.log("Bidding!");

  const result = await placeBid(id, 11);
  console.log(result);
});

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
    const json = await response.json();

    const bids = json.bids;
    const highestBid = `$ ${(bids[bids.length - 1] ?? 0).amount ?? 0}`;
    console.log(bids);

    console.log(json.endsAt);
    const diff = new Date(
      new Date(json.endsAt).getTime() - new Date().getTime()
    );
    //var years = diff.getUTCFullYear() - 1970;
    //var months = diff.getUTCMonth();
    const days = diff.getUTCDate() - 1;
    const hours = diff.getUTCHours() - 1;
    const minutes = diff.getUTCMinutes() - 1;

    const remainingTime = `${days} days ${hours} hours and ${minutes} minutes`;

    media.setAttribute("src", json.media);
    specificTitle.innerHTML = json.title;
    sellerEmail.innerHTML = json.seller.email;
    timeEndsAt.innerHTML = remainingTime;
    bidAmount.innerHTML = highestBid;
    currentBids.innerHTML = json._count.bids;
    description.innerHTML = json.description;
  } catch (error) {
    console.log(error);
  }
}

specificAdvertisement(API_BASE_URL + API_LISTINGS);

$("input[type='number']").inputSpinner();
