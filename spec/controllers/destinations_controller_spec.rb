require_relative "../rails_helper"

describe DestinationsController do

    it "has a valid factory" do
       expect(FactoryGirl.create(:destination)).to be_valid
     end


    before :each do
        @destination = Destination.new
    end

     # describe "GET #index" do
  #      it "returns the list of destinations"

     # end
end

describe 'DELETE destroy' do
 before :each do
     @controller = DestinationsController.new
   @destination = FactoryGirl.create(:destination)
 end
 
 it "deletes the contact" do
   expect{
     delete :destroy, id: @destination        
   }.to change(Destination,:count).by(-1)
 end
   
 # it "redirects to contacts#index" do
 #   delete :destroy, id: @contact
 #   response.should redirect_to contacts_url
 # end
end