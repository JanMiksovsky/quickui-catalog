//
// AdPlaceholderDemo
//
AdPlaceholderDemo = Control.subclass({
    name: "AdPlaceholderDemo",
    content: [
        " ",
        {
            control: "AdPlaceholder",
            dimensions: "Button 2"
        },
        " "
    ]
});

//
// AutoSizeTextBoxDemo
//
AutoSizeTextBoxDemo = Control.subclass({
    name: "AutoSizeTextBoxDemo",
    content: [
        " ",
        "<div>Type as much text as you want:</div>",
        " ",
        {
            control: "AutoSizeTextBox"
        },
        " "
    ]
});

//
// BlueDotButton
//
BlueDotButton = Control.subclass({
    name: "BlueDotButton",
    content: [
        " ",
        {
            control: "ButtonBase",
            id: "button",
            generic: "false"
        },
        " "
    ]
});

//
// BrowserSpecificDemo
//
BrowserSpecificDemo = Control.subclass({
    name: "BrowserSpecificDemo",
    content: [
        " ",
        {
            control: "BrowserSpecific",
            style: "display: inline",
            webkit: "You are using WebKit.",
            msie: "You are using Internet Explorer.",
            mozilla: "You are using Firefox.",
            "default": "You are using some unknown browser."
        },
        " "
    ]
});

//
// ButtonBaseDemo
//
ButtonBaseDemo = Control.subclass({
    name: "ButtonBaseDemo",
    content: [
        " ",
        {
            control: "ButtonBase",
            content: "OK"
        },
        " ",
        {
            control: "ButtonBase",
            content: "Cancel"
        },
        " "
    ]
});

//
// CollapsibleDemo
//
CollapsibleDemo = Control.subclass({
    name: "CollapsibleDemo",
    content: [
        " ",
        {
            control: "Collapsible",
            heading: "Test",
            content: [
                " ",
                {
                    control: "LoremIpsum"
                },
                " "
            ]
        },
        " "
    ]
});

//
// ColorSwatchButtonDemo
//
ColorSwatchButtonDemo = Control.subclass({
    name: "ColorSwatchButtonDemo",
    content: [
        " ",
        {
            control: "ColorSwatchButton",
            content: "LightSeaGreen"
        },
        " "
    ]
});

//
// ColorSwatchComboBoxDemo
//
ColorSwatchComboBoxDemo = Control.subclass({
    name: "ColorSwatchComboBoxDemo",
    content: [
        " ",
        {
            control: "ColorSwatchComboBox",
            content: "SteelBlue"
        },
        " "
    ]
});

//
// ColorSwatchDemo
//
ColorSwatchDemo = Control.subclass({
    name: "ColorSwatchDemo",
    content: [
        " ",
        {
            control: "ColorSwatch",
            color: "IndianRed"
        },
        " "
    ]
});

//
// ColorSwatchTextBoxDemo
//
ColorSwatchTextBoxDemo = Control.subclass({
    name: "ColorSwatchTextBoxDemo",
    content: [
        " ",
        {
            control: "ColorSwatchTextBox",
            content: "LightSeaGreen"
        },
        " "
    ]
});

//
// ComboBoxDemo
//
ComboBoxDemo = Control.subclass({
    name: "ComboBoxDemo",
    content: [
        " ",
        {
            control: "ComboBox",
            popup: " You can populate a popup like this with choices for the user to pick. "
        },
        " "
    ]
});

//
// DateComboBoxDemo
//
DateComboBoxDemo = Control.subclass({
    name: "DateComboBoxDemo",
    content: [
        " ",
        {
            control: "DateComboBox",
            dropdownButtonContent: [
                " ",
                {
                    html: "<img src=\"/catalog/resources/calendar_alt_fill_16x16.png\" />",
                    id: "calendarIcon"
                },
                " "
            ]
        },
        " "
    ]
});

//
// DeviceSpecificDemo
//
DeviceSpecificDemo = Control.subclass({
    name: "DeviceSpecificDemo",
    content: [
        " ",
        {
            control: "DeviceSpecific",
            mobileClass: "Link",
            defaultClass: "SampleSpriteButton",
            mobile: "You are mobile",
            "default": "You are not mobile"
        },
        " "
    ]
});

//
// DialogDemo
//
DialogDemo = Control.subclass({
    name: "DialogDemo",
    content: [
        " ",
        {
            control: "Link",
            id: "dialogLink",
            content: "Click for a sample dialog"
        },
        " "
    ]
});
DialogDemo.prototype.extend({
    initialize: function() {
        this.$dialogLink().click( function() {
            Dialog.showDialog( SampleDialog );
        });
    }
});

