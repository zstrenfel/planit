class TripsController < ApplicationController
    def index
        @trips = Trip.all
    end
   
    def show
        @trip = Trip.find(params[:id])
    end
    
    def new
        @trip = Trip.new
    end
    
    def edit
        @trip = Trip.find(params[:id])
    end
    
    def create
        #render plain: params[:trip].inspect
        @trip = Trip.new(trip_params)
        
        puts @trip
        
        if @trip.save
            redirect_to @trip
            #json1 = {:status => 1, :trip => @trip}
	        #render :json => json1
            
        else
            render 'new'
            #json1 = {:status => -1, :errors => @trip.errors}
	        #render :json => json1
        end
    end
    
    def update
        @trip = Trip.find(params[:id])
 
        if @trip.update(trip_params)
            redirect_to @trip
            #json1 = {:status => 1, :trip => @trip}
	        #render :json => json1
        else
            render 'edit'
            #json1 = {:status => -1, :errors => @trip.errors}
	        #render :json => json1
        end
    end
    
    def destroy
        @trip = Trip.find(params[:id])
        @trip.destroy
 
        redirect_to trips_path
    end
    
    private
        def trip_params
            params.require(:trip).permit(:name, :location, :start, :end)
        end
end
