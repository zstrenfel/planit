class AddLikeCountToDestinations < ActiveRecord::Migration
  def change
    add_column :destinations, :like_count, :integer
  end
end
