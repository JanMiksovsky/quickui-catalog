/*
 * The set of controls in the QuickUI Catalog.
 * Keep this list sorted by control name.
 */
var controlRecords = [
    {
        name: "AutoSizeTextBox",
        description: "A text area that expands to contain its text."
    },
    {
        name: "BrowserSpecific",
        demoClass: "BrowserSpecificDemo",
        description: "Conditionally shows contents if the given browser is in use."
    },
    {
        name: "ButtonBase",
        demoClass: "ButtonBaseDemo",
        description: "Base class for buttons, handling mouse and disabled states."
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
    /*
    {
        name: "CatalogPage",
        demoClass: "",
        description: "Page template for entries in the QuickUI Catalog."
    },
    */
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
        name: "DaysOfWeek",
        description: "Shows the names of the seven days of the week."
    },
    {
        name: "DeviceSpecific",
        demoClass: "DeviceSpecificDemo",
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
        name: "Gradient",
        demoClass: "GradientDemo",
        description: "Cross-browser gradient."
    },
    {
        name: "HasPopup",
        demoClass: "HasPopupDemo",
        description: "A control with an associated Popup which will appear above or below the control."
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
        name: "LateralNavigator",
        description: "Shows content with a heading and previous/next arrows."
    },
    {
        name: "List",
        demoClass: "ListDemo",
        description: "Renders each element of a JavaScript array as a QuickUI control."
    },
    {
        name: "ListComboBox",
        demoClass: "ListComboBoxDemo",
        description: "A ComboBox which presents its choices as a dropdown list."
    },
    {
        name: "LoremIpsum",
        description: "Shows paragraphs of placeholder text."
    },
    {
        name: "MonthName",
        description: "Shows the name of the month for a given date."
    },
    {
        name: "Page",
        demoClass: "",
        description: "Base class for the overall top-level control for a page."
    },
    {
        name: "Popup",
        demoClass: "",
        description: "Base class for popups, menus, dialogs — things that appear temporarily over other things."
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
        demoClass: "GoogleSearchBox",
        description: "A typical web search box"
    },
    {
        name: "SlidingPages",
        demoClass: "",
        description: "Arranges its children as page on a horizontally sliding strip"
    },
    {
        name: "SlidingPagesWithDots",
        demoClass: "SlidingPagesWithDotsDemo",
        description: "Presents children on a horizontally scrolling strip, with a series of dots to navigate the pages."
    },
    {
        name: "Sprite",
        demoClass: "SpriteDemo",
        description: "A basic CSS sprite"
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
        name: "Tag",
        demoClass: "TagDemo",
        description: "Formats its content as an XML tag."
    },
    {
        name: "TextBoxWithButton",
        demoClass: "",
        description: "A control with a content area (usually some form of text box) and an associated \"Go\" button."
    },
    {
        name: "TextCondenser",
        demoClass: "TextCondenserDemo",
        description: "Switches to a condensed font when necessary to squeeze in more text."
    },
    {
        name: "VerticalPanels",
        demoClass: "VerticalPanelsDemo",
        description: "Positions panels on the top and/or bottom and gives the remaining space to a main content area."
    }
];