//
// FaderDemo
//
FaderDemo = Control.subclass({
    name: "FaderDemo",
    content: [
        " ",
        {
            control: "Fader",
            style: "max-width: 175px;",
            content: " The glass is neither half-full nor half-empty: it's twice as big as it needs to be. "
        },
        " ",
        {
            control: "Fader",
            style: "max-width: 350px;",
            content: " The glass is neither half-full nor half-empty: it's twice as big as it needs to be. "
        },
        " ",
        {
            control: "Fader",
            content: " The glass is neither half-full nor half-empty: it's twice as big as it needs to be. "
        },
        " "
    ]
});

//
// FlickrInterestingnessDayDemo
//
FlickrInterestingnessDayDemo = Control.subclass({
    name: "FlickrInterestingnessDayDemo",
    content: [
        " ",
        {
            control: "FlickrInterestingnessDay",
            autoLoad: "true"
        },
        " "
    ]
});

//
// FlickrInterestingnessNavigator
//
FlickrInterestingnessNavigator = CalendarMonthNavigator.subclass({
    name: "FlickrInterestingnessNavigator",
    dayClass: "FlickrInterestingnessDay",
    dayNameFormat: "namesAbbr",
    showTodayButton: "false",
    previousButtonContent: [
        " ",
        "<span class=\"chevron\">«</span>",
        " ",
        {
            control: "MonthName",
            id: "previousMonthName",
            "class": "monthButtonName"
        },
        " "
    ],
    nextButtonContent: [
        " ",
        {
            control: "MonthName",
            id: "nextMonthName",
            "class": "monthButtonName"
        },
        " ",
        "<span class=\"chevron\">»</span>",
        " "
    ]
});
FlickrInterestingnessNavigator.prototype.extend({
    
    culture: function( culture ) {
        var result = this._super( culture );
        if ( culture !== undefined ) {
            this.$previousMonthName().culture( culture );
            this.$nextMonthName().culture( culture );
        }
        return result;
    },
    
    date: function( date ) {
        result = this._super( date );
        if ( date !== undefined ) {
            
            // Show next/previous month names.
            var previousMonth = new Date( date.getTime() );
            previousMonth.setMonth( previousMonth.getMonth() - 1 );
            this.$previousMonthName()
                .month( previousMonth.getMonth() )
                .trigger( "sizeChanged" );

            var nextMonth = new Date( date.getTime() );
            nextMonth.setMonth( nextMonth.getMonth() + 1 );
            this.$nextMonthName()
                .month( nextMonth.getMonth() )
                .trigger( "sizeChanged" );
            
            // Disable navigation into future.
            var today = new Date();
            nextMonth.setDate( 1 );
            this.nextButtonDisabled( nextMonth > today );
                        
            this.$calendar().$days().loadPhoto();
        }
        return result;
    }
        
});

//
// FlickrInterestingPhotoDemo
//
FlickrInterestingPhotoDemo = Control.subclass({
    name: "FlickrInterestingPhotoDemo",
    content: [
        " ",
        {
            control: "FlickrInterestingPhoto",
            id: "photo"
        },
        " "
    ]
});
FlickrInterestingPhotoDemo.prototype.extend({
    initialize: function() {
        this.$photo()
            .click( function( event ) {
                $( event.target ).control()
                    .css( "opacity", "0.25" )
                    .reload();
            })
            .load( function( event ) {
                $( event.target ).css( "opacity", "1.0" );
            });
    }
});

//
// GoogleSearchBox
//
GoogleSearchBox = Control.subclass({
    name: "GoogleSearchBox",
    content: [
        " ",
        {
            control: "SearchBox",
            query: "http://www.google.com/search?q=%s",
            hint: "Search Google"
        },
        " "
    ]
});

//
// GradientDemo
//
GradientDemo = Control.subclass({
    name: "GradientDemo",
    content: [
        " ",
        {
            control: "Gradient",
            start: "#808080",
            end: "#f0f0f0"
        },
        " "
    ]
});

//
// HasPopupDemo
//
HasPopupDemo = Control.subclass({
    name: "HasPopupDemo",
    content: [
        " ",
        {
            control: "HasPopup",
            openOnClick: "true",
            closeOnInsideClick: "true",
            popup: " And here's the popup! ",
            content: " Click me a popup  "
        },
        " "
    ]
});

