Dashboard = (function() {
    var trip_id;
    // var apiUrl = 'https://planit-169.herokuapp.com';
    var apiUrl = '';
    var trip_id;
    var create;
    var submit;



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

    /** One-stop shop to update the dashboard. This will make the request to get
      * TRIP object, and pass it to the necessary call on click. Please put any
      * functions that need to be called here.
      */
     var updateDash = function(data) {
        var url = '/trips/' + trip_id;
        var onSuccess = function(data) {
            console.log("succesfully updated dash");
            updateHeader(data.trip);
            resetTable();
            insertAllDest(data.trip);
        };

        var onFailure = function() {
            console.log("something went wrong");
        }

        //if the ajax call has already been made
        if (data) {
            onSuccess(data);
        } else {
            makeGetRequest(url, onSuccess, onFailure)
        }
    };

    var updateHeader = function(trip) {
        console.log('updating');
        // var trip = data.trip;
        var users = trip.users;
        var user_count = Object.keys(users).length;
        console.log(trip);
        $('h1[data-header="location"]').html(trip.location);
        $('aside[data-header="invited-dates"').html("invited: " + user_count + " dates: " + trip.start_date + " - " + trip.end_date);
        $('a[data-function="invite-friends"').removeClass('hidden');
        $('a[data-function="form-save"').removeClass('hidden');
        menu_close();
    }

    var toggleElement = function($that, offset, toggle) {
        var height = $that.height() + offset;
        if (toggle === "down") {
            $that.animate({"top": '+=' + height}, 'slow','swing');
            $('.main-content').css('opacity', .5);
        } else {
            $that.animate({"top": '-=' + height}, 'slow','swing');
            $('.main-content').css('opacity', 1);
        }
    }


/**
 * ========================Handlers go below here =====================
 * ====================================================================
 */

    var attachLocationHandler = function(e) {
        $('li.location').on('click', function() {
            trip_id = $(this).data('id');
            updateDash();
        })
    };

/** =======================Menu Handlers + Functions ========================= */

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

/** =========================End Menu Handler ============================= */

/** =========================Destination Handler + Functions ============== */
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
                    submit.find('.name-input').val('')
                    submit.find('.address-input').val('')
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
    
      var name_cell = row.insertCell(0);
      var address_cell = row.insertCell(1);

      // Add some text to the new cells:
      name_cell.innerHTML = dest.name;
      address_cell.innerHTML = dest.address;
      addMarker(dest.address,map);
    };

    var insertAllDest = function(trip){
        var d = trip.destinations;
        for (i in d){
            insertDest(d[i]);
            // addMarker(d[i]["address"],map);
        }
    };

    var resetTable = function() {
        $('#destTable tr').not('.table-initial').remove();
    }

/** =======================End of destinations handlers ======================= */

/** =======================Create Trip Handlers/Functions ===================== */
    var  attachCreateTripHandler= function(e) {
        var down = false;
        var trip ={};

        $('.create-trip').on('click', function() {
            if (!down) {
                toggleElement($('.create-edit-trip'), 70, "down");
                down = true;
            }
        })

        //close without saving clear form
        $('a[data-function ="create-trip-close"]').on('click', function(e) {
            e.preventDefault();
            toggleElement($('.create-edit-trip'), 70, "up");
            $('.trip-form').trigger("reset");
            down = false;
        })

        //save then save trip to db
        $('a[data-function ="save-trip"]').on('click', function(e) {
            e.preventDefault();
            toggleElement($('.create-edit-trip'), 70, "up");
            down = false;
            //getting trip fields
            trip.location = $('input[name="location').val();
            trip.name = $('input[name="name').val();
            trip.start_date = $('input[name="start-date').val();
            trip.end_date = $('input[name="end-date').val();


            var valid = validateTripForm(trip); //returns true or false

            var onSuccess = function(data) {
                trip_id = data.trip.id;
                updateDash();
            };

            var onFailure = function(data) {
                console.log("failed to create a new trip object");
            }

            if (valid) {
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
/** ========================= End Location Handlers ============================ */

/** ========================= Add Friends Handlers ==============================*/

    var attachFriendHandler = function(e) {
        var down = false;
        var $textarea = $('textarea[data-function="submit-friends"]');

        //watch invite friends for click
        $('a[data-function="invite-friends"]').on('click', function(e) {
            e.preventDefault();
            if (!down) {
                toggleElement($('.invite-friends'), 70, "down");
                down = true;
            }

        //watch submit/invite button for click
        $('a.invite').on('click', function(e) {
            e.preventDefault();
            var text = $textarea.val();
            var emails;
            toggleElement($('.invite-friends'), 70, "up");
            $textarea.val('');
            down = false;

            emails = text.replace(/\s+/g, '').split(',');
            var onSuccess = function(data) {
                updateDash(data);
            }
            var onFailure = function() {
                console.log("error inviting friends");
            }

            makePostRequest('/trips/' + trip_id + '/invite/', {'emails': emails}, onSuccess, onFailure);
        })
        $('.close').on('click', function(e){
            e.preventDefault();
            toggleElement($('.invite-friends'), 70, "up");
            $textarea.val('');
            down = false;
        })
        });
    }
/** =========================End Handlers ===================================== */

    var map;
    var infowindow = [];
    var bounds = []; 

    function initializeMap(){
        var myOptions = {
            zoom: 1,
            center: new google.maps.LatLng(0, 0),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("Map"), myOptions);
        bounds = new google.maps.LatLngBounds();
   
    }

    function addMarker(address, map){
        // calls Google API to convert address to latitudinal/longitudinal value 
        $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+address+'&sensor=false', null, function (data) {
            var p = data.results[0].geometry.location
            var latlng = new google.maps.LatLng(p.lat, p.lng);
            marker = new google.maps.Marker({
                position: latlng,
                map: map
            });
            bounds.extend(marker.position);
            map.fitBounds(bounds);
            // map.setZoom(8);

        });        

    }


/** ==MAP== **/

    var start = function() {
        create = $(".create");
        submit = $(".submit");

        initializeMap();
        attachMenuHandler();
        attachLocationHandler();
        attachSubmitDestHandler();
        attachFriendHandler();
        attachCreateTripHandler();
        //initializeMap();
    };

    return {
        start: start
    };
})();