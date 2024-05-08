class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def authenticate_user_from_token!
    token = request.headers['Authorization']&.split(' ')&.last
    return unless token

    begin
      decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      user_info = decoded_token.first  # Assuming user information is stored in the first part of the token payload
      user_id = user_info['user_id']  # Assuming user ID is stored in the token payload

      @current_user = User.find(user_id)
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end

  private

  def not_found(error)
    render json: { error: error.record.errors }, status: :not_found
  end


end
