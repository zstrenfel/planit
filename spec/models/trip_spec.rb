# == Schema Information
#
# Table name: trips
#
#  id         :integer          not null, primary key
#  location   :string
#  name       :string
#  start_date :date
#  end_date   :date
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

require 'rails_helper'

RSpec.describe Trip, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
