require 'rails_helper'
require 'spec_helper'

describe Trip do
    
    before :each do
       @trip = Trip.new
    end

    describe "GET #index" do
        it "populates an array of trips" do
            trip = Factory(:trip)
            get :index
            assigns(:trips).should eq([trip])
        end
    
        it "shows all activities for signed in user" do
            get :index, {trip_id: @trip.trip_id}
            expect(response).to redirect_to trips_path
        end 
    end
    
  
  
    it "is valid with a name" do
        trip = Trip.new(name: 'Kelly')
        expect(trip).to be_valid
    end
    
    it "is invalid without a name" do
        trip = Trip.new(name: nil)
        trip.valid?
        expect(trip.errors[:name]).to include("can't be blank")
    end
    
    it "returns a new trip object" do
        @trip.should be_an_instance_of Trip
    end
    
    it "returns the correct name" do
        trip = Trip.new(name: 'Fall Vacation')
        expect(trip.name).to eq 'Fall Vacation'
    end
    
    it "returns the correct location" do
        trip = Trip.new(location: 'Japan')
        expect(trip.location).to eq 'Japan'
    end
    
    it "returns the correct start date" do
        trip = Trip.new(start_date: '2015-10-31')
        expect(trip.start_date).to eq Time.parse('2015-10-31')
    end
    
    it "returns the correct end date" do
        trip = Trip.new(end_date: '2015-11-05')
        expect(trip.end_date).to eq Time.parse('2015-11-05')
    end
    
end