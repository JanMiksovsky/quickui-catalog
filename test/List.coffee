###
List tests
###

$ ->
    
  class SimpleItem extends Control
    constructor: -> return Control.coffee()
    foo: Control.property()
    bar: Control.property()


  test "List: map string items to content", ->
    $list = List.create
      items: [
        "One"
        "Two"
        "Three"
      ]
    equal $list.items().length, 3
    equal $list.children().length, 3
    equal $list.children().eq(0).text(), "One"
    equal $list.text(), "OneTwoThree"

    
  test "List: mapFunction specifies string name of property getter/setter", ->
    $list = List.create
      itemClass: SimpleItem
      mapFunction: "foo"
      items: [
        "One"
        "Two"
        "Three"
      ]
    $controls = $list.children().control()
    equal $controls.length, 3
    equal $controls.eq(0).foo(), "One"
    
    
  test "List: custom mapFunction getter/setter", ->
    $list = List.create
      itemClass: SimpleItem
      mapFunction: ( item ) ->
        if item is undefined
          {
            foo: @foo()
            bar: @bar()
          }
        else
          @properties item
      items: [
        { foo: "One", bar: 1 }
        { foo: "Two", bar: 2 }
        { foo: "Three", bar: 3 }
      ]
    $controls = $list.children().control()
    $c = $controls.eq(0)
    equal $c.foo(), "One"
    equal $c.bar(), 1
    $list.isDirty true # Clear list's cache of items
    item = $list.items()[0]
    equal item.foo, "One"
    equal item.bar, 1