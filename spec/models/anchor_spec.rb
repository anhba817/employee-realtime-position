require 'rails_helper'

RSpec.describe Anchor, type: :model do
   # ensure an item record belongs to a single todo record
   it { should belong_to(:map) }
   # Validation test
   # ensure column name is present before saving
   it { should validate_presence_of(:deviceId) }
   it { should validate_presence_of(:x) }
   it { should validate_presence_of(:y) }
end
