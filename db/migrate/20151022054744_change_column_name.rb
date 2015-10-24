class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :trips, :start, :start_date
    rename_column :trips, :end, :end_date
  end
end
