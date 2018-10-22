var topics = ["halloween", "jack-o-lanterns", "witches", "ghosts", "monsters"]

// Function for buttons
function renderButtons() {

    $("#buttons").empty();
    // Loops through the array of movies
    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("gifs");
        // Added a data-attribute
        a.attr("data-choices", topics[i]);
        // Provided the initial button text
        a.text(topics[i]);
        // Added the button to the buttons-view div
        $("#buttons").append(a);
    }
}
renderButtons()

$("button").on("click", function () {
    
    var choices = $(this).attr("data-choices");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        choices + "&api_key=SrVjxeVTjet5ETJi5XiXxSADyYPTZ4XH&limit=10&rating=pg";
        

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
    
            var results = response.data;
            console.log(results)
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                
                var rating = results[i].rating;
                
                var p = $("<p>").text("Rating: " + rating);

                var hallowImage = $("<img>");
                hallowImage.attr("src", results[i].images.fixed_height_still.url, results[i].images.fixed_height.url);


                gifDiv.prepend(p);
                gifDiv.append(hallowImage);

                $("#gifsDisplay").prepend(gifDiv);
            }
        });
});


$(".gif").on("click", function () {
    var state = $(this).attr("data-state");
    if (state === 'still') {
        $(this).attr("src", $(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
      }

      else {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
      }
    });