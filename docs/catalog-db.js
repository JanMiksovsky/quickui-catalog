/*
 * The set of controls in the QuickUI Catalog.
 * Keep this list sorted by control name.
 */
var controlRecords = [
    {
        name: "AdPlaceholder",
        demoClass: "AdPlaceholderDemo",
        description: "Placeholder for a standard advertising unit"
    },
    {
        name: "AutoSizeTextBox",
        description: "A text area that expands to contain its text."
    },
    {
        name: "BasicButton",
        demoClass: "BasicButtonDemo",
        description: "Base class for buttons, handling mouse and disabled states."
    },
    {
        name: "BrowserSpecific",
        demoClass: "BrowserSpecificDemo",
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
        name: "CheckBox",
        demoClass: "CheckBoxDemo",
        description: "A check box with an associated label."
    },
    {
        name: "Collapsible",
        demoClass: "CollapsibleDemo",
        description: "A panel that can be toggled between collapsed and expanded states."
    },
    {
        name: "CollapsibleWithHeadingButton",
        demoClass: "CollapsibleWithHeadingButtonDemo",
        description: "A collapsible panel whose heading region includes a button that reflects the collapsed state."
    },
    {
        name: "ColorSwatch",
        demoClass: "ColorSwatchDemo",
        description: "Shows a block of a CSS color."
    },
    {
        name: "ColorSwatchButton",
        demoClass: "ColorSwatchButtonDemo",
        description: "A button that shows a color's name and color swatch."
    },
    {
        name: "ColorSwatchComboBox",
        demoClass: "ColorSwatchComboBoxDemo",
        description: "Lets the user type a CSS color name or value, or choose one from a list."
    },
    {
        name: "ColorSwatchTextBox",
        demoClass: "ColorSwatchTextBoxDemo",
        description: "Lets the user type a CSS color name or value."
    },
    {
        name: "ComboBox",
        demoClass: "ComboBoxDemo",
        description: "A text input area with a popup, which generally presents a list of choices."
    },
    {
        name: "Control",
        demoClass: "",
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
        demoClass: "", // "DeviceSpecificDemo",
        description: "Conditionally loads different content, control class, or styles depending on the type of device."
    },
    {
        name: "Dialog",
        demoClass: "DialogDemo",
        description: "Base class for modal dialogs"
    },
    {
        name: "Fader",
        demoClass: "FaderDemo",
        description: "Fades out content on the right or bottom."
    },
    {
        name: "FlickrInterestingDay",
        demoClass: "FlickrInterestingDayDemo",
        description: "Shows the most interesting photo on Flickr for a given day."
    },
    {
        name: "FlickrInterestingNavigator",
        demoClass: "",
        description: "Navigates the Interestingness photo collection on Flickr by month."
    },
    {
        name: "FlickrInterestingPhoto",
        demoClass: "",
        description: "Shows a random recent photo from Flickr's Interestingness collection."
    },
    {
        name: "Gradient",
        demoClass: "GradientDemo",
        description: "Cross-browser gradient."
    },
    {
        name: "HighlightEffects",
        demoClass: "HighlightEffectsDemo",
        description: "Apply effects on hover, which can include changing the item's size and position."
    },
    {
        name: "HintTextBox",
        demoClass: "HintTextBoxDemo",
        description: "A text box that displays a hint (placeholder) when the text box is empty."
    },
    {
        name: "HorizontalPanels",
        demoClass: "HorizontalPanelsDemo",
        description: "Positions panels on the left and/or right and gives the remaining space to a main content area."
    },
    {
        name: "LabeledInput",
        demoClass: "",
        description: "An HTML input control with an associated clickable label."                    
    },
    {
        name: "LateralNavigator",
        demoClass: "",
        description: "Shows content with a heading and previous/next arrows."
    },
    {
        name: "List",
        demoClass: "ListDemo",
        description: "Renders each element of a JavaScript array as a QuickUI control."
    },
    {
        name: "ListBox",
        demoClass: "ListBoxDemo",
        description: "A list that supports single selection and keyboard navigation."
    },
    {
        name: "ListComboBox",
        demoClass: "ListComboBoxDemo",
        description: "A ComboBox which presents its choices as a dropdown list."
    },
    {
        name: "ListInlay",
        demoClass: "ListInlayDemo",
        description: "List that can have a single item expanded to show more detail."
    },
    {
        name: "LoremIpsum",
        description: "Shows paragraphs of placeholder text."
    },
    {
        name: "Menu",
        demoClass: "MenuDemo",
        description: "A popup menu, often in a menu bar."
    },
    {
        name: "MenuBar",
        demoClass: "MenuBarDemo",
        description: "A row of menus."
    },
    {
        name: "MenuItem",
        demoClass: "",
        description: "A command in a menu."
    },
    {
        name: "MenuSeparator",
        demoClass: "",
        description: "A line separating commands in a menu."
    },
    {
        name: "ModalOverlay",
        demoClass: "",
        description: "A layer behind a modal Popup, such as a Dialog, which absorbs mouse clicks."
    },
    {
        name: "MonthName",
        description: "Shows the name of the month for a given date."
    },
    {
        name: "MultiListBox",
        demoClass: "MultiListBoxDemo",
        description: "A list that supports multiple selection."
    },
    {
        name: "MultiListInlay",
        demoClass: "",
        description: "List that can have multiple items expanded to show more detail."
    },
    {
        name: "Overlay",
        demoClass: "",
        description: "A transparent or visible layer behind a Popup."
    },
    {
        name: "PackedColumns",
        demoClass: "",
        description: "Packs its children into a dynamic number of columns of roughly equal height."
    },
    {
        name: "Page",
        demoClass: "",
        description: "Base class for the overall top-level control for a page."
    },
    {
        name: "PanelWithOverflow",
        demoClass: "LaunchPanelWithOverflowDemo",
        description: "Allows any items which don't fit to overflow into a dropdown menu."
    },
    {
        name: "PersistentPanel",
        demoClass: "PersistentPanelDemo",
        description: "A panel whose contents will bump up against the top or bottom of a scrolling parent so as to remain always visible."
    },
    {
        name: "Popup",
        demoClass: "",
        description: "Base class for popups, menus, dialogs — things that appear temporarily over other things."
    },
    {
        name: "PopupButton",
        demoClass: "PopupButtonDemo",
        description: "A button that produces a popup when clicked."
    },
    {
        name: "PopupSource",
        demoClass: "PopupSourceDemo",
        description: "A control with an associated Popup which will appear above or below the control."
    },
    {
        name: "RadioButton",
        demoClass: "RadioButtonDemo",
        description: "A radio button with an associated label."
    },
    {
        name: "Repeater",
        demoClass: "RepeaterDemo",
        description: "Creates a certain number of instances of another control class."
    },
    {
        name: "RotatingPagesWithDots",
        demoClass: "", /* No demo; the animation would be too distracting */
        description: "Rotates once through a sequence of horizontally-arranged pages"
    },
    {
        name: "SampleSpriteButton",
        demoClass: "SampleSpriteButtonDemo",
        description: "A sample of how to create a new type of SpriteButton through subclassing."
    },
    {
        name: "SearchBox",
        description: "A typical web search box."
    },
    {
        name: "SimpleFlexBox",
        demoClass: "",
        description: "Allows use of simple CSS flexbox layouts in older browsers."
    },
    {
        name: "SlidingPages",
        demoClass: "",
        description: "Arranges its children as page on a horizontally sliding strip."
    },
    {
        name: "SlidingPagesWithDots",
        demoClass: "SlidingPagesWithDotsDemo",
        description: "Presents children on a horizontally scrolling strip, with a series of dots to navigate the pages."
    },
    {
        name: "Sprite",
        demoClass: "SpriteDemo",
        description: "A basic CSS sprite."
    },
    {
        name: "SpriteButton",
        demoClass: "",
        description: "A button that uses a Sprite for its background."
    },
    {
        name: "Switch",
        demoClass: "SwitchDemo",
        description: "Shows exactly one child at a time; useful for modes."
    },
    {
        name: "Tab",
        description: "A tabbed page which can be hosted in a TabSet."
    },
    {
        name: "TabSet",
        demoClass: "TabSetDemo",
        description: "A set of pages which can be navigated by a set of tab buttons across the top."
    },
    {
        name: "Tag",
        demoClass: "TagDemo",
        description: "Formats its content as an XML tag."
    },
    /*
    {
        name: "TextBoxWithButton",
        demoClass: "",
        description: "A control with a content area (usually some form of text box) and an associated \"Go\" button."
    },
    */
    {
        name: "TextCondenser",
        demoClass: "TextCondenserDemo",
        description: "Switches to a condensed font when necessary to squeeze in more text."
    },
    {
        name: "TransientMessage",
        demoClass: "TransientMessageDemo",
        description: "A message which briefly appears on a page before automatically disappearing."
    },
    {
        name: "ValidatingTextBox",
        demoClass: "ValidatingTextBoxDemo",
        description: "Verifies that text box content meets some conditions."
    },
    {
        name: "VerticalPanels",
        demoClass: "VerticalPanelsDemo",
        description: "Positions panels on the top and/or bottom and gives the remaining space to a main content area."
    }
];
