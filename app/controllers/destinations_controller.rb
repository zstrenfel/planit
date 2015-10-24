class DestinationsController < ApplicationController
  def wat
  end

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
  	@destinations = Destination.all.order("created_at DESC")
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

def destroy
    @destination = Destination.find(params[:id])
    @destination.destroy
    render :json => { :status => 1} 
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
      params.require(:destination).permit(:name, :date, :time, :address, :date)
    end
  

end
