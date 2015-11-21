class AddEndTimeToDestinations < ActiveRecord::Migration
  def change
    add_column :destinations, :end_time, :time
    rename_column :destinations, :time, :start_time
  end
end
