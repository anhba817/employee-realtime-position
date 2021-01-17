class MapSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :ratio, :image, :width, :height, :created_at, :updated_at
  # model association
  has_many :anchors
  def image
    if object.image.attached?
      {
        url: rails_blob_url(object.image)
      }
    end
  end
end
