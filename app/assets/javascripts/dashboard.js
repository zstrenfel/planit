var Dashboard = (function() {
    //variables set here
    var apiUrl = 'https://planit-169.herokuapp.com';
    apiUrl = '';
    var trip_id;
    var create;
    var submit;

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
        $('h1[data-header="location"]').html(trip.location);
        $('aside[data-header="invited-dates"').html("invited: " + user_count + " dates: " + trip.start_date + " - " + trip.end_date);
        $('a[data-function="invite-friends"').removeClass('hidden');
        $('a[data-function="form-save"').removeClass('hidden');
        menu_close();
    }

    //watches menu for open/close
    var attachMenuHandler = function(e) {
        var $menu = $('.menu-open');
        var width = $('.menu-base').outerWidth() + $menu.outerWidth();
        $('.trips').on('click', function(e) {
            e.preventDefault();
            if($menu.css('left') == width - 180 + 'px') {
                menu_close();
            } else {
                menu_open();
            }
        })
    };

    var menu_close = function() {
        var $menu = $('.menu-open');
        var width = $('.menu-base').outerWidth() + $menu.outerWidth();
        $menu.animate({"left": '-=' + width}, 'slow','swing');
    }

    var menu_open = function() {
        var $menu = $('.menu-open');
        var width = $('.menu-base').outerWidth() + $menu.outerWidth();
        $menu.animate({"left": '+=' + width}, 'slow','swing');
    }

    var attachLocationHandler = function(e) {
        $('li.location').on('click', function() {
            var url = '/trips/' + $(this).data('id');
            trip_id = $(this).data('id');
            makeGetRequest(url, onSuccess, onFailure);
        })

        var onSuccess = function(data) {
            insertHeader(data);
            loadDest(data.trip.destinations);
            console.log("trip id " + trip_id);
            console.log(data);
        };
        var onFailure = function() {
            console.log("failure to get location information");
        }
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

    var attachSubmitDestHandler = function(e) {
        submit.on('click', '.submit-input', function(e){
            e.preventDefault ();
            var name = submit.find('.name-input').val();
            var address = submit.find('.address-input').val();
            var dest = {};
            dest.name = name;
            dest.address = address;
            dest.trip_id = 1;

          	var onSuccess = function(data) {
                if (!data.errors){
                    console.log(data);
                    insertDest(data["destination"]);
                }else{
                    for (i in data.errors){
                        console.log(data.errors[i]);
                    }
                }

            };
            var onFailure = function(data) {
                console.log("failure");

            };
            var that = this;
            url = "/api/destinations?trip_id=" + trip_id;
            console.log(url);
            makePostRequest(url, dest, onSuccess, onFailure);
        });
    };

        /**
     * Insert dest into Itinerary List Table
     * @param  {Object}  dest        JSON
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
      name_cell.innerHTML = dest.name;
      address_cell.innerHTML = dest.address;
      id_cell.innerHTML = dest.id;
    };

    var insertAllDest = function(dests){
    	d = dests["destinations"];
    	for (i in d){
    		insertDest(d[i]);
    	}
    };

    // var loadDest = function(){
    // 	var onSuccess = function(data) {
    //             if (!data.errors){
    //                 console.log(data);
    //                 insertAllDest(data);
    //             }else {
    //                 console.log(data.errors);
    //             }
    //             // FINISH ME (Task 4): insert smile at the beginning of the smiles container
    //         };
    //         var onFailure = function(data) {
    //             console.log("failure");
    //         };
    // 	url = "trips/" + trip_id + "/destinations";
    // 	console.log(url);
    //     makeGetRequest(url, onSuccess, onFailure);
    // };

    var  attachCreateTripHandler= function(e) {
        var down = false;
        var height = $('.create-edit-trip').height() + 70;
        var trip ={};
        $('.create-trip').on('click', function() {
            if (!down) {
                $('.create-edit-trip').animate({"top": '+=' + height}, 'slow','swing');
                $('.main-content').css('opacity', .5);
                down = true;
            }

        })
        $('a[data-function ="create-trip-close"]').on('click', function(e) {
            e.preventDefault();
            $('.create-edit-trip').animate({"top": '-=' + height}, 'slow','swing');
            $('.main-content').css('opacity', 1);
            down = false;
            $('.trip-form').trigger("reset");
        })
        $('a[data-function ="save-trip"]').on('click', function(e) {
            e.preventDefault();
            $('.create-edit-trip').animate({"top": '-=' + height}, 'slow','swing');
            $('.main-content').css('opacity', 1);
            down = false;
            //getting trip fields
            trip.location = $('input[name="location').val();
            trip.name = $('input[name="name').val();
            trip.start_date = $('input[name="start-date').val();
            trip.end_date = $('input[name="end-date').val();


            var valid = validateTripForm(trip); //returns true or false

            var onSuccess = function(data) {
                console.log('successful');
                console.log(data);
                trip_id = data.trip.id;
                updateHeader($('.trip-info'), data.trip)
            };

            var onFailure = function(data) {
                console.log("failed to create a new trip object");
            }

            if(valid) {
                //make ajax call
                console.log("valid");
                makePostRequest('/trips/', trip, onSuccess, onFailure);
                $('.trip-form').trigger("reset");
            } else {
                console.log("invalid trip")
                console.log(trip);
            }
        })
    }

    //need to validate
    var validateTripForm = function(trip) {
        return true;
    }


    //initiates everything how it should be
    var start = function() {
        console.log("starting");

        attachMenuHandler();
        attachLocationHandler();
        loadDest();
        create = $(".create");
        attachCreateTripHandler();
        submit = $(".submit");
        attachSubmitDestHandler();
    };


    return {
        start: start
    };
})()