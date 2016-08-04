$(document).ready(function () {

    // Initial array of names for the buttons
    var array = ["Jerry", "Costanza", "Elaine", "Kramer", "Newman", "Festivus"];

    //function to convert any button to proper title case
    function titleCase(str) {
        var test = str.split(' ');
        $.each(test, function(ind, value) {
          var string = test[ind];
            var upCase = string.charAt(0).toUpperCase();
            var restWord = string.slice(1,string.length).toLowerCase();
            test[ind]=upCase.concat(restWord);
        })
        str = test.join(' ');
        return str;
    }

    //function to print buttons to the screen
    function renderButtons() {
        $('#buttonView').empty();
        $.each(array, function (index, value) {
            var addedButton = $('<button>')
                .addClass('search btn')
                .data('name', value)
                .html(value)
                .on('click', displayGIF);
            $('#buttonView').append(addedButton);
        });
    }

    //print buttons to the screen initially
    renderButtons();

    //function to display the GIFs pulled from the GIPHY api
    function displayGIF() {

        var search = $(this).data('name');
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search",
            data: {
                limit: 15,
                api_key: "dc6zaTOxFJmzC",
                q: search + '+seinfeld'
            }, method: 'GET'
        })
            .done(function (response) {

                $('#results').empty();
                var test = response.data;
                $.each(test, function (index, value) {

                    var $div = $('<div class="item">');
                    var rating = test[index].rating;

                    var p = $('<p>')
                        .text("Rating: " + rating.toUpperCase())
                        .addClass('rating')
                        .appendTo($div);
                    var displayImage = $('<img>')
                        .addClass('seinfeld')
                        .attr('src', test[index].images.fixed_height_still.url)
                        .attr('data-still', test[index].images.fixed_height_still.url)
                        .attr('data-animate', test[index].images.fixed_height.url)
                        .attr('data-state', 'still')
                        .on('click', playGIF)
                        // .gifplayer();
                    displayImage.appendTo($div);
                    $div.appendTo('#results');
                })
            });
    }


    //plays or pauses the gif on click
    function playGIF() {

        var $state = $(this).data('state');

        if ($state === 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).data('state', 'aniamted');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).data('state', 'still');
        }
    }

    //adds new buttons when a user submits them
    $('#addGIF').on('click', function() {
        var textInput = $('#gif-input').val();
        var name = titleCase(textInput);
        if (textInput != "") {
            array.push(name);
            renderButtons();
        }
        $('#gif-input').val("");
        return false;
    });



});