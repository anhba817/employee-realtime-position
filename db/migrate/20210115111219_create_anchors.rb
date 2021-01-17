class CreateAnchors < ActiveRecord::Migration[6.1]
  def change
    create_table :anchors do |t|
      t.string :deviceId
      t.integer :x
      t.integer :y
      t.references :map, null: false, foreign_key: true

      t.timestamps
    end
  end
end
