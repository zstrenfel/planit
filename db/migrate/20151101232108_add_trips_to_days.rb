class AddTripsToDays < ActiveRecord::Migration
  def change
    add_reference :days, :trips, index: true
  end
end
