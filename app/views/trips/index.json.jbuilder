json.array!(@trips) do |trip|
  json.extract! trip, :id, :name, :location, :start, :end
  json.url trip_url(trip, format: :json)
end
