class AddDurationToDestinations < ActiveRecord::Migration
  def change
    add_column :destinations, :duration, :integer
  end
end
