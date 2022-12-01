import { postAuthLogin, isLoggedIn } from "/src/js/noroff-api-helper.mjs";

/**
 * Listen to Submit form
 */
const loginForm = document.querySelector("#loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    console.log(formData);
    const profile = Object.fromEntries(formData.entries());

    const email = profile["email"];
    const password = profile["password"];

    if (email && password) {
      const result = await postAuthLogin(email, password);
      if (result.statusCode === 200) {
        console.log(result.json);
        console.log("Success! User has been logged in.");
        window.location.href = "/src/html/index.html";
        return;
      }
      if (result.statusCode === 401) {
        console.log("Incorrect email or password");
        return;
      }
    }
    console.error("Something went wrong");
  });
}
