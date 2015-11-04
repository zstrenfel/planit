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

class TripSerializer < ActiveModel::Serializer
  attributes :id, :location, :name, :start_date, :end_date, :users, :destinations

end
