# == Schema Information
#
# Table name: days
#
#  id         :integer          not null, primary key
#  date       :date
#  start_time :time
#  end_time   :time
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  home_base  :string
#  trip_id    :integer
#

require 'test_helper'

class DayTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
