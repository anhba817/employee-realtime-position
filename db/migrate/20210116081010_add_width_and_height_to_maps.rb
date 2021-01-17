class AddWidthAndHeightToMaps < ActiveRecord::Migration[6.1]
  def change
    add_column :maps, :width, :integer
    add_column :maps, :height, :integer
  end
end
