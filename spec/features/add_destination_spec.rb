require 'rails_helper'

feature "Search" do
  before(:each) do
    visit '/'
    fill_in 'reg-name', :with => 'Capy'
    fill_in 'reg-email', :with => 'capy@example.com'
    fill_in 'reg-pw', :with => 'password'
    fill_in 'reg-pw-conf', :with => 'password'
    click_button 'Sign up'
    page.should have_content 'Logout'
  end

  it "manually adds a destination" do
    fill_in 'name-input', with: 'Dest'
    fill_in 'address-input', with: '123 Street Ave'
    click_button 'create-button'
    page.should have_css('td', :text => 'Dest')

    fill_in 'name-input', with: 'Dest2'
    fill_in 'address-input', with: '456 Street Ave'
    click_button 'create-button' 
    page.should have_css('td', :text => 'Dest') # previous dest should still exist
    page.should have_css('td', :text => 'Dest2')
    page.should have_css('td', :text => '456 Street Ave')
  end
end