//
// HighlightEffectsDemo
//
HighlightEffectsDemo = Control.subclass({
    name: "HighlightEffectsDemo",
    content: [
        " ",
        {
            control: "HighlightEffects",
            content: "1"
        },
        " ",
        {
            control: "HighlightEffects",
            content: "2"
        },
        " ",
        {
            control: "HighlightEffects",
            content: "3"
        },
        " ",
        {
            control: "HighlightEffects",
            content: "4"
        },
        " ",
        {
            control: "HighlightEffects",
            content: "5"
        },
        " "
    ]
});
HighlightEffectsDemo.prototype.extend({
    initialize: function() {
        
        // Remove extra white space nodes so inline controls touch.
        this.contents()
            .filter( function() { return this.nodeType === 3; })
            .remove();
        
        /*
         * On hover, we'll grow the element in each direction by 5px, and
         * fade in some higher-contrast colors.
         */
        this.children().control()
            .effects({
                "background-color": "#ffffff",
                "border-color": "#ffd700",
                "color": "#000000",
                "height": "50px",
                "left": "-5px",
                "top": "-5px",
                "width": "50px"
            });
    }
});

//
// HintTextBoxDemo
//
HintTextBoxDemo = Control.subclass({
    name: "HintTextBoxDemo",
    content: [
        " ",
        {
            html: "<div />",
            content: [
                " ",
                {
                    control: "HintTextBox",
                    hint: "Type here"
                },
                " "
            ]
        },
        " "
    ]
});

//
// HorizontalPanelsDemo
//
HorizontalPanelsDemo = Control.subclass({
    name: "HorizontalPanelsDemo",
    content: [
        " ",
        {
            control: "HorizontalPanels",
            left: "Left panel",
            content: "Main content",
            right: "Right panel"
        },
        " "
    ]
});

//
// LaunchPanelWithOverflowDemo
//
LaunchPanelWithOverflowDemo = Control.subclass({
    name: "LaunchPanelWithOverflowDemo",
    content: " Click for a <a href=\"/catalog/PanelWithOverflow/demo.html\" target=\"_blank\">demo in a separate window</a>, then resize the resulting window to see the overflow behavior. "
});

//
// ListBoxDemo
//
ListBoxDemo = Control.subclass({
    name: "ListBoxDemo",
    content: [
        " ",
        {
            control: "ListBox",
            id: "colors",
            itemClass: "ColorSwatchButton"
        },
        " ",
        {
            html: "<div />",
            id: "status",
            content: [
                " Selected color: ",
                {
                    html: "<span />",
                    id: "color"
                },
                " "
            ]
        },
        " "
    ]
});
ListBoxDemo.prototype.extend({
    initialize: function() {
        var self = this;
        this.$colors()
            .items([
                "Blue",
                "DarkGreen",
                "DarkBlue",
                "DarkRed",
                "Gold",
                "Goldenrod",
                "Green",
                "LightGray",
                "LightSeaGreen",
                "LightSkyBlue",
                "Red",
                "Teal",
                "SteelBlue",
                "Yellow",
                "YellowGreen"
            ])
            .on( "selectionChanged", function() {
                var color = self.$colors().selectedItem();
                self.$color().content( color );
            });
    }
});

//
// ListComboBoxDemo
//
ListComboBoxDemo = Control.subclass({
    name: "ListComboBoxDemo",
    content: [
        " ",
        {
            control: "ListComboBox",
            id: "comboBox"
        },
        " "
    ]
});
ListComboBoxDemo.prototype.extend({
    initialize: function() {
        this.$comboBox().items([
            "Canary",
            "Cat",
            "Cockatiel",
            "Dog",
            "Ferret",
            "Finch",
            "Fish",
            "Guinea Pig",
            "Hamster",
            "Lizard",
            "Parakeet",
            "Parrot",
            "Rabbit",
            "Turtle"
        ]);
    }
});

//
// ListDemo
//
ListDemo = Control.subclass({
    name: "ListDemo",
    content: [
        " ",
        {
            control: "List",
            id: "buttonList",
            itemClass: "SampleSpriteButton"
        },
        " "
    ]
});
ListDemo.prototype.extend({
    initialize: function() {
        
        // Sample array.
        var data = [
            "One",
            "Two",
            "Three",
            "Four"
        ];
        
        // Render each member of the array as a list item.
        this.$buttonList().items(data);
        
        // Handle clicks on the buttons.
        this.click(function(event) {
            var button = $(event.target).closest(".SampleSpriteButton").control();
            if ( button ) {
                alert( button.content() );
            }
        });
    }
});

