###
Shows a random photo from Flickr's Interestingness collection for a recent day.
By default, this can be used 100 times before it starts repeating photos.

This gets photos from the day before yesterday in the current time zone.
This is done because yesterday in the current time zone may still be "today" in
Flickr's time zone, and Flickr doesn't make photos available for the current day. 
###

class window.FlickrInterestingPhoto extends Control

  # Your Flickr API key. By default, this uses the QuickUI account API key.
  # Set this to your own key before the first call to this control.
  @apiKey: "c3685bc8d8cefcc1d25949e4c528cbb0"

  tag: "img"

  initialize: ->
    @on "load", ->

      # HACK for IE. When the load event is triggered, IE reports the
      # width of the img element as the width of its own little image
      # placeholder icon. This stinks -- there's no way to get the
      # correct width or height until sometime after the load event
      # completes.
      # 
      # As a workaround, if we're in IE and see that the width is 28px,
      # we assume we're dealing with the image placeholder icon instead
      # of the real image. By forcing the width to "auto", IE reports the
      # correct photo width (and height) instead.
      # 
      # This allows anyone listening for the layout event to get
      # the correct dimensions of the photo, instead of the dimensions
      # of the image placeholder icon. 
      control = Control( this )
      control.css "width", "auto"  if Control.browser.msie and parseInt( control.width() ) is 28
      control.checkForSizeChange()

    photo = @photo()
    @reload()  if not photo or photo.length is 0

  # Return a (somewhat) random photo from the Interestingness collection.
  # The set of photos are obtained only once per page; once the set is
  # exhausted, subsequent calls will cycle through the set. 
  @getRandomPhoto: ( callback, size ) ->
    @getFlickrInterestingPhotos().done ( flickrPhotos ) =>
      @_counter = ( if ( @_counter >= 0 ) then ( @_counter + 1 ) % flickrPhotos.length else 0 )
      flickrPhoto = flickrPhotos[@_counter]
      photo = @getFlickrImageSrc( flickrPhoto, size )
      callback photo

  @getFlickrInterestingPhotos: ->
    unless @_promise
      
      # This is the first request for photos.             
      deferred = new jQuery.Deferred()
      @_promise = deferred.promise()
      day = new Date()
      day.setDate day.getDate() - 2 # Day before yesterday
      flickrDate = @_formatFlickrDate( day )
      params =
        method: "flickr.interestingness.getList"
        date: flickrDate
        per_page: 100
      @getFlickrPhotos params, ( flickrPhotos ) =>
        # Shuffle the photos before returning them.
        @_shuffle flickrPhotos
        @_flickrPhotos = flickrPhotos
        deferred.resolve flickrPhotos

    @_promise

  @getFlickrPhotos: ( params, callback ) ->
    baseUrl = "http://api.flickr.com/services/rest/"
    url = baseUrl + "?api_key=" + @apiKey + @_formatUrlParams( params ) + "&format=json" + "&jsoncallback=?"
    $.getJSON url, ( data ) ->
      callback data.photos.photo  if data and data.photos

  @getFlickrImageSrc: ( flickrPhoto, size ) ->
    sizeParam = ( ( if size then "_" + size else "" ) )
    "http://farm" + flickrPhoto.farm + ".static.flickr.com/" + flickrPhoto.server + "/" + flickrPhoto.id + "_" + flickrPhoto.secret + sizeParam + ".jpg"

  @getFlickrImageHref: ( flickrPhoto ) ->
    "http://flickr.com/photo.gne?id=" + flickrPhoto.id

  # Reload the photo.
  reload: Control.iterator( ->
    FlickrInterestingPhoto.getRandomPhoto( ( photo ) =>
      @prop "src", photo
    , @photoSize() )
  )

  # The location of the current photo image.
  photo: Control.chain( "attr/src" )

  # The size of photo to show.
  # 
  # This uses the size suffixes from http://www.flickr.com/services/api/misc.urls.html
  # s   small square 75x75
  # t   thumbnail, 100 on longest side
  # m   small, 240 on longest side
  # -   medium, 500 on longest side
  # z   medium 640, 640 on longest side
  # o   original image, either a jpg, gif or png, depending on source format
  # 
  # If this property is not set, the photo will be medium size.
  photoSize: Control.property( ->
    photo = @photo()
    @reload()  if photo and photo.length > 0
  )

  # Return a date in YYYY-MM-DD format.
  @_formatFlickrDate: ( date ) ->
    year = date.getFullYear()
    month = date.getMonth() + 1
    day = date.getDate()
    s = year + "-" + ( ( if ( month < 10 ) then "0" else "" ) ) + month + "-" + ( ( if ( day < 10 ) then "0" else "" ) ) + day
    s
  
  # Convert the given params dictionary into a string that can be
  # passed on a URL.
  @_formatUrlParams: ( params ) ->
    s = ""
    $.each params, ( key, value ) ->
      s += "&" + key + "=" + value
    s

  # Perform a Fisher-Yates shuffle.
  # From http://sedition.com/perl/javascript-fy.html
  @_shuffle: ( array ) ->
    i = array.length - 1

    while i >= 0
      j = Math.floor( Math.random() * ( i + 1 ) )
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
      i--
