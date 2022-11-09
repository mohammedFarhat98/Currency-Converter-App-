const droplist = document.querySelectorAll(".drop-list select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  getButton = document.querySelector("form button");

for (let index = 0; index < droplist.length; index++) {
  for (currency_list in country_list) {
    let selected;
    if (index == 0) {
      selected = currency_list == "USD" ? "selected" : "";
    } else if (index == 1) {
      selected = currency_list == "ILS" ? "selected" : "";
      
    }

    let optionTag = `<option value="${currency_list}"${selected}>${currency_list}</option>`;
    droplist[index].insertAdjacentHTML("beforeend", optionTag);
  }
  droplist[index].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}
function loadFlag(element) {
  for (list in country_list) {
    if (list == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://countryflagsapi.com/png/${country_list[list]}`;
    }
  }
}
window.addEventListener("load", () => {
  getExchangeRate();
});
getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
});
const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
function getExchangeRate() {
  const amount = document.querySelector(".amount input"),
    exchangeRateTxt = document.querySelector(".exchange-rate");

  let amountValue = amount.value;
  if (amountValue == "" || amountValue == "0") {
    amount.value = "1";
    amountValue = 1;
  }
  exchangeRateTxt.innerText = `Getting exchange rate...`;

  let url = `https://v6.exchangerate-api.com/v6/39a5141001e1199f6bd6d739/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountValue * exchangeRate).toFixed(2);

      exchangeRateTxt.innerText = `${amountValue}${fromCurrency.value}=${totalExchangeRate}${toCurrency.value}`;
    }).catch(()=>{
        exchangeRateTxt.innerText="Something went wrong"
    })
}
