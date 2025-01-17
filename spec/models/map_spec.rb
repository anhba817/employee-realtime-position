require 'rails_helper'

RSpec.describe Map, type: :model do
  # ensure Todo model has a 1:m relationship with the Item model
  it { should have_many(:anchors).dependent(:destroy) }
  # Validation tests
  # ensure columns title and created_by are present before saving
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:ratio) }
end
