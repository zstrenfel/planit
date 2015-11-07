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

class Trip < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :destinations
  has_many :days

end
