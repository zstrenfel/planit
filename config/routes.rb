Rails.application.routes.draw do
  devise_for :users
  resources :trips
  resources :days, only: [:index, :create, :update, :destroy, :show]
  resources :destinations, only: [:index]

  post '/trips/:id/invite', to: 'trips#invite_friends'
  get '/trips/:id/destinations', to: 'trips#destinations'
  #pages routes
  get 'pages/index'
  root to: 'pages#index'
  get '/dashboard', to: 'pages#dashboard'

  post '/trips/:id/invite', to: 'trips#invite_friends'
  get '/trips/:id/destinations', to: 'trips#destinations'
  put '/trips/:id', to: 'trips#update'
  delete  '/trips/:id', to: 'trips#destroy'



  post '/api/destinations', to:'destinations#create'
  delete 'destinations', to: 'destinations#destroy_all'

  delete '/api/destinations', to: 'destinations#destroy'
  put 'api/destinations/edit', to: 'destinations#update'

  



  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end