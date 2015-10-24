# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'ffaker'

trip1 = Trip.create({
  location: FFaker::AddressUK.city,
  name: FFaker::Conference.name,
  start_date: "March 1, 2015",
  end_date: "March 7, 2015"
})

5.times do
  User.new.tap do |user|
    user.name = FFaker::Name.name
    user.email = FFaker::Internet.email
    user.password =  "password"
    user.password_confirmation = "password"
    user.trips << trip1
    # trip1.users << user
    user.save!
  end
end

User.create({
  name: 'Tuber',
  email: 'tuber@a.com',
  password: 'password',
  password_confirmation: 'password'
})


z = User.create({
  name: 'Zach',
  email: 'zstrenfel@gmail.com',
  password: 'password',
  password_confirmation: 'password'
})

z.trips << trip1


