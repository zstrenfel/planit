class DestinationsController < ApplicationController
    def search
        parameters = { term: params[:term], limit: 16 }
        render json: Yelp.client.search('San Francisco', parameters)
    end

    def create
        #create()
        redirect_to 
    end
end
