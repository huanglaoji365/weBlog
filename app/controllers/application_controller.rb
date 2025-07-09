class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  include JwtHelper

  before_action :authenticate_request

  attr_reader :current_user

  private

  def authenticate_request
    header = request.headers['Authorization']
    token = header&.split(' ')&.last
    if token
      decoded = decode_jwt(token)
      if decoded && decoded['user_id']
        @current_user = User.find_by(id: decoded['user_id'])
      end
    end
  end

  def authenticate_user!
    unless current_user
      render json: { error: '请先登录' }, status: :unauthorized
    end
  end

  def authorize_admin!
    unless current_user&.role.to_s == 'admin' || current_user&.role.to_i == 1
      render json: { error: '无权限' }, status: :forbidden
    end
  end
end
