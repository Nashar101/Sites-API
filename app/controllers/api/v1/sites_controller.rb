class Api::V1::SitesController < ApplicationController
  before_action :authenticate_user!
  respond_to :json
  def index
    render json: Site.all
  end


  def get_sites
    render json: Site.all.where("user_id = ?", current_user.id)
  end
  def create
    site = Site.new(site_params)
    if(!site.url.match(/\Ahttps?:\/\/(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[^\s]*)?\z/))
      render json: site.errors, status: :not_acceptable
      return
    end
    site.url = shortenLink(site.url)
    if site.save
      render json: site, status: :created
    else
      render json: site.errors, status: :unprocessable_entity
    end
  end

  def shortenLink(url)
    match = url.match(%r{^([^/]+://[^/]+).*})
    match ? match[1] : url
  end

  def destroy
    Site.find(params[:id]).destroy!
    head :no_content
  end

  private

  def site_params
    params.require(:site).permit(:url, :duration, :expiration_date)
  end
end
