require 'image_science'

namespace 'thumbnails' do 
  PATH = './public/images'

  desc 'generate thumbnails'
  task :generate do
    Dir.open(PATH).to_a.delete_if {|f| f.match(/^\..*/)}.each do |d| 
      images_path = File.join(PATH, d)
      if File.directory?(images_path)
        thumbs_path = File.join(PATH, d, 'thumbs')
        Dir.mkdir(thumbs_path) unless File.exists?(thumbs_path)
        Dir.open(images_path).to_a.delete_if {|f| f.match(/^\..*/)}.each do |f|
          ImageScience.with_image(File.join(images_path, f)) do |img|
            img.cropped_thumbnail(36) do |thumb|
              thumb.save File.join(thumbs_path, "thumb_#{f}")
            end
          end unless File.directory?(File.join(images_path, f)) or File.exists?(File.join(thumbs_path, "thumb_#{f}"))
        end
      end
    end
  end


  desc 'clean thumbnails'
  task :clean do
    Dir.open(PATH).to_a.delete_if {|f| f.match(/^\..*/)}.each do |d| 
      images_path = File.join(PATH, d)
      FileUtils.rm_rf(File.join(images_path, 'thumbs'))
    end   
  end
end