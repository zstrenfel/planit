# == Schema Information
#
# Table name: destinations
#
#  id         :integer          not null, primary key
#  name       :string
#  address    :string
#  time       :time
#  date       :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class DestinationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
