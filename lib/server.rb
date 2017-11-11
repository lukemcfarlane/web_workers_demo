require 'ufo_sighting_data'
require 'json'

class Server
  def call(env)
    @req = Rack::Request.new env
    page, per_page, pages, total_count = pagination
    rows = data.slice((page - 1) * per_page, per_page)
    meta = {
      page: page,
      per_page: per_page,
      pages: pages,
      total_count: total_count
    }
    [200, {}, [ body_json(rows, meta) ]]
  end

  def self.call(env)
    new.call(env)
  end

  private

  def params
    @params ||= @req.params
  end

  def body_json(rows, meta, errors = [])
    {
      data: rows,
      meta: meta,
      errors: errors
    }.to_json
  end

  def data
    @data ||= UFOSightingData.new *year_filters
  end

  def total_count
    @total_count ||= data.total_count
  end

  def year_filters
    @year_filters ||= params.fetch_values('from_year', 'to_year').map &:to_i
  rescue
    [nil, nil]
  end

  def pagination
    page, per_page = params.fetch_values('page', 'per_page').map &:to_i
    pages = (total_count / per_page).ceil
    @pagination ||= [ page, per_page, pages, total_count ]
  rescue
    [1, total_count, 1, total_count]
  end
end
