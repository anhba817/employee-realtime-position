Rails.application.routes.draw do
  root "employee_position_dashboard#index"
  namespace :api do
    resources :maps do
      resources :anchors
    end
  end
  get '*path', to: "employee_position_dashboard#index",
    constraints: -> (req) {req.fullpath !~ %r{.*/active_storage/.*} }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
