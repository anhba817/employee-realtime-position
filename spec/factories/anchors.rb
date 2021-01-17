FactoryBot.define do
    factory :anchor do
      deviceId { Faker::Alphanumeric.alphanumeric(number: 10) }
      x { Faker::Number.decimal(l_digits: 3, r_digits: 3) }
      y { Faker::Number.decimal(l_digits: 3, r_digits: 3) }
    end
  end