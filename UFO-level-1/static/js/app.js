// from data.js
var tableData = data;

// The dates on data;
var dataDates = tableData.map( (ufoReport) => ufoReport.datetime);

var  availableDates= dataDates.filter((x, i, a) => a.indexOf(x) == i)
//d3.select("#available-date").text(availableDates);
console.log(availableDates);
// YOUR CODE HERE!

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("form");

// Create event handlers for clicking the button or pressing the enter key
button.on("click", runEnter);
form.on("submit",runEnter);
var tbody = d3.select("tbody");

function showDates() {
    return " "
    <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
                <div class="card-header">Header</div>
                <div class="card-body">
                  <h4 class="card-title">Primary card title</h4>
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
}


// Create the function to run for both events
function runEnter() {
  console.log(d3.event.target);
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // Print the value to the console
  console.log(inputValue);

  // Set the span tag in the h1 element to the text
  // that was entered in the form


  tbody.html("");

  if (availableDates.includes(inputValue)) {
    filteredData = tableData.filter((ufoReport) => ufoReport.datetime === inputValue );
    console.log(filteredData);

    filteredData.forEach((ufoReport) => {
        var row = tbody.append("tr");
        Object.entries(ufoReport).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
  }
  else {

  }
  
};








