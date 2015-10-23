class RenameOldTableToNewTable < ActiveRecord::Migration
  def change
    rename_table :users_trips, :trips_users
  end
end
