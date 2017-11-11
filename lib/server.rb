require 'ufo_sighting_data'
require 'json'

class Server
  def call(env)
    req = Rack::Request.new env
    page, per_page, pages = pagination(req)
    rows = data.rows((page - 1) * per_page, per_page)
    meta = { page: page, per_page: per_page, pages: pages }
    [200, {}, [ body_json(rows, meta) ]]
  end

  def self.call(env)
    new.call(env)
  end

  private

  def body_json(rows, meta, errors = [])
    {
      data: rows,
      meta: meta,
      errors: errors
    }.to_json
  end

  def data
    @data ||= UFOSightingData.new
  end

  def total_count
    @total_count ||= data.rows.count
  end

  def pagination(req)
    page, per_page = req.params.fetch_values('page', 'per_page').map &:to_i
    pages = (total_count / per_page).ceil
    @pagination ||= [ page, per_page, pages ]
  rescue
    [1, total_count, 1]
  end
end
