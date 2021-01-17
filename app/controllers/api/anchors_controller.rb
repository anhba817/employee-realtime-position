class Api::AnchorsController < ApplicationController
    before_action :set_map
    before_action :set_map_anchor, only: [:show, :update, :destroy]
  
    # GET /maps/:map_id/anchors
    def index
      json_response(@map.anchors)
    end
  
    # GET /maps/:map_id/anchors/:id
    def show
      json_response(@anchor)
    end
  
    # POST /maps/:map_id/anchors
    def create
      @map.anchors.create!(anchor_params)
      json_response(@map, :created)
    end
  
    # PUT /maps/:map_id/anchors/:id
    def update
      @anchor.update(anchor_params)
      head :no_content
    end
  
    # DELETE /maps/:map_id/anchors/:id
    def destroy
      @anchor.destroy
      head :no_content
    end
  
    private
  
    def anchor_params
      params.permit(:deviceId, :x, :y)
    end
  
    def set_map
      @map = Map.find(params[:map_id])
    end
  
    def set_map_anchor
      @anchor = @map.anchors.find_by!(id: params[:id]) if @map
    end
end
