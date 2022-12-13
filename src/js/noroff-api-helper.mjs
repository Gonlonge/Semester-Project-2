/**
 * Noroff API Helper
 */

import { load, save, remove } from "src/js/storage-helper.mjs";

const API_BASE_URL = "https://nf-api.onrender.com";
const API_AUTH_REGISTER = "/api/v1/auction/auth/register";
const API_AUTH_LOGIN = "/api/v1/auction/auth/login";
const API_AUCTION_PROFILE = "/api/v1/auction/profiles/";
const API_CREATE_POST = "/api/v1/auction/listings/";
// const API_flag = "/?_seller=true&_bids=true&sort=created&sortOrder=desc";

const userKey = "noroff-user-key";

const defaultHeaders = {
  "Content-Type": "application/json",
};

function getHeader() {
  const headers = defaultHeaders;
  const user = load(userKey);
  if (user) {
    console.log("TOKEN:");
    console.log(user.accessToken);
    headers["Authorization"] = `Bearer ${user.accessToken}`;
  }
  return headers;
}

/**
 * Safely stringify object
 * @param {obj} data – whatever data you want to stringify
 * @returns {string} – stringified data or null
 */
function stringify(data) {
  try {
    return JSON.stringify(data);
  } catch {
    console.log(error);
  }
  return null;
}

function isLoggedIn() {
  const res = load(userKey);
  console.log("load:");
  console.table(res);
  if (res) {
    const token = res["accessToken"];
    return token !== null;
  }
  return false;
}

function getProfileName() {
  const res = load(userKey);
  console.log("load:");
  console.table(res);
  if (res) {
    const name = res["name"];
    return name;
  }
  return null;
}

function logOut() {
  remove(userKey);
}

/**
 * Reusable Noroff POST
 * @param {string} url - url to sign in
 * @param {*} body – body to send with the request
 * @returns response object
 */
async function noroffPOST(url, body) {
  try {
    const data = stringify(body);
    if (!data) {
      return;
    }

    const request = {
      method: "POST",
      headers: getHeader(),
      body: data,
    };
    const apiResponse = await fetch(API_BASE_URL + url, request);
    console.log(apiResponse);
    return apiResponse;
  } catch (error) {
    console.log(error);
  }
  return null;
}

/**
 *
 * @param {string} username - username
 * @param {string} email - email
 * @param {string} password - password for signing in
 * @returns {obj} object with email, name, and email, or null if validation fails or successful http response
 */
async function postAuthRegister(username, email, password, profileImage) {
  if (!email || !username || !password) {
    return null;
  }
  if (
    typeof email === "string" ||
    typeof username === "string" ||
    typeof password === "string"
  ) {
    const body = {
      name: username,
      email: email,
      password: password,
      avatar: profileImage ?? "",
    };
    let apiResponse = await noroffPOST(API_AUTH_REGISTER, body);
    console.table(apiResponse);
    const json = await apiResponse.json();
    console.log(json);
    if (apiResponse.status === 201) {
      save(userKey, json);
    }

    return {
      json: json,
      statusCode: apiResponse.status,
    };
  }
  return null;
}

/**
 * Sign in to Noroff
 * @param {string} email
 * @param {string} password
 * @returns null if validation fails or successful http response
 */
async function postAuthLogin(email, password) {
  if (!email || !password) {
    return null;
  }
  if (typeof email === "string" && typeof password === "string") {
    const body = {
      email: email,
      password: password,
    };
    let apiResponse = await noroffPOST(API_AUTH_LOGIN, body);
    console.table(apiResponse);
    const json = await apiResponse.json();
    console.log(json);
    if (apiResponse.status === 200) {
      save(userKey, json);
    }

    const response = {
      json: json,
      statusCode: apiResponse.status,
    };
    return response;
  }
  return null;
}

//
async function noroffGET(url) {
  try {
    const request = {
      method: "GET",
      headers: getHeader(),
    };
    const apiResponse = await fetch(API_BASE_URL + url, request);
    console.table(apiResponse);
    return apiResponse;
  } catch (error) {
    console.log(error);
  }
  return null;
}

//
async function getAuctionProfile(name) {
  try {
    const request = {
      method: "GET",
      headers: getHeader(),
    };
    const apiResponse = await fetch(
      API_BASE_URL + API_AUCTION_PROFILE + (name ?? ""),
      request
    );
    console.table(apiResponse);
    const json = await apiResponse.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

// update avatar image

async function updateProfileImage(url, name) {
  try {
    const data = stringify({
      avatar: url,
    });
    if (!data) {
      return;
    }

    const request = {
      method: "PUT",
      headers: getHeader(),
      body: data,
    };
    const requestUrl = `${API_BASE_URL}${API_AUCTION_PROFILE}${name}/media`;
    console.log("Update Profile Image:");
    console.log(request);
    console.log(requestUrl);
    const apiResponse = await fetch(requestUrl, request);
    console.table(apiResponse);
    const json = await apiResponse.json();
    console.log("Response:");
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
}

// Create post

async function createListings(title, description) {
  if (!title || !body) {
    return null;
  }
  if (typeof title === "string" && typeof body === "string") {
    const postBody = {
      title: title,
      description: description,
    };
    let apiResponse = await noroffPOST(API_BASE_URL, API_CREATE_POST, postBody);
    const json = await apiResponse.json();
    return {
      json: json,
      statusCode: apiResponse.status,
    };
  }
  return null;
}

export {
  getAuctionProfile,
  postAuthLogin,
  postAuthRegister,
  isLoggedIn,
  getProfileName,
  noroffGET,
  logOut,
  updateProfileImage,
  createListings,
};
