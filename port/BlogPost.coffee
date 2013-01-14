window.BlogPost = Control.sub(
  className: "BlogPost"
  inherited:
    content: [" ",
      html: "<a target=\"_blank\" />"
      ref: "BlogPost_postTitle"
    , " ",
      html: "<div />"
      ref: "BlogPost_content"
    , " "]
    generic: "true"
)
BlogPost::extend
  content: Control.chain("$BlogPost_content", "content")
  entry: Control.property((entry) ->
    @postTitle entry.title
    @link entry.link
    @content entry.content
  )
  postTitle: Control.chain("$BlogPost_postTitle", "content")
  link: Control.chain("$BlogPost_postTitle", "prop/href")