//
// MultiListBoxDemo
//
MultiListBoxDemo = Control.subclass({
    name: "MultiListBoxDemo",
    content: [
        " ",
        {
            control: "MultiListBox",
            id: "animals"
        },
        " ",
        {
            html: "<div />",
            id: "status",
            content: [
                " Selected items: ",
                {
                    html: "<span>0</span>",
                    id: "count"
                },
                " "
            ]
        },
        " "
    ]
});
MultiListBoxDemo.prototype.extend({
    initialize: function() {
        var self = this;
        this.$animals()
            .items([
                "Canary",
                "Cat",
                "Cockatiel",
                "Dog",
                "Ferret",
                "Finch",
                "Fish",
                "Guinea Pig",
                "Hamster",
                "Lizard",
                "Parakeet",
                "Parrot",
                "Rabbit",
                "Teal",
                "Turtle"
            ])
            .on( "selectionChanged", function() {
                var count = self.$animals().selectedControls().length;
                self.$count().content( count );
            });
    }
});

//
// PanelWithOverflowDemo
//
PanelWithOverflowDemo = Control.subclass({
    name: "PanelWithOverflowDemo",
    content: [
        " ",
        {
            control: "PanelWithOverflow",
            id: "toolbar",
            content: [
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "One"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Two"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Three"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Four"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Five"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Six"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Seven"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Eight"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Nine"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Ten"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Eleven"
                },
                " ",
                {
                    control: "ButtonBase",
                    "class": "toolbarButton",
                    generic: "false",
                    content: "Twelve"
                },
                " "
            ]
        },
        " "
    ]
});
PanelWithOverflowDemo.prototype.extend({
    initialize: function() {
        // Remove extra white space nodes so inline controls touch.
        var content = this.$toolbar().content();
        var stripped = $.grep( content, function( item ) {
            return typeof item !== "string";
        });
        this.$toolbar().content( stripped );
    }
});

//
// PersistentPanelDemo
//
PersistentPanelDemo = Control.subclass({
    name: "PersistentPanelDemo",
    content: [
        " Click for a full-page ",
        {
            control: "Link",
            href: "/catalog/PersistentPanel/persistentPanelSideDemo.html",
            target: "_blank",
            content: "side-panel demo"
        },
        " or ",
        {
            control: "Link",
            href: "/catalog/PersistentPanel/persistentPanelToolbarDemo.html",
            target: "_blank",
            content: "toolbar demo"
        },
        ". "
    ]
});

//
// PersistentPanelSideDemo
//
PersistentPanelSideDemo = Page.subclass({
    name: "PersistentPanelSideDemo",
    fill: "true",
    content: [
        " ",
        {
            control: "HorizontalPanels",
            id: "container",
            fill: "true",
            content: [
                " ",
                {
                    html: "<div />",
                    id: "text",
                    content: [
                        " ",
                        "<h1>\n                        Scroll this page, keeping an eye on the right side.\n                    </h1>",
                        " ",
                        {
                            control: "LoremIpsum",
                            paragraphs: "30"
                        },
                        " "
                    ]
                },
                " "
            ],
            right: [
                " ",
                {
                    html: "<div />",
                    id: "rightPanel",
                    content: [
                        " ",
                        {
                            control: "AdPlaceholder",
                            id: "ad",
                            dimensions: "Medium Rectangle"
                        },
                        " ",
                        "<div class=\"right\">\n                        Any content above the panel will scroll away.\n                    </div>",
                        " ",
                        {
                            control: "PersistentPanel",
                            content: [
                                " ",
                                {
                                    html: "<div>\n                            This panel is persistent, so it won't scroll away.\n                            This is useful for any information or controls which\n                            must be visible at all times.\n                        </div>",
                                    id: "important"
                                },
                                " "
                            ]
                        },
                        " ",
                        "<div class=\"right\">\n                        Any content below the panel will also scroll away.\n                    </div>",
                        " "
                    ]
                },
                " "
            ]
        },
        " "
    ]
});

