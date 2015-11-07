class TripsController < ApplicationController
    def index
        @trips = Trip.all
    end

    def show
        @trip = Trip.find(params[:id])
        render json: @trip
    end

    def new
        @trip = Trip.new
    end

    def edit
        @trip = Trip.find(params[:id])
    end

    def create
        @trip = Trip.new(trip_params)
        @trip.users << current_user

        if @trip.save
            p "saved"
            create_days
            render :json => @trip
        else
            redirect_to root
            p "error making trip. see controller to debug"
        end
    end

    def update
        @trip = Trip.find(params[:id])

        if @trip.update(trip_params)
            # redirect_to @trip
            #json1 = {:status => 1, :trip => @trip}
            @trip.days.destroy_all
            create_days
	        render :json => @trip
        else
            # render 'edit'
            json1 = {:status => -1, :errors => @trip.errors}
	        #render :json => json1
        end
    end

    def destroy
        @trip = Trip.find(params[:id])
        @trip.destroy

        respond_to do |format|
          format.html { redirect_to current_page_url, notice: 'page was successfully destroyed.' }
          format.json { head :no_content }
        end
    end

    def invite_friends
        if !params[:id]
          render :json => {:status => -1, :errors => "Required field 'trip_id' missing"}
          return
        end
        @trip = Trip.find(params[:id])
        @emails = params[:emails]

        @emails.each do |email|
            invitee = User.find_by(email: email)
            if (invitee) && (not @trip.users.include?(invitee))
                @trip.users << invitee
            elsif not invitee
                p "no such invitee exists"
                p current_user.name
                PageMailer.invite_email(current_user, invitee).deliver_now
            end
        end
        render json: @trip
    end

    def destinations
        if !params[:id]
          render :json => {:status => -1, :errors => "Required field 'trip_id' missing"}
          return
        end

        @trip = Trip.find(params[:id])
        @destinations = @trip.destinations

        if @destinations.blank?
          render :json => {:status => -1, :errors => "Invalid trip id"}
          return
        end

        render :json => { destinations: @destinations}
    end

    private
        def trip_params
            params.require(:trip).permit(:name, :location, :start_date, :end_date)
        end

        def create_days
            days = (@trip.start_date..@trip.end_date).map(&:to_s)
            days.each do |day|
                @trip.days.create({date: day})
            end
        end
end
