var Dashboard = (function() {
    //variables set here
    var apiUrl = 'http://localhost:3000';

    //methods

    /**
    * HTTP GET request
    * @param  {string}   url       URL path, e.g. "/api/smiles"
    * @param  {function} onSuccess   callback method to execute upon request success (200 status)
    * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
    * @return {None}
    */
   var makeGetRequest = function(url, onSuccess, onFailure) {
       $.ajax({
           type: 'GET',
           url: apiUrl + url,
           dataType: "json",
           success: onSuccess,
           error: onFailure
       });
   };

     /**
     * HTTP POST request
     * @param  {string}   url       URL path, e.g. "/api/smiles"
     * @param  {Object}   data      JSON data to send in request body
     * @param  {function} onSuccess   callback method to execute upon request success (200 status)
     * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
     * @return {None}
     */
    var makePostRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
            type: 'POST',
            url: apiUrl + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };

    var insertHeader = function(data) {
        var $target = $('.trip-info');
        var trip = data.trip;
        var users = trip.users;
        var user_count = Object.keys(users).length;

        $target.html('').append(
            '<div class="half-col">' +
            '<h1>' + trip.location + '</h1>' +
            '<aside><b>invited: </b>' + user_count + '<b>&nbsp; &nbsp; &nbsp; dates: </b>' + trip.start_date + ' - ' + trip.end_date + '</aside>' +
            '<aside><a href="" data-function="invite-friends">' + 'Invite more friends' + '</a></aside>'+
            '</div>' +
            '<a href="" class="button">SAVE</a>'
        );

        $('a[data-function="invite-friends"]').on('click', function(e) {
            e.preventDefault();
            console.log('add friends');
        })
    };

    //watches menu for open/close
    var attachMenuHandler = function(e) {
        var $menu = $('.menu-open');
        var width = $('.menu-base').outerWidth() + $menu.outerWidth();
        $('.trips').on('click', function(e) {
            e.preventDefault();
            if($menu.css('left') == width - 180 + 'px') {
                $menu.animate({"left": '-=' + width}, 'slow','swing');
            } else {
                $menu.animate({"left": '+=' + width}, 'slow','swing');
            }
        })
    };

    var attachLocationHandler = function(e) {
        $('li.location').on('click', function() {
            var url = '/trips/' + $(this).data('id');
            makeGetRequest(url, onSuccess, onFailure);
        })

        var onSuccess = function(data) {
            insertHeader(data);
        };
        var onFailure = function() {
            console.log("failure to get location information");
        }
    };

    var attachCreateEditHandler = function() {
        $('.create-trip').on('click', function() {
            alert('create/edit here');
        })
    };

    //initiates everything how it should be
    var start = function() {
        console.log("starting");
        attachMenuHandler();
        attachLocationHandler();
        attachCreateEditHandler();
    };


    return {
        start: start
    };
})()
