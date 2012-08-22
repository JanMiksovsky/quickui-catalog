class window.PageContainer extends Page

  inherited:
    content:
      control: "TransitionPanel", ref: "PageContainer_content"

  # The current content.
  content: Control.chain( "$PageContainer_content", "content", ( content ) ->
    if content instanceof Page
      # Adopt the page's title as our own
      @title content.title()
  )

  # The current content, cast to a control.
  page: ( page ) ->
    if page is undefined
      return @content().control()
    else
      @content page
