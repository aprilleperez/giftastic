var countries = ["Japan", "Philippines", "France", "America", "Iceland", "Thailand", "Korea"];


function displayCountryInfo() {

    var country = $(this).attr("data-name"); // store variable with the button's data name (i.e. the country)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=T2zA6FiBQ0cSHAnskqEfiHWMQ10eFtEV&limit=10&rating=g";
    console.log("first click: " + queryURL);
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
            // var gifOriginal = giphy[i].images.original_still.url;
            var gifStill = giphy[i].images.original_still.url;
            var gifAnimate = giphy[i].images.original.url;
            console.log(gifAnimate)
            var gifRating = giphy[i].rating;

            // create div to hold image and p tag for rating 
            var imgDiv = $("<div>");
            var gifImage = $("<img>");
            var p = $("<p>").text("Rating: " + gifRating);

            gifImage.attr("src", gifStill);
            gifImage.attr("data-still", gifStill);
            gifImage.attr("data-animate", gifAnimate);
            gifImage.attr("data-state", "still");
            gifImage.attr("class", "country");

            // put those into created div
            imgDiv.append(p);
            imgDiv.append(gifImage)

            // prepend to container that displays the returned stuff
            $("#domGifs").prepend(imgDiv);
        };
        // on click to make switch
        $(".country").on("click", function () {
            console.log("second click: " + queryURL);
            // STEP TWO: make a variable named state and then store the image's data-state into it.
            // Use the .attr() method for this.
            // var state = $(this).data('state');
            // ============== FILL IN CODE HERE FOR STEP TWO =========================

            var state = $(this).attr("data-state"); // use the .attr method for this (clicked gif)

            // =============================================
            if (state === "still") {
                // STEP THREE: Check if the variable state is equal to 'still',
                // then update the src attribute of this image to it's data-animate value,
                // and update the data-state attribute to 'animate'.

                var animate = $(this).attr("data-animate");

                $(this).attr("src", animate);
                $(this).attr("data-state", "animate");
            } else {
                // If state is equal to 'animate', then update the src attribute of this
                // image to it's data-still value and update the data-state attribute to 'still'
                var still = $(this).attr("data-still");
                $(this).attr("src", still);
                $(this).attr("data-state", "still");
            }
        });
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
        button.addClass("countryButton");
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
$(document).on("click", ".countryButton", displayCountryInfo);

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

//     $(document).on("click", ".topicButtons", callGiphy())







// var searchForm = "japan";
// var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchForm + "&api_key=T2zA6FiBQ0cSHAnskqEfiHWMQ10eFtEV&limit=10&rating=g";


// imgDiv.attr("src", gifStill);
// imgDiv.attr("class", "country");


// imgDiv.append(gifStill);
// p.append("Rating: " + gifRating);


// $("#domGifs").append(p);


      // ============== FILL IN CODE HERE FOR STEP THREE =========================

            // if (state === "still") {
            //     var animate = $(this).attr("data-animate");
            //     $(this).attr("src", animate);
            //     $(this).attr("data-state", "animate");
            // } else {
            //     var still = $(this).attr("data-still");
            //     $(this).attr("src", still);
            //     $(this).attr("data-state", "still");
            // }