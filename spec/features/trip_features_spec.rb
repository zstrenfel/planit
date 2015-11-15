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
  
  it "displays trip info at the top" do

        # <div class="trip-info">
        #     <h1 data-header="location" class="">No Trip Selected</h1>
        #         <input type="text" class="hidden" data-function="update-trip-location">
        #         <input type="text" class="hidden" data-function="update-trip-start">
        #         <input type="text" class="hidden" data-function="update-trip-end">
        #     <aside data-header="invited-dates"></aside>
        #     <aside><a href="" data-function="invite-friends" class="hidden">Invite more friends</a></aside>

  end

  describe "Edit trip" do
    before(:each) do
      # assume a trip selected
      click_link 'EDIT'
    end

    it "fills in update-trip form, then saves updated trip info" do
      fill_in 'edit-trip-location', with: 'New Location'
      fill_in 'edit-trip-start', with: '30-10-2015'
      fill_in 'edit-trip-end', with: 'Dest'
      # page.should
      # ... etc (learn should have_css thing)

    end

    it "cancels updates and deletes the trip" do
      fill_in 'edit-trip-location', with: 'New Location'
      click_link 'CANCEL'
      # verify no changes
      
      # try again, delete
      click_link 'EDIT'
      click_link 'DELETE'
      
      # verify 'no trip selected'

    end
  end

  it "invites friends" do
    # does emailer work yet?
  end

  it "manually adds a destination" do
    fill_in 'name', with: 'Dest'
    fill_in 'address', with: '123 Street Ave'
    click_button 'create-dest-button'
    save_and_open_page
    page.should have_css('td', :text => 'Dest')

    fill_in 'name', with: 'Dest2'
    fill_in 'address', with: '456 Street Ave'
    click_button 'create-dest-button' 
    page.should have_css('td', :text => 'Dest') # previous dest should still exist
    page.should have_css('td', :text => 'Dest2')
    page.should have_css('td', :text => '456 Street Ave')
  end

  describe "Destination search" do
    before(:each) do
    end

    it "displays search results" do
    end

    it "adds a destination" do
    end

  end


end
