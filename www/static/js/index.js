import { getFonAtDate, getFonLatest, getUsdAtDate, getUsdLatest } from "./service.js"
import { generateTable } from "./table.js";

const calculatePerformance = (l, f) => {
  return Math.round(((l - f) / f) * 10000) / 100;
};

const calculateNumDays = (d) => {
  const today = new Date();
  const date = new Date(d);
  const diffInMs   = today - date
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays);
};


const updateData = async (d) => {
  const fonLatest = await getFonLatest(d.fon).then(response => response.json());
  const fonAtDate = await getFonAtDate(d.fon, d.purchase_date).then(response => response.json());
  d.price = Math.round(fonLatest * 100) / 100;
  d.cost = Math.round(fonAtDate * 100) / 100;
  d.num_days = calculateNumDays(d.purchase_date);
  d.performance = calculatePerformance(fonLatest, fonAtDate);
  return d;
};


const app = async () => {
  let portfolioTable = document.getElementById("portfolio");
  let benchmarkTable = document.getElementById("benchmark");
  let data = [
    {
      fon: "YAC",
      purchase_date: "2021-12-07",
      cost: "",
      price: "",
      num_days: "",
      performance: "",
    },
    {
      fon: "YTD",
      purchase_date: "2021-12-07",
      cost: "",
      price: "",
      num_days: "",
      performance: "",
    },
    {
      fon: "YAY",
      purchase_date: "2021-12-07",
      cost: "",
      price: "",
      num_days: "",
      performance: "",
    },
    {
      fon: "YJH",
      purchase_date: "2021-12-07",
      cost: "",
      price: "",
      num_days: "",
      performance: "",
    },
  ]
  for (let element of data) {
    element = await updateData(element)
  };

  generateTable(portfolioTable, data);

  const usdLatest = await getUsdLatest().then(response => response.json());
  const usdAtDate = await getUsdAtDate("2021-12-07").then(response => response.json());
  benchmarkTable.cells[2].innerText = Math.round(usdAtDate * 100) / 100;
  benchmarkTable.cells[3].innerText = Math.round(usdLatest * 100) / 100;
  benchmarkTable.cells[4].innerText = calculateNumDays("2021-12-07");
  benchmarkTable.cells[5].innerText = calculatePerformance(usdLatest, usdAtDate);
}

// On Load
document.addEventListener("DOMContentLoaded", app);
