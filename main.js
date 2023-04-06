import "./style.css";
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
// <div>
// <a href="https://vitejs.dev" target="_blank">
// <img src="${viteLogo}" class="logo" alt="Vite logo" />
// </a>
// <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
// <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
// </a>
// <h1>Hello Vite!</h1>
// <div class="card">
// <button id="counter" type="button"></button>
// </div>
// <p class="read-the-docs">
// Click on the Vite logo to learn more
// </p>
// </div>
// `

// setupCounter(document.querySelector('#counter'))

const endpoint =
  "https://cors-anywhere.herokuapp.com/https://idme.s3.amazonaws.com/interview/data.json";

const randomColor = (n) => {
  const rgb = [0, 0, 0];
  for (let i = 0; i < 24; i++) {
    rgb[i % 3] <<= 1;
    rgb[i % 3] |= n & 0x01;
    n >>= 1;
  }
  return (
    "#" +
    rgb.reduce(
      (a, c) => (c > 0x0f ? c.toString(16) : "0" + c.toString(16)) + a,
      ""
    )
  );
};

const transformDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(date));
};

const optionsIcon = `<svg id="Layer_1" width="16" height="16" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.96 122.88"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>3-vertical-dots</title><path class="cls-1" d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"/></svg>`;

const transformPrice = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    currencyDisplay: "symbol",
  }).format(value);
};

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    const historyBody = document.querySelector(".purchase-history-body");

    data.forEach((item, index) => {
      const row = document.createElement("div");
      const someColor = randomColor(index);
      console.log(someColor);
      row.classList.add("purchase-history-row", "body");
      row.innerHTML = `
        <div class="purchase-history-col name">${item.name}</div>
        <div class="purchase-history-col location"><img alt="location visual" src="${
          item.location
        }" /></div>
        <div class="purchase-history-col date">${transformDate(
          item.purchaseDate
        )}</div>
        <div class="purchase-history-col category"><span style="border-color: ${someColor}; color: ${someColor}; ">${
        item.category
      }</span></div>
        <div class="purchase-history-col description">${item.description}</div>
        <div class="purchase-history-col price"><span class="amount">${transformPrice(
          item.price
        )}</span><span class="options-icon">${optionsIcon}</span></div>
      `;
      historyBody.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
