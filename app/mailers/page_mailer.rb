class PageMailer < ApplicationMailer
  default from: 'notifications@planit169.com'

  def invite_email(curr_user, email)
    p "in PageMailer"
    @user = curr_user
    # @user = curr_user
    mail(to: email, subject: @user.name + ' is inviting you to join Planit!')
  end
end
