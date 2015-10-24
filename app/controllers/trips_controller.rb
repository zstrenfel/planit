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

    def invite_friends
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


    private
        def trip_params
            params.require(:trip).permit(:name, :location, :start, :end)
        end
end
