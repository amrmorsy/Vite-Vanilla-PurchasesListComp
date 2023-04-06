import "./style.css";
import optionsIcon from "/optionsIcon.svg";

//cors is disabled at the serving endpoint, lets proxy the request to get around the cors access issue for now
const endpoint =
  "https://cors-anywhere.herokuapp.com/https://idme.s3.amazonaws.com/interview/data.json";

//generates a random RGB color string every time its invoked
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

//expects a timestamp for a parameter and returns a formatted string in the form of "Month day, year"
const transformDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(date));
};

//expects a number for a parameter and returns a formatted US currency string
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
      //generate a random color to set as a border for catageory tags to simlate the same behavior expressed in the mocks
      const someColor = randomColor(index);
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
        )}</span><span class="options-icon"><img src="${optionsIcon}" alt="additional options" /></span></div>
      `;
      historyBody.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
