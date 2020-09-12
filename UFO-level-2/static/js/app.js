// from data.js
var tableData = data;

// Data ;
var dataDates = tableData
                .map( (ufoReport) => ufoReport.datetime)
                .filter((x, i, a) => a.indexOf(x) == i);
var cities = tableData
                .map( (ufoReport) => ufoReport.city)
                .filter((x, i, a) => a.indexOf(x) == i);


var tbody = d3.select("tbody");

// Select a category
d3.select("#category").on("change", getCategory);

// This function is called when a dropdown menu item is selected
function getCategory() {

  // Clear the table section
  tbody.html("");

  // Select the form to enter a filter item
  var form = d3.select("form");

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#category");

  // Assign the value of the dropdown menu option to a variable
  var category = dropdownMenu.property("value");

  var filterText = d3.select("#filter-text");
  var filterInput = d3.select("#filter-key");

  // Date
  if (category === "datetime") {
    filterText.text("Enter a date");
    filterInput.attr("placeholder", "1/11/2011");
  }
  // City 
  if (category === "city") {
    filterText.text("Enter a city");
    filterInput.attr("placeholder", "benton");
  }
  // State 
  if (category === "state") {
    filterText.text("Enter a state");
    filterInput.attr("placeholder", "ar");
  }
  // Country
  if (category === "country") {
    filterText.text("Enter a country");
    filterInput.attr("placeholder", "us");
  }
  // Shape
  if (category === "shape") {
    filterText.text("Enter shape");
    filterInput.attr("placeholder", "circle");
  }

  availableData(category);

  // Select the button
  var button = d3.select("#filter-btn");

  // Create event handlers for clicking the button or pressing the enter key
  button.on("click", function(){showTable(category)});
  form.on("submit", function(){showTable(category)});
}


// Create the function to show the filtered data
function showTable(category) {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#filter-key");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  filteredData = tableData.filter((ufoReport) => ufoReport[category] === inputValue );
  
  tbody.html("");
 
  filteredData.forEach((ufoReport) => {
    var row = tbody.append("tr");
    Object.entries(ufoReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });  
};


function availableData(category) {

  if (category === "datetime") {
    cardheader = "Dates: ";
  }
  else if (category === "city") {
    cardheader = "Cities: ";
  }
  else if (category === "state") {
    cardheader = "States: ";
  }
  else if (category === "country") {
    cardheader = "Countries: ";
  }
  else if (category === "shape") {
    cardheader = "Shapes: ";
  }
  
  textdata = tableData
              .map( (ufoReport) => ufoReport[category])
              .filter((x, i, a) => a.indexOf(x) == i);

  var alertBox = d3.select(".alert");
  var header = alertBox.select("strong");

  header.text(cardheader);
  alertBox.text(textdata.forEach( function(t){return t+" "} ));
}






