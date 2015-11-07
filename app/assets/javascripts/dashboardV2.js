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

    var makePutRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
            type: 'PUT',
            url: apiUrl + url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    }

    /**
    * HTTP DELETE request
    * @param  {function} onSuccess   callback method to execute upon request success (200 status)
    * @param  {function} onFailure   callback method to execute upon request failure (non-200 status)
    * @return {None}
    */
   var makeDeleteRequest = function(url, onSuccess, onFailure) {
       $.ajax({
           type: 'DELETE',
           url: apiUrl + url,
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
            console.log("succesfully updated dash " + JSON.stringify(data.trip));
            updateHeader(data.trip);
            resetTable();
            initializeMap();
            insertAllDest(data.trip);
            updateCalendarTime(data.trip);

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

    var onFailureGlobal = function(data) {
        console.log(data);
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
            dest.like_count = 0;

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


        $('#destTable').on('click', '.del', function(e){
            e.preventDefault ();

            var onSuccess = function(data) {
                if (!data.errors){
                    console.log(data);
                    console.log("DELETED!");
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
            id = this.id;
            url = "/api/destinations?id=" + id;
            console.log(url);
            makeDeleteRequest(url, onSuccess, onFailure);
        });



        $('#destTable').on('click', '.edit', function(e){
            e.preventDefault();
            $('.edit_form').removeClass('hide');
            $('.edit_form .submit-input').attr('id',this.id);
        });


        $('.edit_form').on('click', '.submit-input', function(e){
            e.preventDefault ();
            var date = $('.edit_form').find('.date-input').val();
            var time = $('.edit_form').find('.time-input').val();
            var duration = $('.edit_form').find('.duration-input').val();

            var dest = {};
            dest.date = date;
            dest.time = time;
            dest.duration = duration;

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
            var id = this.id;
            url = "/api/destinations/edit?id=" + id + '&emptrip_id=' + trip_id;
            console.log(url);
            makePutRequest(url, dest, onSuccess, onFailure);
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
      var edit_cell = row.insertCell(2);
      var delete_cell = row.insertCell(3);
      // var delete_cell = row.insertCell(2);

      var like_cell = row.insertCell(2);
      like_cell.innerHTML = '<button id="like-btn" type="button">Like</button>';
      //<%= link_to 'like', vote_path(@post), class: 'vote', remote: true, data: { type: :json } %>';
      var like_count_cell = row.insertCell(3);
      like_count_cell.innerHTML = dest.like_count;

      $('#like-btn').click(function() {
        dest.like_count += 1;
        like_count_cell.innerHTML=dest.like_count;
        console.log("sortTable");
        // sortTable();
      });

      /*var sortTable= function() {
        for (var i = 0, row; row = table.rows[i]; i++) {
          var j = i + 1;
          if i[3] > j[3] {
            return
          }*/

    // get the text of n-th <td> of <tr>
    /*var A = $(a).children('td').eq(n).text().toUpperCase();
    var B = $(b).children('td').eq(n).text().toUpperCase();
    if(A < B) {
     return -1*f;
    }
    if(A > B) {
     return 1*f;
    }
    return 0;
  });

  $.each(rows, function(index, row) {
    $('#mytable').children('tbody').append(row);
  });
}
var f_sl = 1; // flag to toggle the sorting order
var f_nm = 1; // flag to toggle the sorting order
$("#sl").click(function(){
    f_sl *= -1; // toggle the sorting order
    var n = $(this).prevAll().length;
    sortTable(f_sl,n);
});
$("#nm").click(function(){
    f_nm *= -1; // toggle the sorting order
    var n = $(this).prevAll().length;
    sortTable(f_nm,n);
});
      }*/



      // Add some text to the new cells:
      name_cell.innerHTML = dest.name;
      address_cell.innerHTML = dest.address;
      edit_cell.innerHTML = "<div class='edit' id='"+ dest.id + "'>Edit</div>";
      delete_cell.innerHTML = "<div class='del' id='"+ dest.id + "'>x</div>";

      row.setAttribute('data-dest-id',dest.id);
      // delete_cell.innerHTML = "<div class='del'>x</div>";
      addMarker(dest.address,map);
    };

    var insertAllDest = function(trip){
        var d = trip.destinations;
        for (i in d){
            insertDest(d[i]);
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
/** =========================End Friend Handlers ===================================== */

/** ========================= Add Map Handlers ==============================*/
    var attachCalendarHandlers = function() {
        //needs to add an ajax call to update the day on change
        $('.cal-dates').on('click', 'td', function() {
            //change color of selected
            //load data for that day
            //update calendar with that data
            $('.cal-container').find('.dest').remove();
            $('.cal-container').find('.dest-row:not(.keep)').remove();

            var id = $(this).data("date-id");
            makeGetRequest('/days/' + id, addCalDestinations, onFailureGlobal);
        })
    };

    var updateCalendarTime = function(data) {
        console.log('updatecaltime');
        var day = data.days;
        var times = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM",
                 "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];
        times.forEach(function(time_block) {
            $('.calendar-hours').append('<th> '+ time_block + '</th>');
            $('tr[data-row="0"]').append('<td>' + '<div class="half-cell">&nbsp;</div>' + '<div class="half-cell">&nbsp;</div>' +
                                         '</td>');
        });
        addCalDates(data.days);
    }

    var addCalDates = function(days) {
        console.log('addcaldates');
        var monthNames = [
                          "January", "February", "March",
                          "April", "May", "June", "July",
                          "August", "September", "October",
                          "November", "December"
                        ];
        days.forEach(function(day) {
            var date_split = day.date.split('-');
            var month = monthNames[date_split[1] - 1];
            var date = date_split[2];
            console.log(day);
            $('table.cal-dates').append('<td data-date-id="' + day.id + '">' + date + " " + month + '</td>');
        })
    }

    // var addCalendarRow = function(row=0) {
    //     var times = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM",
    //              "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];
    //     var $row = $('<tr></tr>').attr('data-row', row).addClass('dest-row');

    //     times.forEach(function(timeblock) {
    //          $row.append('<td>' + '<div class="half-cell">&nbsp;</div>' + '<div class="half-cell">&nbsp;</div>' +
    //                                      '</td>');
    //     })
    //      $('.cal-dests').append($row);
    //      return row;
    // }
    // var addDest = function(dest, row=0) {
    //     var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    //              12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    //     var colors = ['aqua', 'blueviolet', 'greenyellow', 'hotpink', 'black' ];
    //     var color_index = Math.floor(Math.random() * 5);
    //     var date = new Date(dest.time);
    //     var styles = {'left': date.getUTCHours() * 75 + 'px',
    //                   'width': dest.duration * 75 + 'px',
    //                    'top': 50 + (row * 60)+ 'px',
    //                    'background-color': colors[color_index] };
    //     var $dest_div = $('<div></div>').attr("data-dest-id", dest.id).attr("data-cal-row", row).addClass("dest").html(dest.name);
    //     var start = hours.indexOf(date.getUTCHours());
    //     var end = start + dest.duration + 1;
    //     var time_block = hours.slice(start, end);

    //     $dest_div.css(styles).attr("data-time-frame", time_block);
    //     $('.cal-container').prepend($dest_div);
    // };

    // var checkTimeConflicts = function(dest) {
    //     var date = new Date(dest.time); //create time object with destination time
    //     var prev_dests = $('.cal-container').find('.dest'); //find all existing destinations in the calendar

    //     //iterate through them looking for conflicts
    //     for(var i = 0; i < prev_dests.length; i++) {
    //         var times = $(prev_dests[i]).attr("data-time-frame");
    //         var curr_row = parseInt($(prev_dests[i]).attr("data-cal-row"));
    //         if (times.indexOf(date.getUTCHours()) > -1) {
    //             console.log('problem');
    //             // addCalendarRow(curr_row + 1);
    //             return curr_row + 1;
    //             // addDest(dest, curr_row + 1);
    //         } else {
    //             // addDest(dest, curr_row);
    //             return -1;
    //         }
    //     }
    // };

    // var addCalDestinations = function(data, row=0) {
    //     var dests = data.day.destinations;
    //     var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    //              12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    //     if (dests) {
    //         dests.forEach (function(dest) {
    //             var conflict = checkTimeConflicts(dest);
    //             if (conflict) {
    //                 addCalendarRow(conflict);
    //                 addDest(dest, conflict);
    //             } else {
    //                 addDest(dest, 0);
    //             }
    //         })
    //         console.log('destinations have arrived ');
    //     } else {
    //         console.log(JSON.stringify(day));
    //         console.log('no destinations to log');
    //     }
    // };



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

            var infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', (function(marker) {
            return function() {
                var content = address;
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
            })(marker));

        });
    }

/** =========================End Map Handlers ===================================== */

/** ========================= Add Search Handlers ==============================*/

    function initializeSearch(){
        submit1.on('click',  function(e){
            e.preventDefault();
            findPlaces();
        });

        $("#destList").on('click', ".add", function(e){
            e.preventDefault();

            // var name = submit.find('.name-input').val();
            // var address = submit.find('.address-input').val();
            var dest = {};
            // dest.name = "Empire State Building";
            // dest.address = "New York";

            dest.name = $('#'+this.id).data('destInfo')["name"];
            dest.address = $('#'+this.id).data('destInfo')["address"];

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
    }

    function findPlaces() {

        // prepare variables (filter)
        var type = document.getElementById('gmap_type').value;
        // var radius = document.getElementById('gmap_radius').value;
        var radius = 5000;
        var keyword = document.getElementById('gmap_keyword').value;

        var lat = document.getElementById('lat').value;
        var lng = document.getElementById('lng').value;
        var cur_location = new google.maps.LatLng(lat, lng);

        // prepare request to Places
        var request = {
            location: cur_location,
            radius: radius,
            types: [type]
        };
        if (keyword) {
            request.keyword = [keyword];
        }

        // send request
        // service = new google.maps.places.PlacesService(map);
        service = new google.maps.places.PlacesService($('#myDiv').get(0));
        // service.search(request, createMarkers);
        service.search(request, createList);
    }

    function createList(results, status){
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        $("#destList").find("tr:gt(0)").remove();
        var table = document.getElementById("destList");
        for (var i = 0; i < results.length; i++) {
            obj = results[i];
            var rating = ""
            if (obj.rating !== undefined){
                rating = obj.rating;
            }
            var id = obj.name.replace(/\s+/g, '');
            obj = results[i];
            var row = table.insertRow(1);
            row.insertCell(0).innerHTML = obj.name;
            row.insertCell(1).innerHTML = obj.vicinity;
            row.insertCell(2).innerHTML = rating;
            row.insertCell(3).innerHTML = '<div class="add" id="' + id + '">+</div>';
            $('#'+id).data('destInfo', { 'name': obj.name, 'address': obj.vicinity });
        }


    } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        alert('Sorry, nothing is found');
    }
}
/** ========================= End Add Friends Handlers ===================================== */

/** ========================= Calendar Handlers ===================================== */


/** =========================End Handlers ===================================== */


/** ==MAP== **/

    var start = function() {
        create = $(".create");
        submit = $(".submit");
        submit1 = $(".search-button");
        like = $(".like-btn");

        attachMenuHandler();
        attachLocationHandler();
        attachSubmitDestHandler();
        attachFriendHandler();
        attachCreateTripHandler();
        initializeSearch();
        attachCalendarHandlers();
    };

    return {
        start: start
    };
})();