class FixDayColumnName < ActiveRecord::Migration
  def change
    rename_column :days, :homebase, :home_base
  end
end
