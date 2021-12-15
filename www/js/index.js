const doApiCall = async (endpoint, query) => {
  const url = "https://latest-price-dttvzglrma-ey.a.run.app";
  return await fetch(`${url}/${endpoint}?${query || ""}`);
};

const getLatestUsd = async () => await doApiCall("usd");
const getLatestFon = async (f) => await doApiCall("fon", `q=${f}`);

const getUsdAtDate = async (d) => await doApiCall("usd", `date=${d}`);
const getFonAtDate = async (f, d) => await doApiCall("fon", `q=${f}&date=${d}`);

const calculatePerformance = (l, f) => {
  return ((l - f) / f) * 100;
};

const calculateNumDays = (d) => {
  const today = new Date();
  const date = new Date(d);
  const diffInMs   = today - date
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays);
};

const date = document.getElementsByName("date")[0].textContent;
const price = document.getElementsByName("price")[0];
const cost = document.getElementsByName("cost")[0];
const performance = document.getElementsByName("performance")[0];
const numDays = document.getElementsByName("numDays")[0];


const initialize = async () => {
  const latestFon = await getLatestFon("YAC").then(response => response.json());
  const fonAtDate = await getFonAtDate("YAC", date).then(response => response.json());

  performance.textContent = calculatePerformance(latestFon, fonAtDate);
  price.textContent = latestFon;
  cost.textContent = fonAtDate;
  numDays.textContent = calculateNumDays(date);
}

// On Load
initialize();
