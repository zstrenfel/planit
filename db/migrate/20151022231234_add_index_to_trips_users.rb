class AddIndexToTripsUsers < ActiveRecord::Migration
  def change
    add_index :trips_users, :user_id
    add_index :trips_users, :trip_id
  end
end
