Rails.application.routes.draw do
  get "home/index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app.vue boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app.vue is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app.vue/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest

  # 前端路由转发
  get '/login', to: 'home#index'
  get '/register', to: 'home#index'

  # 后端登录注册接口
  post '/login', to: 'auth#login'
  post '/register', to: 'auth#register'

  # 用户信息接口
  get '/profile', to: 'users#profile'

  # Defines the root path route ("/")
  # root "posts#index"
  root "home#index"

  # SPA 前端路由兜底，交给 Vue 处理
  get '*path', to: 'home#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
