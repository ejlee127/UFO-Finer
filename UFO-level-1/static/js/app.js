// from data.js
var tableData = data;

// The dates on the provided data;
var datesOn = tableData.map( (ufoReport) => ufoReport.datetime)
        .filter((x, i, a) => a.indexOf(x) == i);

// Select the action tags and create event handlers
var button = d3.select("#filter-btn");
var form = d3.select("form");
button.on("click", showTable);
form.on("submit",showTable);

// The function to run for both events
function showTable() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");
  // and then clear the input element
  inputElement.property("value", "");

  // Select the tbody tag to enter data as a table
  var tbody = d3.select("tbody");

  // Clean up the previous results
  tbody.html("");
  d3.select("#available-dates").html("");

  // Show the table when the inputValue exits
  if (datesOn.includes(inputValue)) {

    // Filter the dates according to the input
    filteredData = tableData.filter((ufoReport) => ufoReport.datetime === inputValue );

    filteredData.forEach((ufoReport) => {
        var row = tbody.append("tr");
        Object.entries(ufoReport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
  }
  //Show the avilable dates when the iput does not exist in dataset
  else {
    showDates();
  }
  
};

function showDates() {

  var divAvailable = d3.select("#available-dates")
  var cardBody = divAvailable.append("div")
              .classed("card", true)
              .append("div")
              .classed("card-body", true)

  cardBody.append("h4")
              .classed("card-title", true)
              .text("Enter one of the following available dates:");

  cardBody.append("p")
              .classed("card-text", true)
              .text(datesOn.map( d => " "+d))
}