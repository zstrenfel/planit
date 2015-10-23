var Dashboard = (function() {
    //variables set here
    var apiUrl = 'localhost:3000';

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
        //do something here
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
            $menu.animate("slide", { direction: "left" }, 1000);
        })
    };

    var attachLocationHandler = function(e) {
        $('li.location').on('click', function() {
            var url = '/trip/' + $(this).data('id');
            makeGetRequest(url, insertHeader, onSuccess, onFailure);
        })

        var onSuccess = function(data) {
            insertHeader(data);
        };
        var onFailure = function() {
            console.log("failure to get location information");
        }



    }

    //initiates everything how it should be
    var start = function() {
        console.log("starting");
        attachMenuHandler();
        attachLocationHandler();
    };

    return {
        start: start
    };
})()
