Rails.application.routes.draw do
  root "employee_position_dashboard#index"
  get '/maps', to: "employee_position_dashboard#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
