class RenameTripColumn < ActiveRecord::Migration
  def change
    rename_column :days, :trips_id, :trip_id
  end
end
