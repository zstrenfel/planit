class CreateDestinations < ActiveRecord::Migration
  def change
    create_table :destinations do |t|
      t.string :name
      t.string :address
      t.time :time
      t.date :date
      t.integer :like_count

      t.timestamps null: false
    end
  end
end
