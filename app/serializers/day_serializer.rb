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

class DaySerializer < ActiveModel::Serializer
  attributes :id, :date, :start_time, :end_time, :home_base

  has_many :destinations
  # belongs_to :trip
end
