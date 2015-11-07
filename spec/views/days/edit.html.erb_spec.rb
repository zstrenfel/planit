require 'rails_helper'

RSpec.describe "days/edit", type: :view do
  before(:each) do
    @day = assign(:day, Day.create!())
  end

  it "renders the edit day form" do
    render

    assert_select "form[action=?][method=?]", day_path(@day), "post" do
    end
  end
end
