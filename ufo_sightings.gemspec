# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'ufo_sightings/version'

Gem::Specification.new do |spec|
  spec.name          = "ufo_sightings"
  spec.version       = UfoSightings::VERSION
  spec.authors       = ["Luke McFarlane"]
  spec.email         = ["luke.mcfarlane@trineo.co.nz"]

  spec.summary       = %q{Web workers demo}
  spec.homepage      = "https://github.com/lukemcfarlane"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler", "~> 1.11"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
  spec.add_runtime_dependency "rack"
  spec.add_runtime_dependency "rack-cors"
end
