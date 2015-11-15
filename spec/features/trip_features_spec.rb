require 'rails_helper'

describe "New Trip" do
  before(:each) do
    # register
    visit '/'
    fill_in 'reg-name', :with => 'Capy'
    fill_in 'reg-email', :with => 'capy@example.com'
    fill_in 'reg-pw', :with => 'password'
    fill_in 'reg-pw-conf', :with => 'password'
    click_button 'Sign up'
    page.should have_content 'Logout'

    # create a trip
    click_link 'Trips'
    find('.create-trip').click
    fill_in 'location', with: 'Berkeley'
    fill_in 'name', with: 'Cal'
    fill_in 'start-date', with: '20-11-2015'
    fill_in 'end-date', with: '25-11-2015'
    click_link 'submit-trip'
  end
  
  it "checks that trip info appears at the top" do
  end

  it "displays a functioning Google map"

  it "invites friends" do
  end

  it "manually adds a destination" do
    fill_in 'name', with: 'Dest'
    fill_in 'address', with: '123 Street Ave'
    click_button 'create-dest-button'
    page.should have_css('td', :text => 'Dest')

    fill_in 'name', with: 'Dest2'
    fill_in 'address', with: '456 Street Ave'
    click_button 'create-dest-button' 
    page.should have_css('td', :text => 'Dest') # previous dest should still exist
    page.should have_css('td', :text => 'Dest2')
    page.should have_css('td', :text => '456 Street Ave')
  end

  describe "Destination search" do
    it "displays search results" do
    end

    it "adds a destination"

  end


end
