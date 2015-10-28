class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  skip_before_filter  :verify_authenticity_token

  protected

  #lets devise know that name is a permitted field when signing up
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :name
  end

  def after_sign_in_path_for(resource)
    # return the path based on resource
    return '/dashboard'
  end
end
