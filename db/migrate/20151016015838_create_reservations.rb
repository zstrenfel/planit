class CreateReservations < ActiveRecord::Migration
  def change
    create_table :reservations do |t|
      t.belongs_to :user, index: true
      t.belongs_to :trip, index: true
      t.timestamps null: false
    end
  end
end
