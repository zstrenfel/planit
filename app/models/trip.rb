# == Schema Information
#
# Table name: trips
#
#  id         :integer          not null, primary key
#  location   :string
#  name       :string
#  start      :date
#  end        :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Trip < ActiveRecord::Base
end
