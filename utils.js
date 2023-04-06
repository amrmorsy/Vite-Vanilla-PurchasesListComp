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

export { randomColor, transformDate, transformPrice };
