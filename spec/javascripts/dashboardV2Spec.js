describe("Dashboard", function() {
  var player;
  var song;

  beforeEach(function() {
    dash = Dashboard;
  });

  it("calls initializeSearch which calls findPlaces", function() {
    dash.start();
    spyOn(dash, "initializeSearch");
    expect(dash.initializeSearch).toHaveBeenCalled();
  });

  // it("should be able to play a Song", function() {
  //   player.play(song);
  //   expect(player.currentlyPlayingSong).toEqual(song);

  //   //demonstrates use of custom matcher
  //   expect(player).toBePlaying(song);
  // });


});

// 

//     it("lists relevant search results") {

//     });

//     it("adds a destination after I click +") {

//     });

//   });

// });

// xdescribe("Insert destinations", function() {

// });

// xdescribe("Update dashboard - chain of events", function() {
  
//   it("calls the appropriate methods", function() {
//     // inside onSuccess
//     expect(updateHeader).toHaveBeenCalledWith(data.trip);
//     expect(resetTable).toHaveBeenCalled();
//     expect(initializeMap).toHaveBeenCalled();
//     expect(insertAllDest).toHaveBeenCalledWith(data.trip);
//   });

// });

// xdescribe("Ajax requests", function() {
  
// });

