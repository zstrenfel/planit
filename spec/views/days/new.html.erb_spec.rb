require 'rails_helper'

RSpec.describe "days/new", type: :view do
  before(:each) do
    assign(:day, Day.new())
  end

  it "renders new day form" do
    render

    assert_select "form[action=?][method=?]", days_path, "post" do
    end
  end
end
