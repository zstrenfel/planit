# == Schema Information
#
# Table name: trips
#
#  id         :integer          not null, primary key
#  location   :string
#  name       :string
#  start_date :date
#  end_date   :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

require 'test_helper'

class TripTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
    test "should not save trip without name" do
    trip = Trip.new
    assert_not trip.save, "Saved the trip without a name"
  end
end
