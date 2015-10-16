class AddForeignKeys < ActiveRecord::Migration
  def change
    add_reference :users, :trip, index: true
    add_reference :trips, :user, index: true
    add_reference :destinations, :trip, index: true
    add_reference :destinations, :day, index: true
    add_column :days, :homebase, :string
  end
end
