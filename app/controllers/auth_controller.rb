class AuthController < ApplicationController
  include JwtHelper

  # 注册接口
  def register
    # 参数校验
    unless params[:email].present? && params[:password].present?
      return render json: { error: '邮箱和密码不能为空' }, status: :bad_request
    end
    user = nil
    ActiveRecord::Base.transaction do
      user = User.new(user_params)
      user.plain_password = params[:password] if user.respond_to?(:plain_password=)
      if user.save
        token = encode_jwt({ user_id: user.id, role: user.role })
        render json: { message: '注册成功', token: token, user: user }, status: :created
      else
        raise ActiveRecord::Rollback
      end
    end
    unless user&.persisted?
      render json: { error: '注册失败，已回滚' }, status: :unprocessable_entity
    end
  end

  # 登录接口
  def login
    if params[:email].blank? && params[:phone].blank?
      return render json: { error: '邮箱或手机号不能为空' }, status: :bad_request
    end
    if params[:password].blank?
      return render json: { error: '密码不能为空' }, status: :bad_request
    end
    user = User.find_by(email: params[:email]) || User.find_by(phone: params[:phone])
    if user&.authenticate(params[:password])
      token = encode_jwt({ user_id: user.id, role: user.role })
      render json: { message: '登录成功', token: token, user: user }
    else
      render json: { error: '账号或密码错误' }, status: :unauthorized
    end
  end

  private
  def user_params
    params.permit(:email, :phone, :password, :gender, :avatar)
  end
end 