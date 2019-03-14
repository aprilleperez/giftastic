// APP CAN BE FOUND AT: https://aprilleperez.github.io/bootstrap-portfolio/portfolio.html

var countries = ["Japan", "Philippines", "France", "America", "Iceland", "Thailand", "Korea"]; // countries to be displayed on load


// Function to display selected country's related Gifs
function displayCountryGifs() {
    $("#magicBox").hide(); // hides the "Magic Box" text when gifs appear

    var country = $(this).attr("data-name"); // store variable with the button's data name (i.e. data-name=Japan -> country = Japan)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=T2zA6FiBQ0cSHAnskqEfiHWMQ10eFtEV&limit=10&rating=g"; // Giphy API with q country search, API key, and limit/rating params
    console.log("first click: " + queryURL);
    $("#domGifs").empty(); // empties gif container every click of country button

    $.ajax({ // Creates AJAX call for the specific country button being clicked
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var giphy = response.data; // var to store object data from query
        console.log(giphy);
        for (var i = 0; i < giphy.length; i++) {  // loop through each indices of object
            var gifStill = giphy[i].images.original_still.url; // grab still url and store in var
            var gifAnimate = giphy[i].images.original.url; // grab animated url and store in var
            var gifRating = giphy[i].rating; // grab rating value and store in var

            var imgDiv = $("<div>"); // create div to hold rating and gif
            var gifImage = $("<img>"); // create gif block
            var p = $("<p>").text("Rating: " + gifRating); // create p tag for DOM rating

            gifImage.attr("src", gifStill); // set src attr
            gifImage.attr("data-still", gifStill); // set data-still attr
            gifImage.attr("data-animate", gifAnimate); // set data-animate attr
            gifImage.attr("data-state", "still"); // set the data state to still
            gifImage.attr("class", "country"); // give class as country

            imgDiv.append(p); // add p tag to div
            imgDiv.append(gifImage) // add image block to div

            $("#domGifs").prepend(imgDiv); // prepend to DOM container that displays entire div
        };
       
        $(".country").on("click", function () {  // on click of gif image, make state switch
            console.log("second click: " + queryURL);

            var state = $(this).attr("data-state"); // var storing image's current state

            if (state === "still") { // if current state is set to still
                var animate = $(this).attr("data-animate"); // var storing image's data-animate URL
                $(this).attr("src", animate); // change image's src attr to its animate attr
                $(this).attr("data-state", "animate"); // change image's current state to animate

            } else { // else if current state is set to animate
                var still = $(this).attr("data-still"); // var storing image's data-still URL
                $(this).attr("src", still); // change image's src attr to its still attr
                $(this).attr("data-state", "still"); // change image's current state to still
            }
        });
    });
};


// Function to display buttons on load
function renderButtons() {
    $("#domGifButtons").empty(); // Deletes the countries prior to adding new countries (otherwise repeat buttons)
    
    for (var i = 0; i < countries.length; i++) { // Loops through the array of countries
        var button = $("<button>"); // create button tag
        button.addClass("btn btn-primary"); // add Bootstrap button classes 
        button.addClass("countryButton"); // add countryButton class for clicks
        button.attr("data-name", countries[i]); // give button data-name attr of country of that index
        button.text(countries[i]); // make the button text the country of that index
        $("#domGifButtons").append(button); // display buttons in HTML container
    };
};
renderButtons(); // call function


// Function to add additional country button to app from form
$("#addButton").on("click", function (event) { // 
    event.preventDefault(); // prevent from refreshing page
    var country = $("#searchForm").val().trim(); // var storing string value from form (trimmed)
    countries.push(country); // push that country to the country array
    renderButtons(); // call render function
});


// Adding click event listeners to all elements (buttons) with a class of "countryButton"
$(document).on("click", ".countryButton", displayCountryGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();






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
