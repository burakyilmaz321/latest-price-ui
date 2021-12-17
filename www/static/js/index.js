import { getFonAtDate, getFonLatest, getUsdAtDate, getUsdLatest } from "./service.js"
import { generateTable } from "./table.js";

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


const updateData = async (d) => {
  const fonLatest = await getFonLatest(d.fon).then(response => response.json());
  const fonAtDate = await getFonAtDate(d.fon, d.purchase_date).then(response => response.json());
  d.price = fonLatest;
  d.cost = fonAtDate;
  d.num_days = calculateNumDays(d.purchase_date);
  d.performance = calculatePerformance(fonLatest, fonAtDate);
  return d;
};


const app = async () => {
  let table = document.querySelector("table");
  let data = [
    {
      fon: "YAC",
      desc: "Bla Bla",
      purchase_date: "2021-12-07",
      cost: "",
      price: "",
      num_days: "",
      performance: "",
    },
    {
      fon: "YTD",
      desc: "Bla Bla",
      purchase_date: "2021-12-07",
      cost: "",
      price: "",
      num_days: "",
      performance: "",
    },
    {
      fon: "YAY",
      desc: "Bla Bla",
      purchase_date: "2021-12-07",
      cost: "",
      price: "",
      num_days: "",
      performance: "",
    },
    {
      fon: "YJH",
      desc: "Bla Bla",
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

  generateTable(table, data);
}

// On Load
document.addEventListener("DOMContentLoaded", app);
