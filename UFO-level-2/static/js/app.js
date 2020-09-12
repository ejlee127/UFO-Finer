// from data.js
var tableData = data;

// Select tbody
var tbody = d3.select("tbody");

// Select a 'select' tag with the class 'category' and create even handler
d3.select("#category").on("change", getCategory);

// From dropdown, get the 'category' input and call the functions
function getCategory() {

  // Clear the previous display
  tbody.html("");
  d3.select("#available-data").html("");

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#category");

  // Obtain the value of the dropdown menu and set the text parameters
  var category = dropdownMenu.property("value");
  switch(category) {
    case "datetime":
      filtertext = "Enter a date";
      placeholder = "1/11/2011";
      break;
    case "city":
      filtertext = "Enter a city";
      placeholder= "benton";
      break;
    case "state":
      filtertext = "Enter a state";
      placeholder= "ar";
      break;
    case "country":
      filtertext = "Enter a country";
      placeholder= "us";
      break;
    case "shape":
      filtertext = "Enter a shape";
      placeholder= "circle";
      break;
    default:
      console.log("Default happened");
  }

  // Show the instruction text according to the category selection
  d3.select("#filter-text").text(filtertext);
  d3.select("#filter-key").attr("placeholder", placeholder);

  // Select the event tags and create the event handers
  var button = d3.select("#filter-btn");
  var form = d3.select("form");
  button.on("click", function(){showTable(category)});
  form.on("submit", function(){showTable(category)});
}

// Create the function to show the filtered data
function showTable(category) {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Set the available unique values on datasets of the category;
  var dataOn = tableData.map( (ufoReport) => ufoReport[category])
        .filter((x, i, a) => a.indexOf(x) == i);
  
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#filter-key");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  // Clean up the previous results
  inputElement.property("value", "");
  tbody.html("");
  d3.select("#available-data").html("");

  // Show the table when the input value is available on dataset
  if (dataOn.includes(inputValue)) {
    // filter the data according to the input value
    filteredData = tableData.filter((ufoReport) => ufoReport[category] === inputValue );
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
    availableData(dataOn);
  }  
};

// When the input does not exist, show the available values
function availableData(dataOn) {

  var divAvailable = d3.select("#available-data")
  var cardBody = divAvailable.append("div")
              .classed("card", true)
              .append("div")
              .classed("card-body", true)

  cardBody.append("h4")
              .classed("card-title", true)
              .text("Enter one of the following values:");

  cardBody.append("p")
              .classed("card-text", true)
              .text(dataOn.map( d => " "+d))
}