class UsersController < ApplicationController
  skip_before_action :authenticate_request, only: []
  before_action :authenticate_user!

  def profile
    render json: { user: current_user }
  end
end 