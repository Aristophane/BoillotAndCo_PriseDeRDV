function replacePlusWithEncodedPlus(inputString) {
  return inputString.replace(/\+/g, "%2B");
}

const fetchJobsBtn = document.getElementById("fetchJobs-btn");
const responseText = document.getElementById("result");
const inputPhoneTxt = document.getElementById("clientPhone");
const inputPostCodeTxt = document.getElementById("postcode");

fetchJobsBtn.addEventListener("click", async () => {
  let inputPhone = replacePlusWithEncodedPlus(inputPhoneTxt.value);
  let inputPostCode = inputPostCodeTxt.value;

  const response = await fetch(
    `/.netlify/functions/get-list-of-jobs-from-phone-and-postcode?phone=${inputPhone}&postCode=${inputPostCode}`
  ).then((response) => response.json());

  responseText.innerText = JSON.stringify(response);
});
