require 'test_helper'

class TripsControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:trips)
  end
  
  test "should create trip" do
    assert_difference('Trip.count') do
    post :create, trip: {name: 'Some name'}
  end
 
  assert_redirected_to trip_path(assigns(:trip))
  end
  
  
end
