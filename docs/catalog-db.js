/*
 * The set of controls in the QuickUI Catalog.
 * Keep this list sorted by control name.
 */
var controlRecords = [
    {
        name: "AdPlaceholder",
        demoFunction: "demoTileAdPlaceholder",
        description: "Placeholder for a standard advertising unit"
    },
    {
        name: "AutoSizeTextBox",
        description: "A text area that expands to contain its text."
    },
    {
        name: "BasicButton",
        description: "Base class for buttons, handling mouse and disabled states."
    },
    {
        name: "BrowserSpecific",
        description: "Conditionally shows contents if the given browser is in use."
    },
    {
        name: "CalendarDay",
        description: "Shows a single day in a calendar."
    },
    {
        name: "CalendarDayButton",
        description: "Shows a single day in a calendar as a button."
    },
    {
        name: "CalendarMonth",
        description: "Shows a single month from a calendar as a standard seven-column table."
    },
    {
        name: "CalendarMonthNavigator",
        description: "Lets the user select a date, typically in the near future, by navigating through calendar months."
    },
    {
        name: "CalendarMonthWithHeadings",
        description: "Shows a calendar month, adding headings for the month name and days of the week."
    },
    {
        name: "CalendarWeek",
        description: "Shows a single week from a calendar as seven days in a row."
    },
    {
        name: "Carousel",
        demoFunction: "demoTileCarousel",
        description: "Lets user navigate laterally between panels with a sliding transition."
    },
    {
        name: "CheckBox",
        description: "A check box with an associated label."
    },
    {
        name: "Collapsible",
        description: "A panel that can be toggled between collapsed and expanded states."
    },
    {
        name: "CollapsibleWithHeadingButton",
        description: "A collapsible panel whose heading region includes a button that reflects the collapsed state."
    },
    {
        name: "ColorSwatch",
        description: "Shows a block of a CSS color."
    },
    {
        name: "ColorSwatchComboBox",
        description: "Lets the user type a CSS color name or value, or choose one from a list."
    },
    {
        name: "ColorSwatchTextBox",
        description: "Lets the user type a CSS color name or value."
    },
    {
        name: "ComboBox",
        description: "A text input area with a popup, which generally presents a list of choices."
    },
    {
        name: "Control",
        demoFunction: null,
        description: "The base class for all QuickUI controls."
    },
    {
        name: "DateComboBox",
        description: "Lets the user type a date or choose one from a dropdown calendar."
    },
    {
        name: "DateTextBox",
        description: "Lets the user type a date in several culture-specific formats."
    },
    {
        name: "DaysOfWeek",
        description: "Shows the names of the seven days of the week."
    },
    {
        name: "DeviceSpecific",
        demoFunction: null,
        description: "Conditionally loads different content, control class, or styles depending on the type of device."
    },
    {
        name: "Dialog",
        description: "Base class for modal dialogs"
    },
    {
        name: "Editable",
        demoFunction: null,
        description: "A control that supports its own in-place editing"
    },
    {
        name: "EditableText",
        description: "A text region which can be clicked to edit its contents."
    },
    {
        name: "Fader",
        description: "Fades out content on the right or bottom."
    },
    {
        name: "FlickrInterestingDay",
        description: "Shows the most interesting photo on Flickr for a given day."
    },
    {
        name: "FlickrInterestingNavigator",
        demoFunction: null,
        description: "Navigates the Interestingness photo collection on Flickr by month."
    },
    {
        name: "FlickrInterestingPhoto",
        demoFunction: null,
        description: "Shows a random recent photo from Flickr's Interestingness collection."
    },
    {
        name: "Gradient",
        description: "Cross-browser gradient."
    },
    {
        name: "HighlightEffects",
        description: "Apply effects on hover, which can include changing the item's size and position."
    },
    {
        name: "HintTextBox",
        description: "A text box that displays a hint (placeholder) when the text box is empty."
    },
    {
        name: "HorizontalPanels",
        description: "Positions panels on the left and/or right and gives the remaining space to a main content area."
    },
    {
        name: "LabeledColorSwatch",
        description: "Shows a color's name alongside a swatch of that color."
    },
    {
        name: "LabeledInput",
        demoFunction: null,
        description: "An HTML input control with an associated clickable label."                    
    },
    {
        name: "LateralNavigator",
        demoFunction: null,
        description: "Shows content with previous and next arrows on either side."
    },
    {
        name: "Link",
        description: "Base class for hyperlinks."
    },
    {
        name: "List",
        description: "Renders each element of a JavaScript array as a QuickUI control."
    },
    {
        name: "ListBox",
        description: "A list that supports single selection and keyboard navigation."
    },
    {
        name: "ListComboBox",
        description: "A ComboBox which presents its choices as a dropdown list."
    },
    {
        name: "ListInlay",
        description: "List that can have a single item expanded to show more detail."
    },
    {
        name: "Log",
        description: "Displays a growing text log showing, for example, the output of an ongoing process."
    },
    {
        name: "LoremIpsum",
        demoFunction: "demoTileLoremIpsum",
        description: "Shows paragraphs of placeholder text."
    },
    {
        name: "Menu",
        description: "A popup menu, often in a menu bar."
    },
    {
        name: "MenuBar",
        description: "A row of menus."
    },
    {
        name: "MenuItem",
        demoFunction: null,
        description: "A command in a menu."
    },
    {
        name: "MenuSeparator",
        demoFunction: null,
        description: "A line separating commands in a menu."
    },
    {
        name: "ModalOverlay",
        demoFunction: null,
        description: "A layer behind a modal Popup, such as a Dialog, which absorbs mouse clicks."
    },
    {
        name: "Modes",
        demoFunction: null,
        description: "Shows exactly one child at a time; useful for modes."
    },
    {
        name: "MonthAndYear",
        description: "Shows the month and year for a given date."
    },
    {
        name: "MonthName",
        description: "Shows the name of the month for a given date."
    },
    {
        name: "MultiListBox",
        description: "A list that supports multiple selection."
    },
    {
        name: "MultiListInlay",
        description: "List that can have multiple items expanded to show more detail."
    },
    {
        name: "Overlay",
        demoFunction: null,
        description: "A transparent or visible layer behind a Popup."
    },
    {
        name: "PackedColumns",
        demoFunction: null,
        description: "Packs its children into a dynamic number of columns of roughly equal height."
    },
    {
        name: "Page",
        demoFunction: null,
        description: "Base class for the overall top-level control for a page."
    },
    {
        name: "PanelWithOverflow",
        demoFunction: "demoTilePanelWithOverflow",
        description: "Allows any items which don't fit to overflow into a dropdown menu."
    },
    {
        name: "PersistentPanel",
        demoFunction: "demoTilePersistentPanel",
        description: "A panel whose contents will bump up against the top or bottom of a scrolling parent so as to remain always visible."
    },
    {
        name: "Popup",
        demoFunction: null,
        description: "Base class for popups, menus, dialogs — things that appear temporarily over other things."
    },
    {
        name: "PopupButton",
        description: "A button that produces a popup when clicked."
    },
    {
        name: "PopupSource",
        description: "A control with an associated Popup which will appear above or below the control."
    },
    {
        name: "RadioButton",
        description: "A radio button with an associated label."
    },
    {
        name: "Repeater",
        description: "Creates a certain number of instances of another control class."
    },
    {
        name: "RotatingPanelsWithDots",
        demoFunction: null, /* No demo; the animation would be too distracting */
        description: "Rotates once through a sequence of horizontally-arranged pages"
    },
    {
        name: "SearchBox",
        description: "A typical web search box."
    },
    {
        name: "Sequence",
        demoFunction: null,
        description: "An ordered sequence of elements which can be navigated through one at a time."
    },
    {
        name: "SequenceNavigator",
        demoFunction: null,
        description: "Lets the user navigate left and right through its contents."
    },
    {
        name: "SimpleFlexBox",
        demoFunction: null,
        description: "Allows use of simple CSS flexbox layouts in older browsers."
    },
    {
        name: "SlidingPanels",
        demoFunction: null,
        description: "Arranges its children as page on a horizontally sliding strip."
    },
    {
        name: "SlidingPanelsWithDots",
        description: "Presents children on a horizontally scrolling strip, with a series of dots to navigate the pages."
    },
    {
        name: "Sprite",
        description: "A basic CSS sprite."
    },
    {
        name: "SpriteButton",
        description: "A button that uses a Sprite for its background."
    },
    {
        name: "Tab",
        description: "A tabbed page which can be hosted in a Tabs."
    },
    {
        name: "Tabs",
        demoFunction: "demoTileTabs",
        description: "A set of pages which can be navigated by a set of tab buttons across the top."
    },
    {
        name: "Tag",
        description: "Formats its content as an XML tag."
    },
    {
        name: "TextBox",
        description: "Base class for text input controls."
    },
    {
        name: "TextBoxWithButton",
        description: "A control with a content area (usually some form of text box) and an associated \"Go\" button."
    },
    {
        name: "TextCondenser",
        description: "Switches to a condensed font when necessary to squeeze in more text."
    },
    {
        name: "ToggleButton",
        description: "Button that can track a selected state."
    },
    {
        name: "TransientMessage",
        description: "A message which briefly appears on a page before automatically disappearing."
    },
    {
        name: "ValidatingTextBox",
        description: "Verifies that text box content meets some conditions."
    },
    {
        name: "VerticalAlign",
        description: "Vertically aligns arbitrary contents."
    },
    {
        name: "VerticalPanels",
        description: "Positions panels on the top and/or bottom and gives the remaining space to a main content area."
    }
];
