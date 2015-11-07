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

require 'rails_helper'

describe Day do


  it { expect belong_to(:trip) }
  it { expect have_many(:destinations) }

  it "should have a valid factory" do
    expect(FactoryGirl.create(:day)).to be_valid
  end

  it "should have a start time" do
    expect(FactoryGirl.build(:day, start_time: nil)).to_not be_valid
  end
  it "should have an end time" do
    expect(FactoryGirl.build(:day, end_time: nil)).to_not be_valid
  end

  it "should have a home base" do
    expect(FactoryGirl.build(:day, home_base: nil)).to_not be_valid
  end

end
