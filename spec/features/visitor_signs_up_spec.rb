require 'rails_helper'

feature 'Visitor signs up' do

  it "registers new user" do
    visit '/'
    fill_in 'reg-name', :with => 'Capy'
    fill_in 'reg-email', :with => 'capy@example.com'
    fill_in 'reg-pw', :with => 'password'
    fill_in 'reg-pw-conf', :with => 'password'
    click_button 'Sign up'
    page.should have_content 'Logout'
  end
end
