require 'csv'
require 'time'

class UFOSightingData
  CSV_PATH = './ufo_sighting_data.csv'.freeze

  attr_reader :headers

  def initialize(from_year, to_year)
    @csv = CSV.foreach CSV_PATH
    @headers = @csv.next
    @from_year, @to_year = from_year, to_year
  end

  def all
    @all ||= @csv.drop(1).map { |val| Hash[ headers.zip(val) ] }
  end

  def filtered
    if @from_year && @to_year
      all.select do |row|
        begin
          year = Time.parse(row['Date_time']).year
          year >= @from_year.to_i && year <= @to_year.to_i
        rescue Exception => e
          false
        end
      end
    else
      all
    end
  end

  def total_count
    @total_count ||= filtered.count
  end

  def slice(offset = 0, number = nil)
    sliced = filtered.drop(offset)
    if number
      sliced.take number
    else
      sliced
    end
  end
end
