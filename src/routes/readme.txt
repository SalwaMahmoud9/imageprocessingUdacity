welcome in  image processing
you can access our home page from /api
to do any task on the image you should add it into this path "images/full", and we save resized images in "home/thumbnail"

resize(jpg):
    the mandatory is filename you don`t need to add width and height if you will use the same of the origional image in images/full
    /api/images?filename=[image file name from images/full]&width=[new width]&height=[new height]
    real example:/api/images?filenamefjord&width=200&height=200

extensions:(jpeg,png,jpg)
    default 'jpg'    
    to use read image with different extension(add extension without .): 
        /api/images?filename=[image file name from images/full]&width=[new width]&height=[new height]&ext=[ext]
    to use save image with different extension(add extension without .):
        /api/images?filename=[image file name from images/full]&width=[new width]&height=[new height]&outExtension=[outExtension]    

extra proccessing:
    you can flip, flop, or grayscale the image(just choose one of them) in "extra" parameter
    /api/images?filename=[image file name from images/full]&width=[new width]&height=[new height]&extra=flip
    /api/images?filename=[image file name from images/full]&width=[new width]&height=[new height]&extra=flop
    /api/images?filename=[image file name from images/full]&width=[new width]&height=[new height]&extra=grayscale

logger:
    you will find logger.txt to see when each image are processed or accessed (format[--imagename: accessed/created@time])    

created images` name and accessing saved images:
    we save each image in each size you use, so we use image name, width, and height in saved image`s file name
    also we load the saved image if you accessed an image url and it was proccessed before

note:
    you can use extension parameters with extra processing parameters regardless width and height means it can be included or not

some useful commands:
npm run build --to buid
npm run prettier --to run prettier"formatter"
npm run lint --to run lint 'show errors'
npm run test --to run test cases
npm run start --to start using image proccessing project                   in the browser

reference:
    https://www.youtube.com/watch?v=3aRXn8KENjM
    slack for question
    session lead