class Anchor < ApplicationRecord
  belongs_to :map
  # validation
  validates_presence_of :deviceId, :x, :y
end
