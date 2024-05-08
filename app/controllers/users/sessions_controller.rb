# app/controllers/users/sessions_controller.rb
class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def create
    if params[:auto_login_token].present?
      auto_login
    else
      super
    end
  end



  private

  def auto_login
    token = params[:auto_login_token]
    return unless token

    begin
      decoded_token = JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      user_info = decoded_token.first  # Assuming user information is stored in the first part of the token payload
      user_id = user_info['user_id']  # Assuming user ID is stored in the token payload

      user = User.find(user_id)
      @user = user
      sign_in(user) if user
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound => e
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end

  def respond_with(resource, _opts = {})
    @sites = Site.all.where("user_id = ? ", resource.id)
    if params[:auto_login_token].present?
      render json: {message: @user, sites: @sites, date: DateTime.now, hi: "hi"}
    else
      render json: {message: @user, sites: @sites, date: DateTime.now, no: "no"}
    end

  end


  def respond_to_on_destroy
    render json: { message: "Logged out." }
  end

end
