require 'csv'

class CSVReader
  def initialize(csv_path)
    @csv_path = csv_path
  end

  def rows
    CSV.read @csv_path
  end
end
