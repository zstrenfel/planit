var Dashboard = (function() {
    //variables set here
    var apiUrl = 'http://localhost:3000';
    var trip_id;
    var create;

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
        var height = $('.invite-friends').height() + 70;
        var down = false;
        var $textarea = $('textarea[data-function="submit-friends"]');

        //update header with ajax return info
        updateHeader($target, trip);

        //watch invite friends for click
        $('a[data-function="invite-friends"]').on('click', function(e) {
            e.preventDefault();
            if (!down) {
                $('.invite-friends').animate({"top": '+=' + height}, 'slow','swing');
                $('.main-content').css('opacity', .5);
                down = true;
            }
        });

        //watch submit/invite button for click
        $('a.invite').on('click', function(e) {
            e.preventDefault();
            var text = $textarea.val();
            var emails;
            $('.invite-friends').animate({"top": '-=' + height}, 'slow','swing');
            $('.main-content').delay(500).css('opacity', 1);
            $textarea.val('');
            down = false;
            emails = text.replace(/\s+/g, '').split(',');

            var onSuccess = function(data) {
                updateHeader($target, data);
            }

            var onFailure = function() {
                console.log("error inviting friends");
            }

            makePostRequest('/trips/' + trip_id + '/invite/', {'emails': emails}, onSuccess, onFailure);
        })


        $('.close').on('click', function(e){
            e.preventDefault();
            $('.invite-friends').animate({"top": '-=' + height}, 'slow','swing');
            $('.main-content').delay(500).css('opacity', 1);
            $textarea.val('');
            down = false;
        })
    };

    var updateHeader = function($target, trip) {
        console.log('updating');
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
    }

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
            trip_id = $(this).data('id');
            makeGetRequest(url, onSuccess, onFailure);
        })

        var onSuccess = function(data) {
            insertHeader(data);
            console.log(data);
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


    /**
     * Add event handlers for submitting the create form.
     * @return {None}
     */
    var attachCreateDestHandler = function(e) {

        // The handler for the Post button in the form
        create.on('click', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action

          
            var dest = {}; // Prepare the smile object to send to the server
            dest.id = 4;
            dest.name = "Paris";
            dest.address = "121 Dream Lane, France";
            dest.trip_id = 1;

         
            // FINISH ME (Task 4): collect the rest of the data for the smile
            var onSuccess = function(data) {
                if (!data.errors){
                    console.log(data);
                    insertDest(data["destination"]);
                }else{
                    for (i in data.errors){ 
                        console.log(data.errors[i]); 
                    } 
                }
                // FINISH ME (Task 4): insert smile at the beginning of the smiles container
            };
            var onFailure = function(data) { 
                console.log("failure");

            };
            
            // FINISH ME (Task 4): make a POST request to create the smile, then 
            //            hide the form and show the 'Shared a smile...' button
            url = "/api/destinations"
            makePostRequest(url, dest, onSuccess, onFailure);

        });

    };

        /**
     * Insert dest into Itinerary List Table
     * @param  {Object}  dest       smile JSON
     * @param  {boolean} beginning   if true, insert smile at the beginning of the list of smiles
     * @return {None}
     */
    var insertDest = function(dest) {
      // Find a <table> element with id="myTable":
      var table = document.getElementById("destTable");

      // Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow(1);

      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var id_cell = row.insertCell(0);
      var name_cell = row.insertCell(1);
      var address_cell = row.insertCell(2);


      // Add some text to the new cells:
      id_cell.innerHTML = dest.id;
      name_cell.innerHTML = dest.name;
      address_cell.innerHTML = dest.address;
    };

    var insertAllDest = function(dests){
    	for (i in dests){
    		insertDest(dests[i]);
    	}
    };

    var loadDest = function(){

    	var onSuccess = function(data) {
                if (!data.errors){
                    console.log(data);
                    insertAllDest(data);
                }else{
                    for (i in data.errors){ 
                        console.log(data.errors[i]); 
                    } 
                }
                // FINISH ME (Task 4): insert smile at the beginning of the smiles container
            };
            var onFailure = function(data) { 
                console.log("failure");

            };


    	url = "/api/destinations"
        makeGetRequest(url, onSuccess, onFailure);
    };


    //initiates everything how it should be
    var start = function() {
        console.log("starting");


        attachMenuHandler();
        attachLocationHandler();
        attachCreateEditHandler();
        loadDest();
        create = $(".create");
        attachCreateDestHandler();

    };


    return {
        start: start
    };
})()