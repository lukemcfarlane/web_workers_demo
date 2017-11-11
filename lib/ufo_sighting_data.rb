require 'csv'

class UFOSightingData
  CSV_PATH = './ufo_sighting_data.csv'.freeze

  def initialize
    @csv = CSV.foreach CSV_PATH
    @headers = @csv.next
  end

  def rows(offset = 0, number = nil)
    offset = @csv.drop(offset + 1)
    if number
      offset.take number
    else
      offset
    end
  end

  private
end
