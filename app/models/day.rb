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
#  homebase   :string
#

class Day < ActiveRecord::Base
end
