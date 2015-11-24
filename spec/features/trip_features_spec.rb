require 'rails_helper'

# @selenium
feature "New Trip" do
  before(:all) do
    # register
    Capybara.current_driver = :selenium
    visit '/'
    fill_in 'reg-name', :with => 'Test'
    fill_in 'reg-email', :with => 't@est.com'
    fill_in 'reg-pw', :with => 'password'
    fill_in 'reg-pw-conf', :with => 'password'
    click_button 'Sign up'
    page.should have_content 'Logout'
    click_link 'Logout'

    # log in
    click_link 'Log In'
    fill_in 'login-email', with: 't@est.com'
    fill_in 'login-pw', with: 'password'
    check 'remember-me'
    click_button 'Log in'

    # create a trip
    click_link 'Trips'
    find('.create-trip').click
    fill_in 'location', with: 'Berkeley'
    fill_in 'name', with: 'Cal'
    fill_in 'start-date', with: '20-11-2015'
    fill_in 'end-date', with: '25-11-2015'
    click_link 'submit-trip'
    visit '/dashboard'
  end

  before(:each) do
    click_link 'Trips'
    find('.location').click
  end
  
  # scenario "displays trip info at the top" do

  #       # <div class="trip-info">
  #       #     <h1 data-header="location" class="">No Trip Selected</h1>
  #       #         <input type="text" class="hidden" data-function="update-trip-location">
  #       #         <input type="text" class="hidden" data-function="update-trip-start">
  #       #         <input type="text" class="hidden" data-function="update-trip-end">
  #       #     <aside data-header="invited-dates"></aside>
  #       #     <aside><a href="" data-function="invite-friends" class="hidden">Invite more friends</a></aside>

  # end

  # feature "Edit trip" do
  #   before(:each) do
  #     # assume a trip selected
  #     click_link 'EDIT'
  #   end

  #   scenario "fills in update-trip form, then saves updated trip info" do
  #     fill_in 'edit-trip-location', with: 'New Location'
  #     fill_in 'edit-trip-start', with: '30-10-2015'
  #     fill_in 'edit-trip-end', with: 'Dest'
  #     # page.should
  #     # ... etc (learn should have_css thing)

  #   end

  #   scenario "cancels updates and deletes the trip" do
  #     fill_in 'edit-trip-location', with: 'New Location'
  #     click_link 'CANCEL'
  #     # verify no changes
      
  #     # try again, delete
  #     click_link 'EDIT'
  #     click_link 'DELETE'
      
  #     # verify 'no trip selected'

  #   end
  # end

  scenario "manually adds a destination" do
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

  # feature "Destination search" do
  #   before(:each) do
  #   end

  #   scenario "displays search results" do
  #   end

  #   scenario "adds a destination" do
  #   end

  # end

  # scenario "log out" do
  # end

  after(:all) do
    click_link "Account"
    click_button "Cancel my account"
    page.driver.browser.switch_to.alert.accept
    Capybara.use_default_driver
  end

end
