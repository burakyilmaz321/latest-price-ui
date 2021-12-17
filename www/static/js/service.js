/**
 * Makes an API call to the latest price service
 * @param {String} endpoint  - usd, eur, or fon
 * @param {String} query
 * @returns Promise
 */
const doApiCall = async (endpoint, query) => {
  const url = "https://latest-price-dttvzglrma-ey.a.run.app";
  const response = await fetch(`${url}/${endpoint}?${query || ""}`);
  return response;
};


/**
 * Get the latest USD/TRY currency exchange rate.
 * @returns Promise
 */
export const getUsdLatest = async () => await doApiCall("usd");


/**
 * Get the USD/TRY currency exchange rate at the given date.
 * @param {String} d Query date, format should be YYYY-MM-DD
 * @returns Promise
 */
export const getUsdAtDate = async (d) => await doApiCall("usd", `date=${d}`);


/**
 * Get the latest price of the given fund.
 * @param {String} f Three-letter code of the fund
 * @returns Promise
 */
export const getFonLatest = async (f) => await doApiCall("fon", `q=${f}`);


/**
 * Get the price of the given fund at the given date.
 * @param {String} f Three-letter code of the fund
 * @param {String} d Query date, format should be YYYY-MM-DD
 * @returns Promise
 */
export const getFonAtDate = async (f, d) => await doApiCall("fon", `q=${f}&date=${d}`);