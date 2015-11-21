# == Schema Information
#
# Table name: destinations
#
#  id         :integer          not null, primary key
#  name       :string
#  address    :string
#  start_time :time
#  date       :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  trip_id    :integer
#  day_id     :integer
#  duration   :integer
#  like_count :integer
#  end_time   :time
#

require 'test_helper'

class DestinationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
