class DestinationsController < ApplicationController
  def wat
  end

  def create
  	#make default null values for time and date
    @trip = Trip.find(params[:trip_id])
  	@destination = Destination.new(dest_params)
  	puts @destination
	  if @destination.save
        @trip.destinations << @destination
        p @trip
	      json1 = {:status => 1, :destination => @destination}
	      render :json => json1
	  else
	    json1 = {:status => -1, :errors => @destination.errors}
	    render :json => json1
	  end


  	#load the destinations into a view after he does that
  end

  def index
  	@destinations = Destination.all.order("created_at ASC")
  end

  def load_all
    if !params[:trip_id]
      render :json => {:status => -1, :errors => "Required field 'trip_id' missing"}
      return
    end

    @destinations = Destination.where("trip_id = ?", params[:trip_id]).order("created_at ASC")

    if @destinations.blank?
      render :json => {:status => -1, :errors => "Invalid trip id"}
      return
    end

    render :json => @destinations
  end

  def update
     @destination = Destination.find(params[:id])
     # trip_id = params[:trip_id]
     p @destination
      if @destination.update(dest_params)
        #need to add into
        @day = Day.where("date= ? AND trip_id = ?" , params[:date], @destination.trip_id).first;
        p @day
        @day.destinations << @destination
	      json1 = {:status => 1, :destination => @destination}
	      render :json => json1
      else
   	    json1 = {:status => -1, :errors => @destination.errors}
	    render :json => json1
      end

  end

def destroy
    @destination = Destination.find(params[:id])
    @destination.destroy
    render :json => { :status => 1}
  end

  def destroy_all
  	  Destination.all.each do |dest|
      dest.destroy

    end
    render :json => { :status => 1}
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def dest_params
      params.require(:destination).permit(:name, :date, :time, :address, :date,:duration, :trip_id, :like_count)
    end


end
