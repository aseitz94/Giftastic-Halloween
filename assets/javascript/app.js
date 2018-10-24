$(document).ready(function(){

var topics = ["halloween", "jack-o-lanterns", "witches", "ghosts", "monsters"]

// Function for buttons
function renderButtons() {

    $("#buttons").empty();
    // Loops through the array
    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        // Adds a class
        a.addClass("choices");
        // Added a data-attribute
        a.attr("data-choices", topics[i]);
        // Provided the initial button text
        a.text(topics[i]);
        // Added the button to the buttons-view div
        $("#buttons").append(a);
    }
}
renderButtons()

function generateGifs(){
    var choices = $(this).attr("data-choices");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        choices + "&api_key=SrVjxeVTjet5ETJi5XiXxSADyYPTZ4XH&limit=10&rating=pg";


    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {

            var results = response.data;
           
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var hallowImage = $("<img>");
                hallowImage.addClass("gif")
                hallowImage.attr("src", results[i].images.fixed_height_still.url);
                hallowImage.attr("data-state", "still")
                hallowImage.attr("data-still", results[i].images.fixed_height_still.url)
                hallowImage.attr("data-animate", results[i].images.fixed_height.url)
              
                gifDiv.prepend(p);
                gifDiv.append(hallowImage);

                $("#gifsDisplay").prepend(gifDiv);
            }

            $(".gif").on("click", function () {
            
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"))
                    $(this).attr("data-state", "animate")
                }
            
                else {
                    $(this).attr("src", $(this).attr("data-still"))
                    $(this).attr("data-state", "still")
                }
            });
        });
}

$("button").on("click", generateGifs())
//on click for new spooky themes
$("#add-gif").on("click", function(event){
    event.preventDefault();
    var newTheme = $("#gif-input").val().trim();
    topics.push(newTheme)

    renderButtons()
})
$(document).on("click", ".choices", generateGifs)


})