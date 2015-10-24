# Load the Rails application.
require File.expand_path('../application', __FILE__)

ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
    :address        => 'smtp.gmail.com',
    :domain         => 'planit-169.heroku.com',
    :port           => 587,
    :user_name      => 'planit169@gmail.com',
    :password       => 'password169',
    :authentication => :plain
}
# ActionMailer::Base.raise_delivery_errors = true


# Initialize the Rails application.
Rails.application.initialize!
#