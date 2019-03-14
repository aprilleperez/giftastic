var countries = ["japan", "philippines", "america", "iceland", "thailand", "korea"];


// var searchForm = "japan";
// var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchForm + "&api_key=T2zA6FiBQ0cSHAnskqEfiHWMQ10eFtEV&limit=10&rating=g";

function displayCountryInfo() {

    var country = $(this).attr("data-name"); // store variable with the button's data name (i.e. the country)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=T2zA6FiBQ0cSHAnskqEfiHWMQ10eFtEV&limit=10&rating=g";
    $("#domGifs").empty(); // empties gif container every click of button

    // Creates AJAX call for the specific country button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // make var for to store returend data (whole object)
        var giphy = response.data;
        console.log(giphy);
        // loop through each indices 
        for (var i = 0; i < giphy.length; i++) {
            // make variable for each thing you want grab (still img, rating)
            var gifStill = giphy[i].images.original_still.url;
            var gifRating = giphy[i].rating;

            // create div to hold image and p tag for rating 
            var imgDiv = $("<img>");
            imgDiv.attr("src", gifStill);
            imgDiv.attr("class", "country");
            var p = $("<p>");

            // put those into created div
            imgDiv.append(gifStill);
            p.append("Rating: " + gifRating);

            // prepend to container that displays the returned stuff
            $("#domGifs").append(p);
            $("#domGifs").append(imgDiv);
        };
        // on click to make switch
    });
};


// Function to display buttons on load
function renderButtons() {

    // Deletes the countries prior to adding new countries (otherwise repeat buttons)
    $("#domGifButtons").empty();
    // Loops through the array of countries
    for (var i = 0; i < countries.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var button = $("<button>");
        button.addClass("btn btn-primary");
        button.addClass("country");
        button.attr("data-name", countries[i]);
        button.text(countries[i]);
        $("#domGifButtons").append(button);
    };
};
renderButtons();


// Function to add additional country button to app
$("#addButton").on("click", function (event) {
    event.preventDefault();
    var country = $("#searchForm").val().trim();
    countries.push(country);
    renderButtons();
});


// Adding click event listeners to all elements with a class of "country"
$(document).on("click", ".country", displayCountryInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();


$(".country").on("click", function () {

    // STEP TWO: make a variable named state and then store the image's data-state into it.
    // Use the .attr() method for this.
    var state = $(this).data('state');
    // ============== FILL IN CODE HERE FOR STEP TWO =========================

    var state = $(this).attr("data-state"); // use the .attr method for this (clicked gif)

    // =============================================
    if(state === 'still'){
    // STEP THREE: Check if the variable state is equal to 'still',
    // then update the src attribute of this image to it's data-animate value,
    // and update the data-state attribute to 'animate'.
  
      var animate = $(this).attr('data-animate');

      $(this).attr('src', animate);
      $(this).attr('data-state', 'animate');
    }else{
    // If state is equal to 'animate', then update the src attribute of this
    // image to it's data-still value and update the data-state attribute to 'still'
      var still = $(this).attr('data-still');
      $(this).attr('src', still);
      $(this).attr('data-state', 'still');
    }


    // ============== FILL IN CODE HERE FOR STEP THREE =========================

    if (state === "still") {
      var animate = $(this).attr("data-animate");
      $(this).attr("src", animate);
      $(this).attr("data-state", "animate");
    } else {
      var still = $(this).attr("data-still");
      $(this).attr("src", still);
      $(this).attr("data-state", "still");
    }
  });


























// OFFICE HOURS: START OF GIPHY PAGE

// Topic buttons (a few already to click on)
// - var topics = ["topic", "topic", etc]
// -on click, use function to append gifs to gif area

// Gif Area (empty on load)
// -div that will display the gif results (div id = domGifs)
// -need AJAX code to hit GIPHY API (always display/load static images)
// -append gif button's image results here
// -animations must start/stop on click of gif

// Search form and search button
// -on click, need a function to create a button
//     function createButton() {
//         $("<button>")
//         .text(topic)
//         .addClass("topicButton")
//     }

//     $(document).on("click", ".topicButtons", callGiphy())