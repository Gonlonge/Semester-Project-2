import { getProfileName } from "/src/js/noroff-api-helper.mjs";

const registerForm = document.querySelector("#profileName");
registerForm.innerHTML = getProfileName();
