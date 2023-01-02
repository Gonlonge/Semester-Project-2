import { getListings } from "../noroff-api-helper.mjs";
import { getTimeLeft } from "../time-helper.mjs";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const searchQuery = params.get("search");
const content = document.querySelector(".apiContainer");
const searchInput = document.getElementById("searchInput");

if (searchQuery) {
  searchInput.value = searchQuery;
}

async function getListing() {
  try {
    let json = await getListings();

    if (searchQuery) {
      let searchElements = [];
      json.forEach((post) => {
        const title = post.title.toLowerCase();
        if (title.includes(searchQuery.toLowerCase())) {
          searchElements.push(post);
        } else if (post.seller.name.includes(searchQuery.toLowerCase())) {
          searchElements.push(post);
        }
      });
      json = searchElements;
    }

    json.forEach((post) => {
      const timeRemaining = getTimeLeft(post.endsAt, true);
      const bids = post.bids;
      const highestBid = `$${(bids[bids.length - 1] ?? 0).amount ?? 0}`;
      const img =
        post.media.length > 0
          ? `<img src="${post.media}" class="img-fluid" alt=" Image not found"/>`
          : "<div></div>";
      console.log(post);
      content.innerHTML += `
      <div class="shadow-sm p-3 col-xl-3 col-lg-4 col-md-6"><a   href="/src/html/advertisement.html?id=${
        post.id
      }" class="text-decoration-none">
        <div class="card border-white my-5">
          ${img}
          <div class="mt-1">
            <div><h2>${post.title}</h2></div>
              <span class="text-dark"><i class="fa-solid fa-user fa-1x me-2 my-1"></i>${
                post.seller.name
              }</span>
              <div class="d-flex align-items-center justify-content-between">
                <p class=" mb-0"><span class="text-dark">${highestBid} (${
        post._count.bids
      } ${post._count.bids === 1 ? "bid" : "bids"})</span></p>
                <div class="px-4 text-danger">${timeRemaining}</div> 
              </div>
            </div>
        </div>
      </div></a>`;
    });
  } catch (error) {}
}

getListing();
