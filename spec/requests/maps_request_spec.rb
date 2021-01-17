
require 'rails_helper'

RSpec.describe 'Maps API', type: :request do
  # initialize test data
  let!(:maps) { create_list(:map, 10) }
  let(:map_id) { maps.first.id }

  # Test suite for GET /api/maps
  describe 'GET /api/maps' do
    # make HTTP get request before each example
    before { get "/api/maps" }

    it 'returns maps' do
      # Note `json` is a custom helper to parse JSON responses
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  # Test suite for GET /api/maps/:id
  describe 'GET /api/maps/:id' do
    before { get "/api/maps/#{map_id}" }

    context 'when the record exists' do
      it 'returns the map' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(map_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:map_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Map/)
      end
    end
  end

  # Test suite for POST /api/maps
  describe 'POST /api/maps' do
    # valid payload
    let(:valid_attributes) { { name: 'Floor 1', ratio: 0.1 } }

    context 'when the request is valid' do
      before { post '/api/maps', params: valid_attributes }

      it 'creates a map' do
        expect(json['name']).to eq('Floor 1')
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/maps', params: { name: 'Floor 2' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a validation failure message' do
        expect(response.body)
          .to match(/Validation failed: Ratio can't be blank/)
      end
    end
  end

  # Test suite for PUT /api/maps/:id
  describe 'PUT /api/maps/:id' do
    let(:valid_attributes) { { name: 'Floor 3' } }

    context 'when the record exists' do
      before { put "/api/maps/#{map_id}", params: valid_attributes }

      it 'updates the record' do
        expect(response.body).to be_empty
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end
    end
  end

  # Test suite for DELETE /api/maps/:id
  describe 'DELETE /api/maps/:id' do
    before { delete "/api/maps/#{map_id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end