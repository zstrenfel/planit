xdescribe("Search for destinations", function() {
  
  describe("Submit search", function() {
    
    it("calls findPlaces", function() {

    });

    it("lists relevant search results") {

    });

    it("adds a destination after I click +") {

    });

  });

});

xdescribe("Update dashboard - chain of events", function() {
  
  it("calls the appropriate methods", function() {
    // inside onSuccess
    expect(updateHeader).toHaveBeenCalledWith(data.trip);
    expect(resetTable).toHaveBeenCalled();
    expect(initializeMap).toHaveBeenCalled();
    expect(insertAllDest).toHaveBeenCalledWith(data.trip);
  });

});

xdescribe("Ajax requests", function() {
  
});

