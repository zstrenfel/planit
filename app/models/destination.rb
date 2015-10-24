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
#  trip_id    :integer
#  day_id     :integer
#

class Destination < ActiveRecord::Base
	belongs_to :trips
end
