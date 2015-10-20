class DestinationsController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
	protect_from_forgery with: :null_session

  def create
  	#make default null values for time and date
  	@destination = Destination.new(dest_params)
  	puts @destination
	  if @destination.save
	      json1 = {:status => 1, :destination => @destination}
	      render :json => json1
	  else
	    json1 = {:status => -1, :errors => @destination.errors}
	    render :json => json1
	  end  

  	
  	#load the destinations into a view after he does that
  end

  def index
  	# @destinations = Destination.where("trip_id =?", params[:trip_id])
  	@destinations = Destination.all
  end

  def update
      if @destination.update(dest_params)
	      json1 = {:status => 1, :destination => @destination}
	      render :json => json1
      else
   	    json1 = {:status => -1, :errors => @destination.errors}
	    render :json => json1
      end

  end

  def destroy_all
  	  Destination.each do |dest|
      dest.destroy
    end
    render :json => { :status => 1} 
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def dest_params
      params.require(:destination).permit(:name, :time, :address, :date)
    end
  

end
