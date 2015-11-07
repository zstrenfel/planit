class FixColumnName < ActiveRecord::Migration
  def change
    rename_column :days, :start, :start_time
    rename_column :days, :end, :end_time
  end
end
