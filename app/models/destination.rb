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

class Destination < ActiveRecord::Base
end
