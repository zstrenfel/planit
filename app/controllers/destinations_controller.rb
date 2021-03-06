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
     @destination.assign_attributes(dest_params)
      if @destination.valid?
        #need to add into
        @day = Day.where("date= ? AND trip_id = ?" , params[:date], @destination.trip_id).first;
        p params[:start_time]
        p params[:end_time]
        if not checkConflicts(@day, params[:start_time], params[:end_time])
          p 'no conflicts'
          @destination.save
          p @destination
          @day.destinations << @destination
  	      json1 = {:status => 1, :destination => @destination}
  	      render :json => json1
        else
          json1 = {:status => -1, :errors => "time conflict"}
          render :json => json1
        end
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
      params.require(:destination).permit(:name, :date, :start_time, :end_time, :address, :date, :trip_id, :like_count)
    end

    def checkConflicts(day, start_time, end_time)
      p "checkConflicts"
      # destinations = day.destinations
      # destinations.each{ |dest|
        # curr_start = start_time.strftime("%H:%M")
        # curr_end = end_time.strftime("%H:%M")
        # p curr_start
        # prev_start = Time.at(dest.start_time.strftime("%H:%M"))
        # prev_end = dest.end_time.strftime("%H:%M")
        # p (prev_start.class)
        # p prev_end
        # if (end_time > prev_start && end_time < prev_end)
        #   p "case 1"
        #   return true
        # elsif (start_time > prev_start  && start_time < prev_end)
        #   p "case 2"
        #   return true
        # elsif (start_time > prev_start && end_time <= prev_end)
        #   p "case 3"
        #   return true
        # end
      # }
      p "no conflicts 2"
      return false;
    end



end
