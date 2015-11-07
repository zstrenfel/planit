# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  name                   :string
#  email                  :string           default(""), not null
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  trip_id                :integer
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#

require 'rails_helper'

describe User do
  it { expect have_and_belong_to_many(:trips) }
  it "has a valid factory" do
    expect(FactoryGirl.create(:user)).to be_valid
  end

  it "is invalid without name" do
    expect(FactoryGirl.build(:user, name: nil)).to_not be_valid
  end

  it "is invalid without a email" do
    expect(FactoryGirl.build(:user, email: nil)).to_not be_valid
  end

  it "is invalid without a password" do
    expect(FactoryGirl.build(:user, password: nil)).to_not be_valid
  end

end
