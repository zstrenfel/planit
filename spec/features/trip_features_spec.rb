require 'rails_helper'

# @selenium
feature "New Trip" do
  before(:all) do
    Capybara.current_driver = :selenium
    @user = FactoryGirl.create(:user)

    # log in
    visit '/'
    click_link 'Log In'
    fill_in 'login-email', with: @user.email
    fill_in 'login-pw', with: @user.password
    check 'remember-me'
    click_button 'Log in'

    # create a trip
    click_link 'Trips'
    find('.create-trip').click
    fill_in 'location', with: 'Berkeley'
    fill_in 'trip-name', with: 'Cal'
    fill_in 'start-date', with: '20-11-2015'
    fill_in 'end-date', with: '21-11-2015'
    click_link 'submit-trip'
    visit '/dashboard'
  end

  before(:each) do
    # select the trip
    click_link 'Trips'
    find('.location').click
  end

  feature "Edit trip" do
    before(:each) do
      click_link 'EDIT'
    end

    scenario "update trip and save" do
      page.should have_text "20"
      page.should have_text "21"
      fill_in 'edit-trip-location', with: 'Changed Location'
      fill_in 'edit-trip-start', with: '20-11-2015'
      fill_in 'edit-trip-end', with: '23-11-2015'
      click_link 'SAVE'
      page.should have_text "Changed Location"
      page.should have_text "22"
      page.should have_text "23"
    end

    scenario "update trip and cancel" do
      fill_in 'edit-trip-location', with: 'Changed Again'
      click_link 'CANCEL'
      page.should_not have_text "Changed Again"
    end

    after(:all) do
      click_link 'EDIT'
      click_link 'DELETE'
      page.should have_text "No Trip Selected"
    end
  end

  # feature "Destination search" do
  #   before(:each) do
  #   end

  #   scenario "displays search results" do
  #   end

  #   scenario "adds a destination" do
  #   end

  # end

  # feature deprecated

  xscenario "manually adds a destination" do
    fill_in 'name', with: 'Dest'
    fill_in 'address', with: '123 Street Ave'
    click_button 'create-dest-button'
    page.should have_css('td', :text => '123 Street Ave')

    fill_in 'name', with: 'Dest2'
    fill_in 'address', with: '456 Street Ave'
    click_button 'create-dest-button' 
    page.should have_css('td', :text => '123 Street Ave') # previous dest should still exist
    page.should have_css('td', :text => '456 Street Ave')
  end

  after(:all) do
    # test registration and acct deletion
    click_link 'Logout'
    fill_in 'reg-name', :with => 'Test'
    fill_in 'reg-email', :with => 't@est.com'
    fill_in 'reg-pw', :with => 'password'
    fill_in 'reg-pw-conf', :with => 'password'
    click_button 'Sign up'
    page.should have_content 'Logout'
    click_link "Account"
    click_button "Cancel my account"
    page.driver.browser.switch_to.alert.accept

    @user.destroy
    Capybara.use_default_driver
  end

end
