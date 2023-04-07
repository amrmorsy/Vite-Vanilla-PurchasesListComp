import "./style.css";
import optionsIcon from "/optionsIcon.svg";
import { randomColor, transformDate, transformPrice } from "./utils.js";

//cors is disabled at the serving endpoint, lets proxy the request to get around the cors access issue for now
const endpoint = `https://corsproxy.io/?${encodeURIComponent(
  "https://idme.s3.amazonaws.com/interview/data.json"
)}`;

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    const historyBody = document.querySelector(".purchase-history-body");

    data.forEach((item, index) => {
      const row = document.createElement("div");
      const { price, location, purchaseDate, category, name, description } =
        item;
      //generate a random color to set as a border for catageory tags to simlate the same behavior expressed in the mocks
      const someColor = randomColor(index);
      const priceFormatted = transformPrice(price);
      const dateFormatted = transformDate(purchaseDate);
      row.classList.add("purchase-history-row", "body");
      row.innerHTML = `
        <div class="purchase-history-col name"><span class="img-wrapper"><img alt="location visual" src="${location}" /></span> <span class="text">${name}</span><span class="amount">${priceFormatted}</span></div>
        <div class="purchase-history-col location"><img alt="location visual" src="${location}" /></div>
        <div class="purchase-history-col date">${dateFormatted}</div>
        <div class="purchase-history-col category"><span style="border-color: ${someColor}; color: ${someColor}; ">${category}</span></div>
        <div class="purchase-history-col description">${description}</div>
        <div class="purchase-history-col price"><span class="amount">${priceFormatted}</span><span class="options-icon"><img src="${optionsIcon}" alt="additional options" /></span></div>
        <div class="purchase-history-col purchaseDate"><span class="label">Purchase Date</span><span>${dateFormatted}</span></div>
      `;
      historyBody.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
