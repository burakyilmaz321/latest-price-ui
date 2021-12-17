/** Create HTML table dynamically */

/**
 * Create a table body and add rows according to the data.
 * @param {HTMLTableElement} table 
 * @param {Array} data 
 */
export const generateTable = (table, data) => {
  let tbody = table.createTBody()
  for (let element of data) {
    let row = tbody.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
      cell.setAttribute("scope", "col");
      cell.setAttribute("name", key);
    };
  };
};