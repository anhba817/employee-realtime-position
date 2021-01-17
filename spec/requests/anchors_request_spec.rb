require 'rails_helper'

RSpec.describe "Anchors", type: :request do
  # Initialize the test data
  let!(:map) { create(:map) }
  let!(:anchors) { create_list(:anchor, 20, map_id: map.id) }
  let(:map_id) { map.id }
  let(:id) { anchors.first.id }

  # Test suite for GET /api/maps/:map_id/anchors
  describe 'GET /api/maps/:map_id/anchors' do
    before { get "/api/maps/#{map_id}/anchors" }

    context 'when map exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns all map anchors' do
        expect(json.size).to eq(20)
      end
    end

    context 'when map does not exist' do
      let(:map_id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Map/)
      end
    end
  end

  # Test suite for GET /api/maps/:map_id/anchors/:id
  describe 'GET /api/maps/:map_id/anchors/:id' do
    before { get "/api/maps/#{map_id}/anchors/#{id}" }

    context 'when map anchor exists' do
      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end

      it 'returns the anchor' do
        expect(json['id']).to eq(id)
      end
    end

    context 'when map anchor does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Anchor/)
      end
    end
  end

  # Test suite for PUT /api/maps/:map_id/anchors
  describe 'POST /api/maps/:map_id/anchors' do
    let(:valid_attributes) { { deviceId: '12345678a', x: 200, y: 200 } }

    context 'when request attributes are valid' do
      before { post "/api/maps/#{map_id}/anchors", params: valid_attributes }

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when an invalid request' do
      before { post "/api/maps/#{map_id}/anchors", params: {} }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'returns a failure message' do
        expect(response.body).to match(/Validation failed: Deviceid can't be blank/)
      end
    end
  end

  # Test suite for PUT /api/maps/:map_id/anchors/:id
  describe 'PUT /api/maps/:map_id/anchors/:id' do
    let(:valid_attributes) { { x: 300 } }

    before { put "/api/maps/#{map_id}/anchors/#{id}", params: valid_attributes }

    context 'when anchor exists' do
      it 'returns status code 204' do
        expect(response).to have_http_status(204)
      end

      it 'updates the anchor' do
        updated_anchor = Anchor.find(id)
        expect(updated_anchor.x).to eq(300)
      end
    end

    context 'when the anchor does not exist' do
      let(:id) { 0 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Anchor/)
      end
    end
  end

  # Test suite for DELETE /api/maps/:id
  describe 'DELETE /api/maps/:id' do
    before { delete "/api/maps/#{map_id}/anchors/#{id}" }

    it 'returns status code 204' do
      expect(response).to have_http_status(204)
    end
  end
end
