# == Schema Information
#
# Table name: days
#
#  id         :integer          not null, primary key
#  date       :date
#  start      :time
#  end        :time
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class DayTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
