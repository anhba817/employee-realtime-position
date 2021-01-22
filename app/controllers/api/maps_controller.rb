class Api::MapsController < ApplicationController
    before_action :set_map, only: [:show, :update, :destroy]

    # GET /api/maps
    def index
      @maps = Map.all
      json_response(@maps)
    end
  
    # POST /api/maps
    def create
      @map = Map.create!(map_params)
      @map.image.attach(map_params[:image])
      json_response(@map, :created)
    end
  
    # GET /maps/:id
    def show
      json_response(@map)
    end
  
    # PUT /maps/:id
    def update
      @map.update(map_params)
      json_response(@map)
    end
  
    # DELETE /maps/:id
    def destroy
      @map.destroy
      head :no_content
    end
  
    private
  
    def map_params
      # whitelist params
      params.permit(:name, :ratio, :image, :width, :height)
    end
  
    def set_map
      @map = Map.find(params[:id])
    end
end
