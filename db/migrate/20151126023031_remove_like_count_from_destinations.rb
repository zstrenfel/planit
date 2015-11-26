class RemoveLikeCountFromDestinations < ActiveRecord::Migration
  def change
    remove_column :destinations, :like_count
  end
end
