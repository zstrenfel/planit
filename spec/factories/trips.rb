
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

FactoryGirl.define do
  factory :trip do |trip|
    trip.location { FFaker::AddressUK.city }
    trip.name { FFaker::Conference.name }
    trip.start_date "March 1, 2015"
    trip.end_date "March 7, 2015"
    # association :user
  end
end
