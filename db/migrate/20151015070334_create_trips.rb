class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.string :location
      t.string :name
      t.date :start
      t.date :end

      t.timestamps null: false
    end
  end
end
