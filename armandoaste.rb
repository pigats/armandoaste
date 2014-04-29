require 'compass'
require 'sass'
require 'sinatra'
require 'json'
require 'haml'
require 'yaml'
require_relative 'lib/gallery'

configure do
  set :haml, {:format => :html5, :escape_html => false, :encoding => "utf-8"}
  set :sass, {:style => :compact, :debug_info => false}
  Compass.add_project_configuration(File.join(Sinatra::Application.root, 'config', 'compass.rb'))
end

get '/stylesheets/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass(:"stylesheets/#{params[:name]}.css", Compass.sass_engine_options )
end

get '/' do
  @background = "/images/armandoaste.jpg"
  haml :index
end

get '/retaggio' do
  @title = "Retaggio"
  @background = "/images/legacy.jpg"
  haml :retaggio
end

get '/imprese/:challenge' do 
  challenge = params[:challenge]
  @submenu = 'submenu_challenges'
  @gallery = Gallery.new(challenge).images
  @contents = YAML.load_file("./views/challenges/#{challenge}.yml")
  @background = @gallery[0][:fullres_src]
  haml :challenge
end