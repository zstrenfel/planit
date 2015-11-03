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

class Day < ActiveRecord::Base
  belongs_to :trip
  has_many :destinations

  validates :home_base, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
end
