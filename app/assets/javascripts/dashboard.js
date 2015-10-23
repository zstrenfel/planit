var Dashboard = (function() {
    var yelpUrl = "https://api.yelp.com";

    // Send search request to Yelp API.
    var makeSearchRequest = function(url, onSuccess, onFailure) {
        $.ajax({
            type: "GET",
            url: yelpUrl + url,
            term: term,
            location: location,
            limit: 10,
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
        $("search-results-header").append("Best " + term " near " + location);
    };

    // Activate search button.
    var attachSearchHandler = function(e) {
        var onSuccess = function(data) {
            data.businesses.each(function(biz) {
                insertResult(biz);
            });
        };
        var onFailure = function() {

        };
        makeSearchRequest(yelpUrl + "/v2/search?term=" + term + "&location=" + location,
                          onSuccess, onFailure);
    };

    // Handle Yelp response (display search result).
    var insertResult = function(biz) {
        newResult = $(resultTemplate);
        newResult.find(".result-name").text(biz.name);
        newResult.find(".result-address").text(biz.location.address);
        destData = { "name": biz.name, "address": biz.location.address };
        initAddButton(destData);
    };

    // Initialize add button with destination data and attach click handler
    var initAddButton = function(destData) {
        var attachAddButtonHandler = function(e) {
        // The handler for the Post button in the form
        addButton.on('click', function (e) {
            e.preventDefault (); // Tell the browser to skip its default click action
            var dest = {}; // Prepare the dest object to send to the server
            dest.name = destData["name"];
            dest.address = destData["address"];
         
            // collect the rest of the data for the dest
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
            url = "/api/destinations"
            makePostRequest(url, dest, onSuccess, onFailure);
        });
    };
    };
    
    //Create a new Destination
    var makePostRequest = function(url, data, onSuccess, onFailure) {
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: onSuccess,
            error: onFailure
        });
    };
        
    //Insert Destination into table
    var insertDest = function(dest_obj) {
      // Find a <table> element with id="myTable":
      var table = document.getElementById("destTable");
      // Create an empty <tr> element and add it to the 1st position of the table:
      var row = table.insertRow(1);
      // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
      var id_cell = row.insertCell(0);
      var name_cell = row.insertCell(1);
      var address_cell = row.insertCell(2);
      // Add some text to the new cells:
      id_cell.innerHTML = dest_obj.id;
      name_cell.innerHTML = dest_obj.name;
      address_cell.innerHTML = dest_obj.address;
    };
    
    // Initialize search term and location.
    // Activate search button.
    // Handle requests to Yelp.
    // Handle responses from Yelp.
    var start = function() {
        term = $(".search-term").html();
        location = $(".search-location").html();
        addButton = $(".add-button");
        del = $(".delete");
        resultTemplate = $(".search-results-list .search-result").outerHTML;
        attachSearchHandler();
        initAddButton();
    };

    return {
        start: start
    };

})();