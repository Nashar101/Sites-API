class PrivateController < ApplicationController
  before_action :authenticate_user!
  def test
    render json: {
      test: current_user.id,
      message: "This is a secret message. You are seeing it because you have successfully logged in.",
      user: current_user
    }
  end
end