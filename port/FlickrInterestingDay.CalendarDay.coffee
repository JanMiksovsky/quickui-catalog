###
Shows the most interesting photo on Flickr for a given day. 
###

class window.FlickrInterestingDay extends CalendarDay

  inherited:
    content: [
      html: "<div />"
      ref: "FlickrInterestingDay_content"
    ,
      html: "<a />"
      ref: "link"
      content: [
        html: "<img />"
        ref: "image"
      ]
    ]
    generic: "false"

  # True if the control should automatically load the photo when the date
  # is set. Default is false.
  autoLoad: Control.property.bool( ( autoLoad ) ->
    @loadPhoto()  if autoLoad and not @image()?
  )

  # The date to show.
  date: ( date ) ->
    result = super date
    if date isnt undefined
      @image( null ).href null
      @loadPhoto()  if @autoLoad()
    result

  content: Control.chain "$FlickrInterestingDay_content", "content"

  @getInterestingPhotoForDate: ( date, callback ) ->
    flickrDate = @_formatFlickrDate( date )
    cachedPhoto = @_cache[flickrDate]
    if cachedPhoto
      callback cachedPhoto
      return
    params =
      method: "flickr.interestingness.getList"
      date: flickrDate
      per_page: 1
    @getFlickrPhotos params, ( flickrPhotos ) =>
      if flickrPhotos and flickrPhotos.length > 0
        first = flickrPhotos[0]
        photo =
          src: @getFlickrImageSrc( first, "s" ) # Small thumbnail
          href: @getFlickrImageHref( first )

        @_cache[flickrDate] = photo
        callback photo

  @getFlickrPhotos: ( params, callback ) ->
    baseUrl = "http://api.flickr.com/services/rest/"
    
    # Note: JSONP in jQuery usually calls for callback=?, but the Flickr
    # API wants jsoncallback=?. Thankfully, jQuery supports that.
    url = baseUrl + "?api_key=" + @_flickrApiKey + @_formatUrlParams( params ) + "&format=json" + "&jsoncallback=?"
    $.getJSON( url ).success ( data ) ->
      callback data.photos.photo  if data and data.photos

  @getFlickrImageSrc: ( flickrPhoto, size ) ->
    sizeParam = ( ( if size then "_" + size else "" ) )
    "http://farm" + flickrPhoto.farm + ".static.flickr.com/" + flickrPhoto.server + "/" + flickrPhoto.id + "_" + flickrPhoto.secret + sizeParam + ".jpg"

  @getFlickrImageHref: ( flickrPhoto ) ->
    "http://flickr.com/photo.gne?id=" + flickrPhoto.id

  # The location of the Flickr page for the photo.
  href: Control.chain "$link", "attr/href"

  # The location of the photo image on Flickr.
  image: Control.chain "$image", "attr/src"

  # Load the photo for the given date.
  loadPhoto: Control.iterator( ->
    date = @date()
    
    # Flickr only has a photo for dates entirely in the past (not for today).
    if date and date < CalendarDay.today()
      FlickrInterestingDay.getInterestingPhotoForDate date, ( photo ) =>
        # Double-check we got a photo, and also check that the date
        # hasn't been changed since the photo was requested.
        @image photo.src  if photo and date is @date()
      # Clicking the day navigates to list of the day's interesting photos.
      baseUrl = "http://www.flickr.com/explore/interesting/"
      url = baseUrl + date.getFullYear() + "/" + ( date.getMonth() + 1 ) + "/" + date.getDate()
      @href url
  )
  
  # Cache of photos already loaded, indexed by Flickr-style date string. 
  @_cache: {}
  
  # Default day is *yesterday* (since we need a date in the past).
  _defaultDate: ->
    date = CalendarDay.today()
    date.setDate date.getDate() - 1
    date
  
  # Please replace with your own API key.
  @_flickrApiKey: "c3685bc8d8cefcc1d25949e4c528cbb0"
  
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
