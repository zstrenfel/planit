require 'test_helper'

class TripTest < ActiveSupport::TestCase
  test "should not save trip without name" do
    trip = Trip.new
    assert_not trip.save, "Saved the trip without a name"
  end
end