//
// PersistentPanelToolbarDemo
//
PersistentPanelToolbarDemo = Page.subclass({
    name: "PersistentPanelToolbarDemo",
    content: [
        " ",
        {
            html: "<div class=\"normal\" />",
            content: [
                " ",
                {
                    control: "AdPlaceholder",
                    dimensions: "Leaderboard"
                },
                " ",
                "<p>\n                This area above the persistent panel (here, a toolbar) can hold\n                content that should be initially visible, but which can later\n                scroll out of the way. Examples: ads, top navigation.\n            </p>",
                " "
            ]
        },
        " ",
        {
            control: "PersistentPanel",
            content: [
                " ",
                {
                    html: "<div />",
                    id: "toolbar",
                    content: [
                        " This toolbar is always available: ",
                        {
                            control: "ButtonBase",
                            content: "Button 1"
                        },
                        " ",
                        {
                            control: "ButtonBase",
                            content: "Button 2"
                        },
                        " ",
                        {
                            control: "ButtonBase",
                            content: "Button 3"
                        },
                        " "
                    ]
                },
                " "
            ]
        },
        " ",
        {
            html: "<div class=\"normal\" />",
            content: [
                " ",
                "<h1>\n                Scroll this page, keeping an eye on the toolbar.\n            </h1>",
                " ",
                {
                    control: "LoremIpsum",
                    paragraphs: "30"
                },
                " "
            ]
        },
        " "
    ]
});

//
// RepeaterDemo
//
RepeaterDemo = Control.subclass({
    name: "RepeaterDemo",
    content: [
        " ",
        {
            control: "Repeater",
            controlClass: "ButtonBase",
            count: "5",
            content: "Hello"
        },
        " "
    ]
});

//
// RotatingPagesWithDotsDemo
//
RotatingPagesWithDotsDemo = Control.subclass({
    name: "RotatingPagesWithDotsDemo",
    content: [
        " ",
        {
            control: "RotatingPagesWithDots",
            pageButtonClass: "BlueDotButton",
            rotationInterval: "1500",
            content: " <div class=\"sample\" style=\"font-family: Helvetica\">Helvetica</div> <div class=\"sample\" style=\"font-family: Times New Roman\">Times</div> <div class=\"sample\" style=\"font-family: Tahoma\">Tahoma</div> <div class=\"sample\" style=\"font-family: Trebuchet\">Trebuchet</div> <div class=\"sample\" style=\"font-family: Verdana\">Verdana</div> "
        },
        " "
    ]
});

//
// SampleDialog
//
SampleDialog = Dialog.subclass({
    name: "SampleDialog",
    content: [
        " ",
        "<h1>Sample dialog</h1>",
        " ",
        {
            control: "LoremIpsum",
            paragraphs: "1"
        },
        " ",
        {
            control: "SampleSpriteButton",
            id: "buttonClose",
            content: "Close"
        },
        " "
    ]
});
SampleDialog.prototype.extend({
    initialize: function() {
        var self = this;
        this.$buttonClose().click(function() {
            self.close();
        });
    }
});

//
// SampleSpriteButtonDemo
//
SampleSpriteButtonDemo = Control.subclass({
    name: "SampleSpriteButtonDemo",
    content: [
        " ",
        {
            control: "SampleSpriteButton",
            content: "Save"
        },
        " ",
        {
            control: "SampleSpriteButton",
            content: "Don't Save"
        },
        " ",
        {
            control: "SampleSpriteButton",
            disabled: "true",
            content: "Cancel"
        },
        " "
    ]
});
SampleSpriteButtonDemo.prototype.extend({
    initialize: function() {
        this.find(".SampleSpriteButton").click(function() {
            alert("You clicked \"" + $(this).control().content() + "\".");
        });
    }
});

//
// SlidingPagesWithDotsDemo
//
SlidingPagesWithDotsDemo = Control.subclass({
    name: "SlidingPagesWithDotsDemo",
    content: [
        " ",
        {
            control: "SlidingPagesWithDots",
            pageButtonClass: "BlueDotButton",
            content: " <div class=\"page\">Bird</div> <div class=\"page\">Cat</div> <div class=\"page\">Dog</div> <div class=\"page\">Fish</div> "
        },
        " "
    ]
});

