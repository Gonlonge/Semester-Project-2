import { placeBid, getListing } from "../noroff-api-helper.mjs";
import { getTimeLeft } from "../time-helper.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const media = document.querySelector(".media");
const specificTitle = document.querySelector(".specificTitle");
const sellerEmail = document.querySelector(".sellerEmail");
const timeEndsAt = document.querySelector(".timeEndsAt");
const currentBids = document.querySelector(".currentBids");
const bidAmount = document.querySelector(".bidAmount");
const description = document.querySelector(".description");

const bidButton = document.getElementById("bidButton");
const bidButtonAmount = document.getElementById("bidButtonAmount");

bidButton.addEventListener("click", async function () {
  const amount = +(bidButtonAmount.value ?? 0);
  if (amount > 0) {
    const result = await placeBid(id, amount);
    console.log(result);
    location.reload();
  }
});

async function specificAdvertisement() {
  try {
    const json = await getListing(id);

    console.log("RES;");
    console.log(json);
    const bids = json.bids;
    const latestBid = bids[bids.length - 1];
    const highestBid = `$ ${(latestBid ?? 0).amount ?? 0}`;
    const bidderName = latestBid ? latestBid.bidderName : "";

    const remainingTime = getTimeLeft(json.endsAt);

    media.setAttribute("src", json.media);
    specificTitle.innerHTML = json.title;
    sellerEmail.innerHTML = json.seller.email;
    timeEndsAt.innerHTML = remainingTime;
    bidAmount.innerHTML = `${highestBid} – (bid by ${bidderName})`;
    currentBids.innerHTML = json._count.bids;
    description.innerHTML = json.description;
  } catch (error) {
    console.log(error);
  }
}

specificAdvertisement();
