FactoryBot.define do
    factory :map do
      name { Faker::Lorem.word }
      ratio { Faker::Number.decimal(l_digits: 0, r_digits: 2) }
    end
  end