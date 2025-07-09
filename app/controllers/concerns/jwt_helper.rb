module JwtHelper
  SECRET_KEY = Rails.application.secret_key_base || ENV['SECRET_KEY_BASE']

  def encode_jwt(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  def decode_jwt(token)
    decoded = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new decoded
  rescue
    nil
  end
end 