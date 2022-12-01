import { getAuctionProfile } from "/src/js/noroff-api-helper.mjs";
import { load } from "/src/js/storage-helper.mjs";
const userKey = "noroff-user-key";

const API_AUCTION_PROFILES = "/api/v1/auction/profiles";
const API_BASE_URL = "https://nf-api.onrender.com";

const content = document.querySelector(".apiProfile");

async function getProfile() {
  try {
    const user = load(userKey);
    const json = await getAuctionProfile(user.name);
    content.innerHTML += profileHtml(json);
  } catch (error) {
    console.log(error);
  }
}

function profileHtml(user) {
  return ` 
  <div class="row">
  <div class="col-lg-4">
  <div class=" mb-4">
  <div class="card-body text-center">
  <img src="${user.avatar}"
  class="rounded-circle img-fluid shadow-lg" style="width: 150px;">
  <h2 class="mb-0">${user.name}</h2>
  <p class="mb-1">member since 2010</p>
  <i class="fa-solid fa-star mb-4"></i>
  <i class="fa-solid fa-star mb-4"></i>
  <i class="fa-solid fa-star mb-4"></i>
  <i class="fa-regular fa-star"></i>
  <i class="fa-regular fa-star"></i>
  <div class="d-flex justify-content-center mb-2">

  <button type="button" class="btn btn-outline-success  ms-1 shadow-lg  border rounded py-3 px-5 text-dark" data-bs-toggle="modal" data-bs-target="#profileModal">Edit</button>
  </div> 
  <section>
  <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="labelModal">
  <div class="modal-dialog modal-content">
  <div class="mt-2">
  <p id="labelModal">Edit Profil</p>
  </div>

  <div class="p-2">
  <img src="/images/150.png" alt="user"
  class="rounded-circle img-fluid shadow-lg" style="width: 155px;">
  <div class="mt-3">
  <input
  type="picture"
  class="form-control py-3"
  id="RegisterAvatar"
  placeholder="Profile picture"
  aria-label="image"
  required
  /></div>
  <button type="button" class="btn btn-outline-success shadow my-3">Save</button>
  </div>
  </div>
  </div></section>
  </div>
  </div>
  <div>
  <div class="card-body p-0">

  </div>
  </div>
  </div>
  <div class="col-lg-8 mt-4">
  <div class="mb-4">
  <div class="card-body">
    <div class="row">
      <div class="col-sm-3">
        <p class="mb-0">Full Name</p>
      </div>
      <div class="col-sm-9">
        <p class="text-muted mb-0">${user.name}</p>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-3">
        <p class="mb-0">Email</p>
      </div>
      <div class="col-sm-9">
        <p class="text-muted mb-0">${user.email}</p>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-3">
        <p class="mb-0">Credits</p>
      </div>
      <div class="col-sm-9">
        <p class="text-muted mb-0">${user.credits}</p>
      </div>
    </div>
    <hr>
  </div>
  </section>
  <div class="mt-5">
  <h2 class="mb-3">Your advertisements</h2>
  <div>
  <div class="row">
  <div class="col-sm">
  <img src="/images/150.png" alt="">
  </div>
  <div class="col-sm">
  <p class="mb-0"><span class="text-dark">Title</span></p>
  <div class="mb-0"><p class="small">Decription Lorem ipsum dolor</p></div>
  </div>
  <div class="col-sm">
  <p class="mb-0"><span class="text-dark">Current: $2104</span></p>
  <div class="text-danger"> <p class="small">Remaining: 1t 20m</p></div>
  </div>
  </div>
  </div>
  <hr>

  <div class="mt-4">
  <div class="row">
  <div class="col-sm">
  <img src="/images/150.png" alt="">
  </div>
  <div class="col-sm">
  <p class="mb-0"><span class="text-dark">Title</span></p>
  <div class="mb-0"><p class="small">Decription Lorem ipsum dolor</p></div>
  </div>
  <div class="col-sm">
  <p class="mb-0"><span class="text-dark">Current: $2104</span></p>
  <div class="text-danger"> <p class="small">Remaining: 1t 20m</p></div>
  </div>
  </div>
  </div>
  <hr>

  <div class="mt-4">
  <div class="row">
  <div class="col-sm">
  <img src="/images/150.png" alt="">
  </div>
  <div class="col-sm">
  <p class="mb-0"><span class="text-dark">Title</span></p>
  <div class="mb-0"><p class="small">Decription Lore
  </p></div>
  </div>
  <div class="col-sm">
  <p class="mb-0"><span class="text-dark">Current: $2104</span></p>
  <div class="text-danger"> <p class="small">Remaining: 1t 20m</p></div>
  </div>
  </div>
  </div>
  <hr>
  <div class=" mt-4">
  <div class="row">
  <div class="col-sm">
  <img src="/images/150.png" alt="">
  </div>
  <div class="col-sm">
  <p class="mb-0"><span class="text-dark">Title</span></p>
  <div class="mb-0"><p class="small">Decription Lorem ipsum dolor</p></div>
  </div>
  <div class="col-sm">
  <p class="mb-0"><span class="text-dark">Current: $2104</span></p>
  <div class="text-danger"> <p class="small">Remaining: 1t 20m</p></div>
  </div>
  </div>
  </div>
  <hr>
  </div>`;
}

getProfile();
