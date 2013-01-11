###
A typical web search box. Ensures search string is non-empty, and pressing
Enter launches search.
###

class window.SearchBox2 extends TextBoxWithButton

  inherited:
    goButtonContent: [
      html: "<img src='http://quickui.org/release/resources/search_16x16.png'>"
      ref: "searchIcon"
    ]
    placeholder: "Search"
