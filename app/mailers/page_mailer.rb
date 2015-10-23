class PageMailer < ApplicationMailer
  default from: 'notifications@planit169.com'

  def invite_email(emails)
    @user = current_user
    emails.each do |email|
      mail(to: email, subject: @user.name + 'is inviting you to join Planit!')
    end
  end
end
