GoogleAd = Control.sub(className: "GoogleAd")

# AdSense globals 
google_ad_client = undefined
google_ad_slot = undefined
google_ad_width = undefined
google_ad_height = undefined
GoogleAd::extend initialize: ->
  google_ad_client = "ca-pub-6699868724002545"
  @inDocument ->
    
    # Leaderboard 
    google_ad_slot = "7561741805"
    google_ad_width = 728
    google_ad_height = 90
    
    # Force (re?)load of AdSense script.
    $.get "http://pagead2.googlesyndication.com/pagead/show_ads.js"


