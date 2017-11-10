require 'csv_reader'
require 'json'

class Server
  def call(env)
    csv = CSVReader.new './ufo_sighting_data.csv'
    [200, {}, [csv.rows.to_json]]
  end

  def self.call(env)
    new.call(env)
  end
end
