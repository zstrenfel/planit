class PagesController < ApplicationController

  def index
    if user_signed_in?
      redirect_to '/dashboard'
    end
  end

  def dashboard
    if not user_signed_in?
      redirect_to :root
    else
      @trips = current_user.trips
    end
  end
end
