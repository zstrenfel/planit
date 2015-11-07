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

FactoryGirl.define do
  factory :day do |day|
    day.date { FFaker::Time.date }
    day.start_time { '00:09:00' }
    day.end_time { '00:20:00' }
    day.home_base {FFaker::Address.street_address}
  end
end
