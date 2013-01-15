###
Text box that parses dates.

If Globalize is installed, all of the current culture's local date formats are
supported, plus modified short date formats that permit a missing year or two-
digit year. If Globalize is not installed, a default date parser is used.
###

class window.DateTextBox extends ValidatingTextBox

  # The control's current culture.
  culture: (culture) ->
    result = @_super(culture)
    if culture isnt undefined
      @_updateDatePatterns()
      @_refresh()
    result

  # The date indicated in the text box.
  date: Control.property.date((date) ->
    previousDate = @_previousDate()
    previousTime = previousDate and previousDate.getTime()
    time = date and date.getTime()
    dateChanged = (previousTime isnt time)
    if dateChanged
      hasFocus = this[0] is document.activeElement
      
      # We updating the content only if the user isn't typing,
      # so as not to confuse them.
      @_refresh()  unless hasFocus
      @_previousDate(date).trigger "dateChanged", [date]
  )
  initialize: ->
    @blur => @_refresh()
    @_updateDatePatterns()

  # Returns true if the current date is valid. 
  valid: ->
    valid = @_super()
    
    # Convert content text to a date.
    content = @content()
    date = @_parseDate(content)
    @date date
    
    # If a date is supplied, it has to be valid.
    valid = valid and !!date  if content and content.length > 0
    valid

  # Use a culture's "short date" pattern (e.g., "M/d/yyyy") to determine
  # some abbreviated date patterns.
  # 
  # The first abbreviated pattern uses a short two-digit year ("M/d/yy")
  # instead of a full four-digit year. The second pattern omits the year
  # ("M/d"). These patterns are determined by looking for a full year
  # placeholder ("yyyy") and the culture's date separator ("/") immediately
  # before or after the year.
  _abbreviatedDatePatterns: (culture) ->
    patterns = []
    calendar = culture.calendar
    shortPattern = calendar.patterns.d
    fullYearPlaceholder = "yyyy"
    
    # Try replacing full four-digit year with short two-digit year.
    patterns.push shortPattern.replace(fullYearPlaceholder, "yy")  if shortPattern.indexOf(fullYearPlaceholder)
    
    # Try removing separator + year, then try removing year + separator.
    separator = calendar["/"]
    separatorThenYear = separator + fullYearPlaceholder
    yearThenSeparator = fullYearPlaceholder + separator
    if shortPattern.indexOf(separatorThenYear) >= 0
      patterns.push shortPattern.replace(separatorThenYear, "")
    else patterns.push shortPattern.replace(yearThenSeparator, "")  if shortPattern.indexOf(yearThenSeparator) >= 0
    patterns

  _datePatterns: Control.property()
  
  # Return the separator between dates.
  _dateSeparator: ->
    culture = @culture()
    calendar = (if culture then culture.calendar else DateTextBox)
    calendar["/"]

  _formatDate: (date) ->
    culture = @culture()
    formattedDate = undefined
    if culture
      formattedDate = Globalize.format(date, culture.calendar.patterns.d, culture)
    else
      formattedDate = (date.getMonth() + 1) + @_dateSeparator() + date.getDate() + @_dateSeparator() + date.getFullYear()
    formattedDate

  # Parse the given text as a date.
  # Use the culture's parser if available, otherwise use a default parser.
  _parseDate: (text) ->
    date = (if @culture() then Globalize.parseDate(text, @_datePatterns(), @culture()) else @_parseDateDefault(text))
    date

  # Basic date parser.
  # Parses the given text as a date and return the result.
  # Returns null if the text couldn't be parsed.
  # 
  # This handles the formats supported by the standard Date.parse(),
  # as well as handling a short year ("1/1/12") or missing year ("1/1").
  _parseDateDefault: (text) ->
    return null  if text is ""
    dateSeparator = @_dateSeparator()
    parts = text.split(dateSeparator)
    currentYear = (new Date()).getFullYear().toString()
    munged = undefined
    if parts.length is 2
      
      # Add on year
      munged = text + dateSeparator + currentYear
    else if parts.length is 3 and parts[2].length is 2
      
      # Convert short year to long year
      fullYear = currentYear.substring(0, 2) + parts[2]
      munged = parts[0] + dateSeparator + parts[1] + dateSeparator + fullYear
    else
      
      # Parse as is
      munged = text
    milliseconds = Date.parse(munged)
    date = (if isNaN(milliseconds) then null else new Date(milliseconds))
    date

  _refresh: ->
    date = @date()
    newContent = (if (not (date?)) then "" else @_formatDate(date))
    @content newContent  if @content() isnt newContent
    this

  _previousDate: Control.property.date()

  # If the culture's been set, we amend the list of support date patterns
  # to include some abbreviated patterns.
  _updateDatePatterns: ->
    datePatterns = null
    culture = @culture()
    if culture
      
      # Update our date patterns based on the new culture.
      abbreviatedDatePatterns = @_abbreviatedDatePatterns(culture)
      if abbreviatedDatePatterns.length > 0
        
        # Add our abbreviated patterns to all the culture's patterns.
        datePatterns = $.map(@culture().calendar.patterns, (pattern, name) ->
          pattern
        )
        datePatterns = datePatterns.concat(abbreviatedDatePatterns)
    @_datePatterns datePatterns


# Date separator, used when Globalize is not present.
DateTextBox[ "/" ] = "/"
