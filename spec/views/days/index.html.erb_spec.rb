require 'rails_helper'

RSpec.describe "days/index", type: :view do
  before(:each) do
    assign(:days, [
      Day.create!(),
      Day.create!()
    ])
  end

  it "renders a list of days" do
    render
  end
end
