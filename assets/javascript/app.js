$(document).ready(function () {


    $(".search").on('click', function () {
        var search = $(this).data('query');
        $.ajax({
            url: "http://api.giphy.com/v1/gifs/search",
            data: {
                limit: 21,
                api_key: "dc6zaTOxFJmzC",
                q: search
            }, method: 'GET'
        })
            .done(function (response) {
                $('#results').empty();
                $.each(response.data, function (key, gif) {
                    $('#results').append('<iframe src ="' + gif.embed_url + '",/>');
                })
            });
    });

});