//
// SpriteDemo
//
SpriteDemo = Control.subclass({
    name: "SpriteDemo",
    content: [
        " ",
        {
            html: "<div class=\"panel\" />",
            content: [
                " ",
                "<p>\n            Click one:\n        </p>",
                " ",
                {
                    html: "<img src=\"/catalog/SampleSpriteButton/buttonStates.png\" />",
                    id: "image"
                },
                " "
            ]
        },
        " ",
        {
            html: "<div class=\"panel\" />",
            content: [
                " ",
                "<p>Selected:</p>",
                " ",
                {
                    control: "Sprite",
                    id: "sprite",
                    image: "url(/catalog/SampleSpriteButton/buttonStates.png)",
                    currentCell: "4",
                    cellHeight: "32"
                },
                " "
            ]
        },
        " "
    ]
});
SpriteDemo.prototype.extend({
    initialize: function() {
        var self = this;
        this.$image().click(function(event) {
            var mouseY = event.pageY - $(this).offset().top;
            var cellIndex = Math.floor(mouseY / self.$sprite().cellHeight());
            self.$sprite().currentCell(cellIndex);
        });
    }
});

//
// SwitchDemo
//
SwitchDemo = Control.subclass({
    name: "SwitchDemo",
    content: [
        " ",
        {
            control: "Switch",
            id: "switchMode",
            content: [
                " ",
                {
                    html: "<input type=\"text\" value=\"Hello, world.\" />",
                    id: "textEditable"
                },
                " ",
                {
                    html: "<div />",
                    id: "textReadOnly"
                },
                " "
            ]
        },
        " ",
        {
            html: "<input type=\"radio\" name=\"mode\" checked=\"checked\" />",
            id: "modeEdit"
        },
        " ",
        "<label for=\"modeEdit\">Editable</label>",
        " ",
        {
            html: "<input type=\"radio\" name=\"mode\" />",
            id: "modeRead"
        },
        " ",
        "<label for=\"modeRead\">Read-only</label>",
        " "
    ]
});
SwitchDemo.prototype.extend({
    initialize: function() {
        var self = this;
        this.$modeEdit().click(function(event) {
            self.$switchMode().activeIndex(0);
        });
        this.$modeRead().click(function(event) {
            self.$textReadOnly().content(self.$textEditable().content());
            self.$switchMode().activeIndex(1);
        });
    }
});

//
// TagDemo
//
TagDemo = Control.subclass({
    name: "TagDemo",
    content: [
        " Here's a reference to the ",
        {
            control: "Tag",
            content: "script"
        },
        " tag. "
    ]
});

//
// TextCondenserDemo
//
TextCondenserDemo = Control.subclass({
    name: "TextCondenserDemo",
    content: [
        " ",
        {
            control: "Fader",
            content: [
                " ",
                {
                    control: "TextCondenser",
                    content: "Austria"
                },
                " ",
                {
                    control: "TextCondenser",
                    content: "Bosnia and Herzegovina"
                },
                " ",
                {
                    control: "TextCondenser",
                    content: "Dominican Republic"
                },
                " ",
                {
                    control: "TextCondenser",
                    content: "Germany"
                },
                " ",
                {
                    control: "TextCondenser",
                    content: "Saint Vincent and the Grenadines"
                },
                " ",
                {
                    control: "TextCondenser",
                    content: "Trinidad and Tobago"
                },
                " ",
                {
                    control: "TextCondenser",
                    content: "United Republic of Tanzania"
                },
                " ",
                {
                    control: "TextCondenser",
                    content: "Viet Nam"
                },
                " "
            ]
        },
        " "
    ]
});
TextCondenserDemo.prototype.extend({
    initialize: function() {
        this.find(".TextCondenser").control().condensedFontFamily("Open Sans Condensed");
    }
});

//
// ValidatingTextBoxDemo
//
ValidatingTextBoxDemo = Control.subclass({
    name: "ValidatingTextBoxDemo",
    content: [
        " ",
        {
            html: "<div />",
            content: [
                " ",
                "<div class=\"label\">Normal field:</div>",
                " ",
                {
                    control: "ValidatingTextBox"
                },
                " "
            ]
        },
        " ",
        {
            html: "<div />",
            content: [
                " ",
                "<div class=\"label\">Required field:</div>",
                " ",
                {
                    control: "ValidatingTextBox",
                    required: "true"
                },
                " "
            ]
        },
        " ",
        {
            html: "<div />",
            content: [
                " ",
                "<div class=\"label\">Date field:</div>",
                " ",
                {
                    control: "DateTextBox"
                },
                " "
            ]
        },
        " "
    ]
});

//
// VerticalPanelsDemo
//
VerticalPanelsDemo = Control.subclass({
    name: "VerticalPanelsDemo",
    content: [
        " ",
        {
            control: "VerticalPanels",
            top: "Top panel",
            content: "Main content",
            bottom: "Bottom panel"
        },
        " "
    ]
});

