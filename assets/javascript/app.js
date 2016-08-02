$(document).ready(function () {


    var array = ["Jerry", "Costanza", "Elaine", "Kramer"];

    function renderButtons() {
        $('#buttonView').empty();
        $.each(array, function (index, value) {
            var addedButton = $('<button>')
                .addClass('search btn btn-primary')
                .attr('data-name', value)
                .html(value);
            $('#buttonView').append(addedButton);
        });
    }

    function displayGIF() {
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
                $('#results').empty();
                $.each(response.data, function (key, gif) {
                    var displayImage = $('<img>')
                    .addClass('image')
                        .attr('src', gif.images.original.url);
                    $('#results').append(displayImage);
                })
            });
    }

    $('#addGIF').on('click', function() {
        var textInput = $('#gif-input').val();
        if (textInput != "") {
            array.push(textInput);
            renderButtons();
        }
        $('#gif-input').val("");
        return false;
    })
    $(document).on('click', '.search', displayGIF);

    renderButtons();
});