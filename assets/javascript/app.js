$(document).ready(function () {


    var array = ["Jerry", "Costanza", "Elaine", "Kramer"];

    function renderButtons() {
        $('#buttonView').empty();
        $.each(array, function (index, value) {
            var addedButton = $('<button>')
                .addClass('search btn')
                .data('name', value)
                .html(value);
            $('#buttonView').append(addedButton);
        });
    }

    $('.btn').click(function() {
        alert('working');
    });

    $('.search').on('click', function() {
        console.log('working');
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
                console.log(response);
                $('#results').empty();
                var test = response.data;
                $.each(test, function (index, value) {

                    var $div = $('<div class="item">');
                    var rating = test[index].rating;

                    var p = $('<p>').text("Rating: " + rating).appendTo($div);
                    var displayImage = $('<img>')
                        .addClass('seinfeld')
                        .attr('src', test[index].images.fixed_height_still.url)
                        .data('still', test[index].images.fixed_height_still.url)
                        .data('animate', test[index].images.fixed_height.url)
                        .data('state', 'still')
                        .appendTo($div);
                    $div.appendTo('#results');
                })
            });
    });

    $('.seinfeld').on('click', function() {
        console.log('working');
        var $state = $(this).data('state');

        if ($state === 'still') {
            $(this).attr(src, $(this).data('animate'));
            $(this).data('state', 'aniamted');
        } else {
            $(this).attr(src, $(this).data('still'));
            $(this).data('state', 'still');
        }
    });

    $('#addGIF').on('click', function() {
        var textInput = $('#gif-input').val();
        if (textInput != "") {
            array.push(textInput);
            renderButtons();
        }
        $('#gif-input').val("");
        return false;
    });


    renderButtons();
});