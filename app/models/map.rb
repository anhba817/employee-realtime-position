class Map < ApplicationRecord
    has_one_attached :image
    # model association
    has_many :anchors, dependent: :destroy
  
    # validations
    validates_presence_of :name, :ratio
  end
  