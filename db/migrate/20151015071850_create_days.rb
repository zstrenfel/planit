class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.date :date
      t.time :start
      t.time :end

      t.timestamps null: false
    end
  end
end
