import { postAuthRegister, postAuthLogin } from "/src/js/noroff-api-helper.mjs";

// Registration:
const registerForm = document.querySelector("#registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    const email = profile["email"];
    const name = profile["name"];
    const password = profile["password"];
    const profileImage = profile["profileImage"];
    console.log(profileImage);

    if (email && name && password) {
      const result = await postAuthRegister(
        name,
        email,
        password,
        profileImage
      );
      if (result.statusCode === 201) {
        console.log(result.json);
        console.log("Success! User has been registered at Noroff.");
        const user = result.json;
        console.log(user);
        const res = await postAuthLogin(user.email, user.password);
        if (res.statusCode === 200) {
          console.log(res.json);
          console.log("Success! User has been logged in.");
          window.location.href = "/src/html/index.html";
          return;
        }
      }
      if (result.statusCode === 401) {
        console.log("Incorrect email, name and password");
        return;
      }
    }
    console.error("Something went wrong");
  });
}
