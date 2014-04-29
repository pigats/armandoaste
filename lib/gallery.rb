class Gallery

  def initialize(folder)
    @serverside_path = "./public/images/#{folder}/"
    @clientside_path = "/images/#{folder}/"
  end

  def images 
    @images || Dir.open(@serverside_path).to_a.sort.delete_if {|f| f.match(/^\..*/) or File.directory?(@serverside_path + f) }.map { |f| {fullres_src: @clientside_path + f, thumb_src: @clientside_path + 'thumbs/thumb_' + f} }
  end

end
